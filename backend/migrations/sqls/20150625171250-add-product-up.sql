CREATE TABLE "product"
(
id serial NOT NULL,
product_name character varying NOT NULL,
price money NOT NULL,
image1 character varying,
image2 character varying,
image3 character varying,
image4 character varying,
type integer NOT NULL DEFAULT 1,
"isDiscounts" boolean NOT NULL DEFAULT false,
discounts_price money,
created_at time with time zone,
updated_at time with time zone,
CONSTRAINT product_pkey PRIMARY KEY (id)
)
WITH (
OIDS=FALSE
);
ALTER TABLE "product"
OWNER TO coffee;
/* Replace with your SQL commands */
