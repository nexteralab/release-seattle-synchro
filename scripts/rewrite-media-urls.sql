-- Reescribe las URLs de Supabase Storage → R2. Idempotente: re-ejecutable.
-- Los paths coinciden 1:1 (…/public/blog/x.jpg → …/blog/x.jpg), así que basta
-- con cambiar el prefijo. Cuando esté el dominio propio, re-ejecutar cambiando
-- el segundo argumento de REPLACE.
UPDATE posts SET
  cover_url = REPLACE(cover_url, 'https://hfyxcakixklryajpnszd.supabase.co/storage/v1/object/public/', 'https://pub-899945239f104dcb964d2cb3d4abac38.r2.dev/'),
  content   = REPLACE(content,   'https://hfyxcakixklryajpnszd.supabase.co/storage/v1/object/public/', 'https://pub-899945239f104dcb964d2cb3d4abac38.r2.dev/');
UPDATE news SET
  cover_url = REPLACE(cover_url, 'https://hfyxcakixklryajpnszd.supabase.co/storage/v1/object/public/', 'https://pub-899945239f104dcb964d2cb3d4abac38.r2.dev/'),
  content   = REPLACE(content,   'https://hfyxcakixklryajpnszd.supabase.co/storage/v1/object/public/', 'https://pub-899945239f104dcb964d2cb3d4abac38.r2.dev/');
UPDATE coaches SET
  image_url = REPLACE(image_url, 'https://hfyxcakixklryajpnszd.supabase.co/storage/v1/object/public/', 'https://pub-899945239f104dcb964d2cb3d4abac38.r2.dev/');
UPDATE config SET
  value = REPLACE(value, 'https://hfyxcakixklryajpnszd.supabase.co/storage/v1/object/public/', 'https://pub-899945239f104dcb964d2cb3d4abac38.r2.dev/');
