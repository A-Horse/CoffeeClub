/* Replace with your SQL commands */
CREATE TABLE coffeer
(
id serial NOT NULL,
username character varying(20) NOT NULL,
password character varying(255) NOT NULL,
avatar character varying(255),
realname character varying(50) NOT NULL,
email character varying(100) NOT NULL,
self_description text,
city character varying(50),
country character varying(20),
phone character varying(20),
ismaster boolean NOT NULL DEFAULT false,
isadmin boolean NOT NULL DEFAULT false,
limit_login boolean NOT NULL DEFAULT false,
isactive boolean NOT NULL DEFAULT false,
created_at time with time zone,
modified_at time with time zone,
CONSTRAINT coffeer_pkey PRIMARY KEY (id)
)
WITH (
OIDS=FALSE
);
ALTER TABLE coffeer
OWNER TO coffee;
