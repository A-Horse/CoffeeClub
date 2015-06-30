/* Replace with your SQL commands */
CREATE TABLE "forumPost"
(
id serial NOT NULL,
user_id integer NOT NULL,
is_star boolean NOT NULL DEFAULT false,
is_lock boolean,
is_delete boolean NOT NULL DEFAULT false,
title character varying NOT NULL,
content text NOT NULL,
created_at time with time zone NOT NULL,
updated_at time with time zone,
CONSTRAINT "forumPost_pkey" PRIMARY KEY (id),
CONSTRAINT "forumPost_user_id_fkey" FOREIGN KEY (user_id)
REFERENCES "user" (id) MATCH SIMPLE
ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
OIDS=FALSE
);
ALTER TABLE "forumPost"
OWNER TO coffee;
