/* Replace with your SQL commands */
CREATE TABLE "user"
(
id serial NOT NULL,
username character varying(20) NOT NULL,
password character varying(255) NOT NULL,
avatar character varying(255) DEFAULT '/upload/avatar/default.jpg',
realname character varying(50),
email character varying(100) NOT NULL,
self_description text,
city character varying(50),
country character varying(20),
phone character varying(20),
ismaster boolean NOT NULL DEFAULT false,
isadmin boolean NOT NULL DEFAULT false,
limit_login boolean NOT NULL DEFAULT false,
isactive boolean NOT NULL DEFAULT false,
created_at timestamp with time zone,
updated_at timestamp with time zone,
CONSTRAINT user_pkey PRIMARY KEY (id),
CONSTRAINT user_email_key UNIQUE (email),
CONSTRAINT user_username_key UNIQUE (username)
)
WITH (
OIDS=FALSE
);
ALTER TABLE "user"
OWNER TO coffee;

