/* Replace with your SQL commands */
CREATE TABLE article
(
id serial NOT NULL,
cwoffeer_id integer NOT NULL,
title character varying(255) NOT NULL,
content text NOT NULL,
isstar boolean NOT NULL DEFAULT false,
type integer NOT NULL DEFAULT 1,
created_at timestamp with  time zone NOT NULL,
updated_at timestamp with time zone,
CONSTRAINT article_pkey PRIMARY KEY (id),
CONSTRAINT article_cwoffeer_id_fkey FOREIGN KEY (cwoffeer_id)
REFERENCES coffeer (id) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
OIDS=FALSE
);
ALTER TABLE article
OWNER TO coffee;