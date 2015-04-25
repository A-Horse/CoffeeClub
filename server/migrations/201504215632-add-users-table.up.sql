CREATE TABLE users
(id VARCHAR(20) PRIMARY KEY,
 username VARCHAR(30),
 email VARCHAR(30),
 admin BOOLEAN,
 last_login TIME,
 is_active BOOLEAN,
 password VARCHAR(100));

CREATE TABLE users
(
id character varying(20) NOT NULL,
name character varying(30) NOT NULL,
email character varying(30) NOT NULL,
admin boolean,
last_login time without time zone,
is_active boolean NOT NULL,
password character varying(100) NOT NULL,
)
