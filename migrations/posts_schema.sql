
--
-- Create posts table
--
CREATE TABLE IF NOT EXISTS  posts
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    "userId" uuid,
    "title" text,
    "content" text,
    "email" text,
    "name" text,
    "image" text,
    CONSTRAINT posts_pkey PRIMARY KEY (id),
    CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES  next_auth.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

GRANT ALL ON TABLE posts TO postgres;
GRANT ALL ON TABLE posts TO service_role;

