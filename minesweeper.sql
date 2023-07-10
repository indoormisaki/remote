CREATE DATABASE minesweeper;
CREATE TABLE `levels` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `field_column` int(11) DEFAULT NULL,
  `field_row` int(11) DEFAULT NULL,
  `mine` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `rankings` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE rankings ADD level_id int(11);
INSERT INTO levels (
    id,
    name,
    field_column,
    field_row,
    mine
    ) VALUES (
    1,
    'èâãâ',
    9,
    9,
    10
    ), (
    2,
    'íÜãâ',
    16,
    16,
    40
    ), (
    3,
    'è„ãâ',
    30,
    16,
    99
    );
SELECT
			id,
			name,
			field_column AS fieldColumn,
			field_row AS fieldRow,
			mine
		FROM
			levels;
SELECT
			id,
			name,
			field_column AS fieldColumn,
			field_row AS fieldRow,
			mine
		FROM
			levels
		WHERE
			id = 2;
            
SELECT
			name,
			score,
			level_id AS levelId
		FROM
			rankings
        ORDER BY
            score ASC;
DELETE FROM rankings WHERE id = 4;
INSERT INTO rankings(
    name,
    score,
    level_id
) VALUE (
    "ccccc",
    200,
    3
);
