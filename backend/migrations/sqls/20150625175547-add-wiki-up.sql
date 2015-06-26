CREATE TABLE wiki
(
id serial NOT NULL,
author_id integer NOT NULL,
title character varying NOT NULL,
cover_img character varying NOT NULL,
content text  NOT NULL,
type integer NOT NULL DEFAULT 1,
sort integer NOT NULL,
created_at time with time zone,
updated_at time with time zone,
CONSTRAINT wiki_pkey PRIMARY KEY (id),
CONSTRAINT wiki_author_id_fkey FOREIGN KEY (author_id)
REFERENCES "user" (id) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
OIDS=FALSE
);
ALTER TABLE wiki
OWNER TO coffee;/* Replace with your SQL commands */
