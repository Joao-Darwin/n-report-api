-- This is an empty migration.
BEGIN;

INSERT INTO "User" (id, name, email, password, cpf, avatar, created_at, updated_at, permission_id)
VALUES (
  gen_random_uuid(),
  'Admin',
  'admin@nreport.com',
  '$2y$10$4JPATwVWGbo0eadV76.V6e.Gx05/U22i0Fz4q30porMgXPfQQc1MG',
  '12345678900',
  'path',
  now(),
  now(),
  (SELECT id FROM "Permission" WHERE role = 'admin')
);

COMMIT;