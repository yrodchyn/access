<?php

declare(strict_types=1);

namespace Access;

abstract class Query
{
    protected const SELECT = 'SELECT';
    protected const INSERT = 'INSERT';
    protected const UPDATE = 'UPDATE';
    protected const DELETE = 'DELETE';
    protected const RAW = 'RAW';

    private const JOIN_TYPE_LEFT = 'left-join';
    private const JOIN_TYPE_INNER = 'inner-join';

    private $type;

    private $tableName = null;
    private $alias = null;
    private $where = null;
    private $whereValues = [];
    private $limit = null;
    private $joins = [];
    private $values = [];

    protected function __construct(string $type, string $tableName, string $alias = null)
    {
        $this->type = $type;
        $this->tableName = $tableName;

        if (is_subclass_of($tableName, Entity::class)) {
            $this->tableName = $tableName::tableName();
        }

        $this->alias = $alias;
    }

    public function isSelect(): bool
    {
        return $this->type === self::SELECT;
    }

    public function isInsert(): bool
    {
        return $this->type === self::INSERT;
    }

    public function leftJoin(string $tableName, string $alias, string $on): self
    {
        return $this->join(
            self::JOIN_TYPE_LEFT,
            $tableName,
            $alias,
            $on
        );
    }

    public function innerJoin(string $tableName, string $alias, string $on): self
    {
        return $this->join(
            self::JOIN_TYPE_INNER,
            $tableName,
            $alias,
            $on
        );
    }

    private function join(string $type, string $tableName, string $alias, string $on): self
    {
        if (is_subclass_of($tableName, Entity::class)) {
            $tableName = $tableName::tableName();
        }

        $this->joins[] = [
            'type' => $type,
            'tableName' => $tableName,
            'alias' => $alias,
            'on' => $on,
        ];

        return $this;
    }

    public function where($condition)
    {
        $this->where = $condition;

        if (is_array($condition)) {
            $this->whereValues = $condition;
        }

        return $this;
    }

    public function limit($limit)
    {
        $this->limit = $limit;

        return $this;
    }

    public function values($values)
    {
        $this->values = $values;

        return $this;
    }

    public function getValues(): array
    {
        $indexedValues = [];

        $i = 0;
        foreach ($this->values as $value) {
            $indexedValues["p{$i}"] = $value;
            $i++;
        }

        $i = 0;
        foreach ($this->whereValues as $whereValue) {
            if ($whereValue === null) {
                // sql is converted to `IS NULL`
                continue;
            } elseif (is_array($whereValue)) {
                foreach ($whereValue as $whereValuePart) {
                    $indexedValues["w{$i}"] = $whereValuePart;
                    $i++;
                }

                continue;
            }

            $indexedValues["w{$i}"] = $whereValue;
            $i++;
        }

        return $indexedValues;
    }

    /**
     * Get the SQL query
     *
     * @return string - `null` when no query is needed
     */
    public function getQuery(): ?string
    {
        if (!isset($this->tableName)) {
            throw new Exception('No table given for query');
        }

        $result = '';

        switch ($this->type) {
            case self::SELECT:
                $result = $this->getSelectQuery();
                break;

            case self::INSERT:
                $result = $this->getInsertQuery();
                break;

            case self::UPDATE:
                $result = $this->getUpdateQuery();
                break;

            case self::DELETE:
                $result = $this->getDeleteQuery();
                break;
        }

        return $result;
    }

    private function getSelectQuery()
    {
        $escapedTableName = $this->escapeIdentifier($this->tableName);

        $joins = [];
        foreach ($this->joins as $join) {
            $escapedJoinTableName = $this->escapeIdentifier($join['tableName']);
            $j = '';

            switch ($join['type']) {
                case self::JOIN_TYPE_LEFT:
                    $j .= 'LEFT JOIN ';
                    break;
                case self::JOIN_TYPE_INNER:
                    $j .= 'INNER JOIN ';
                    break;
            }

            $j .= "{$escapedJoinTableName} AS {$join['alias']} ON {$join['on']}";
            $joins[] = $j;
        }

        $sqlSelect = "SELECT {$escapedTableName}.*";
        $sqlFrom = " FROM {$escapedTableName}";
        $sqlAlias = '';

        if ($this->alias !== null) {
            $sqlSelect = "SELECT {$this->alias}.*";
            $sqlAlias = $this->alias !== null ? " AS {$this->alias}" : '';
        }

        $sqlJoins = !empty($joins) ? ' ' . implode(" ", $joins) : '';
        $sqlWhere = $this->getWhere();
        $sqlLimit = $this->limit !== null ? " LIMIT {$this->limit}" : '';

        return $sqlSelect . $sqlFrom . $sqlAlias . $sqlJoins . $sqlWhere . $sqlLimit;
    }

    private function getInsertQuery(): string
    {
        $sqlInsert = 'INSERT INTO ' .
            $this->escapeIdentifier($this->tableName);
        $sqlFields = ' (' . implode(', ', array_keys($this->values)) . ')';
        $sqlValues = ' VALUES (' .
            implode(', ', array_fill(0, count($this->values), '?')) . ')';

        $sql = $sqlInsert . $sqlFields . $sqlValues;

        return $this->replaceQuestionMarks($sql, 'p');
    }

    private function getUpdateQuery(): ?string
    {
        $sqlWhere = $this->getWhere();

        $i = 0;
        $fields = implode(
            ', ',
            array_map(
                function ($q) use (&$i) {
                    return $this->escapeIdentifier($q) . ' = :p' . ($i++);
                },
                array_keys($this->values)
            )
        );

        if (empty($fields)) {
            return null;
        }

        $sqlUpdate = 'UPDATE ' .
            $this->escapeIdentifier($this->tableName);
        $sqlFields = ' SET ' . $fields;
        $sqlLimit = $this->limit !== null ? " LIMIT {$this->limit}" : '';

        return $sqlUpdate . $sqlFields . $sqlWhere . $sqlLimit;
    }

    private function getDeleteQuery(): string
    {
        $sqlDelete = 'DELETE FROM ' .
            $this->escapeIdentifier($this->tableName);
        $sqlWhere = $this->getWhere();

        return $sqlDelete . $sqlWhere;
    }

    private function getWhere()
    {
        if (!empty($this->where)) {
            if (is_array($this->where)) {
                $whereParts = [];

                foreach ($this->where as $whereKey => $whereValue) {
                    if ($whereValue === null) {
                        $whereParts[] = str_replace(
                            [
                                '!= ?',
                                '= ?',
                            ],
                            [
                                'IS NOT NULL',
                                'IS NULL',
                            ],
                            $whereKey
                        );

                        continue;
                    } elseif (is_array($whereValue)) {
                        $whereParts[] = str_replace(
                            '?',
                            implode(', ', array_fill(0, count($whereValue), '?')),
                            $whereKey
                        );

                        continue;
                    }

                    $whereParts[] = $whereKey;
                }

                $where = implode(' AND ', $whereParts);
                $sqlWhere = " WHERE {$where}";
            } else {
                $sqlWhere = " WHERE {$this->where}";
            }

            return $this->replaceQuestionMarks($sqlWhere, 'w');
        }

        return '';
    }

    private function escapeIdentifier($identifier): string
    {
        return '`' . str_replace('`', '``', $identifier) . '`';
    }

    private function replaceQuestionMarks(string $sql, string $prefix): string
    {
        $i = 0;
        return (string) preg_replace_callback(
            '/\?/',
            function () use ($prefix, &$i) {
                return ':' . $prefix . $i++;
            },
            $sql
        );
    }
}
