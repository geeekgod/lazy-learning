
--
-- Create comments table
--
CREATE TABLE IF NOT EXISTS  comments
(
 id uuid NOT NULL DEFAULT uuid_generate_v4(),
  "comment" text,
  "email" text,
  "name" text,
  "image" text,
  "postId" uuid,
  "userId" uuid,
  "createdAt" timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT comments_pkey PRIMARY KEY (id),
  CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId")
      REFERENCES  posts (id) MATCH SIMPLE
      ON UPDATE NO ACTION
      ON DELETE CASCADE,
  CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId")
      REFERENCES  next_auth.users (id) MATCH SIMPLE
      ON UPDATE NO ACTION
      ON DELETE CASCADE

);

GRANT ALL ON TABLE comments TO postgres;
GRANT ALL ON TABLE comments TO service_role;
