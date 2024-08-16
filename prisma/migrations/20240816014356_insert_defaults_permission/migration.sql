BEGIN;

INSERT INTO "Permission" (id, role, created_at, updated_at) VALUES (gen_random_uuid(), 'user', now(), now());
INSERT INTO "Permission" (id, role, created_at, updated_at) VALUES (gen_random_uuid(), 'admin', now(), now());

COMMIT;
