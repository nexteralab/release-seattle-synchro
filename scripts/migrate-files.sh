#!/usr/bin/env bash
# One-shot: copia los 3 buckets de Supabase Storage a R2 bajo prefijos blog/ news/ coaches/.
# ponytail: script desechable. Borrar cuando la migración esté hecha.
set -euo pipefail
K=sb_publishable_cvhspBXyNwefAaSNSon2qA_BsoxOuhi
SB=https://hfyxcakixklryajpnszd.supabase.co
R2=seattle-synchro-media
TMP=$(mktemp -d)

for b in blog news coaches; do
  curl -s -X POST "$SB/storage/v1/object/list/$b" -H "apikey: $K" -H 'Content-Type: application/json' \
    -d '{"prefix":"","limit":1000}' \
  | python3 -c "import sys,json;[print(x['name'],x.get('metadata',{}).get('mimetype','application/octet-stream')) for x in json.load(sys.stdin)]" \
  | while read -r name mime; do
      curl -sf "$SB/storage/v1/object/public/$b/$name" -o "$TMP/f" || { echo "FALLO descarga $b/$name"; continue; }
      npx wrangler r2 object put "$R2/$b/$name" --file="$TMP/f" --content-type="$mime" --remote >/dev/null 2>&1 \
        && echo "ok $b/$name" || echo "FALLO subida $b/$name"
    done
done
rm -rf "$TMP"
echo "listo"
