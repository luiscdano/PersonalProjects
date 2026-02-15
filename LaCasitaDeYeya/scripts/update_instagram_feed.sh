#!/usr/bin/env bash
set -euo pipefail

USERNAME="${1:-lacasitadeyeya}"
PROFILE_URL="https://www.instagram.com/${USERNAME}/?hl=es"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
OUT_FILE="${PROJECT_DIR}/shared/data/instagram-feed.json"
TMP_FILE="$(mktemp)"

cleanup() {
  rm -f "${TMP_FILE}"
}
trap cleanup EXIT

curl -sSf "https://www.instagram.com/api/v1/users/web_profile_info/?username=${USERNAME}" \
  -H 'x-ig-app-id: 936619743392459' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36' \
  > "${TMP_FILE}"

jq --arg username "${USERNAME}" \
   --arg profile_url "${PROFILE_URL}" \
   --arg fetched_at "$(date -u +"%Y-%m-%dT%H:%M:%SZ")" '
  .data.user.edge_owner_to_timeline_media.edges
  | map(.node)
  | map({
      id,
      shortcode,
      permalink: (if .is_video == true then "https://www.instagram.com/reel/\(.shortcode)/" else "https://www.instagram.com/p/\(.shortcode)/" end),
      image: (.display_url // .thumbnail_src // ""),
      caption: (.edge_media_to_caption.edges[0].node.text // ""),
      is_video: (.is_video // false),
      taken_at_timestamp: (.taken_at_timestamp // 0)
    })
  | .[:12]
  | {
      username: $username,
      profile_url: $profile_url,
      fetched_at: $fetched_at,
      posts: .
    }
' "${TMP_FILE}" > "${OUT_FILE}"

if ! jq -e '.posts | length > 0' "${OUT_FILE}" >/dev/null; then
  echo "No se encontraron publicaciones en el feed generado" >&2
  exit 1
fi

echo "Feed actualizado en ${OUT_FILE}"
