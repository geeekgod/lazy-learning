
--
-- Create chats table
--
CREATE TABLE IF NOT EXISTS  next_auth.chats
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    "userId" uuid,
    "message" text,
    "user" text,
    "timestamp" timestamp with time zone,
    CONSTRAINT chats_pkey PRIMARY KEY (id),
    CONSTRAINT "chats_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES  next_auth.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

GRANT ALL ON TABLE next_auth.chats TO postgres;
GRANT ALL ON TABLE next_auth.chats TO service_role;
