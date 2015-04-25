-- Table: users

-- DROP TABLE users;

CREATE TABLE users
(
username character varying(30) NOT NULL,
email character varying(30) NOT NULL,
admin boolean NOT NULL,
last_login time without time zone,
is_active boolean NOT NULL DEFAULT true,
password character varying(100) NOT NULL,
id serial NOT NULL,
CONSTRAINT users_pkey PRIMARY KEY (id)
)
WITH (
OIDS=FALSE
);
ALTER TABLE users
OWNER TO coffee;

-- Table: articles

-- DROP TABLE articles;

CREATE TABLE articles
(
id serial NOT NULL,
title character varying(150) NOT NULL,
context text NOT NULL,
images character varying(200)[],
created_at time with time zone NOT NULL,
updated_at time with time zone,
user_id integer NOT NULL,
type integer NOT NULL DEFAULT 1,
CONSTRAINT articles_pkey PRIMARY KEY (id),
CONSTRAINT articles_user_id_fkey FOREIGN KEY (user_id)
REFERENCES users (id) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
OIDS=FALSE
);
ALTER TABLE articles
OWNER TO coffee;
