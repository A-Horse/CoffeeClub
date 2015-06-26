-- Table: blogcomment

-- DROP TABLE blogcomment;

CREATE TABLE blogcomment
(
id serial NOT NULL,
article_id integer NOT NULL,
user_id integer NOT NULL,
comment text NOT NULL,
is_for boolean NOT NULL DEFAULT false,
for_comment_id integer,
created_at time with time zone,
updated_at time with time zone,
CONSTRAINT blogcomment_pkey PRIMARY KEY (id),
CONSTRAINT blogcomment_article_id_fkey FOREIGN KEY (article_id)
REFERENCES article (id) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION,
CONSTRAINT blogcomment_for_comment_id_fkey FOREIGN KEY (for_comment_id)
REFERENCES blogcomment (id) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION,
CONSTRAINT blogcomment_user_id_fkey FOREIGN KEY (user_id)
REFERENCES "user" (id) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
OIDS=FALSE
);
ALTER TABLE blogcomment
OWNER TO coffee;
/* Replace with your SQL commands */
