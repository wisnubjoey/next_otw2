-- Hapus constraints yang ada
ALTER TABLE post DROP CONSTRAINT IF EXISTS post_pkey;

-- Ubah tipe kolom id menjadi uuid, konversi nilai yang ada
ALTER TABLE post 
ALTER COLUMN id TYPE uuid USING (CASE WHEN id ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN id::uuid ELSE gen_random_uuid() END);

-- Tambahkan kembali primary key constraint
ALTER TABLE post ADD PRIMARY KEY (id);

-- Set default value untuk kolom id
ALTER TABLE post ALTER COLUMN id SET DEFAULT gen_random_uuid();