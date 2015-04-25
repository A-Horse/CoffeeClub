CREATE TABLE users
(
id character varying(20) NOT NULL,
username character varying(30) NOT NULL,
email character varying(30) NOT NULL,
admin boolean NOT NULL,
last_login time without time zone,
is_active boolean NOT NULL DEFAULT true,
password character varying(100) NOT NULL,
CONSTRAINT users_pkey PRIMARY KEY (id)
)

WITH (
OIDS=FALSE
);
ALTER TABLE users
OWNER TO coffee;
