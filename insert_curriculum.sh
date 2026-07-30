#!/bin/bash
# Insert all CodeByte curriculum data into Supabase via REST API

SB_URL="https://zjyolgkakxuaegpvhimy.supabase.co/rest/v1"
SB_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqeW9sZ2tha3h1YWVncHZoaW15Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjgwNDM0MywiZXhwIjoyMDk4MzgwMzQzfQ.BFwV2MgZZs1569X41OOJeaPJwGG_6c17WQA_XW-N6OA"

insert_lesson() {
  local json_file="$1"
  local result
  result=$(curl -s -X POST "$SB_URL/cb_lessons" \
    -H "apikey: $SB_KEY" \
    -H "Authorization: Bearer $SB_KEY" \
    -H "Content-Type: application/json" \
    -H "Prefer: return=representation" \
    -d @"$json_file")
  echo "$result" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d[0]['id'])" 2>/dev/null
}

insert_quiz() {
  local json_file="$1"
  curl -s -X POST "$SB_URL/cb_quiz_questions" \
    -H "apikey: $SB_KEY" \
    -H "Authorization: Bearer $SB_KEY" \
    -H "Content-Type: application/json" \
    -H "Prefer: return=representation" \
    -d @"$json_file"
}

insert_options() {
  local json_file="$1"
  curl -s -X POST "$SB_URL/cb_quiz_options" \
    -H "apikey: $SB_KEY" \
    -H "Authorization: Bearer $SB_KEY" \
    -H "Content-Type: application/json" \
    -d @"$json_file"
}

insert_exercise() {
  local json_file="$1"
  curl -s -X POST "$SB_URL/cb_exercises" \
    -H "apikey: $SB_KEY" \
    -H "Authorization: Bearer $SB_KEY" \
    -H "Content-Type: application/json" \
    -d @"$json_file"
}

echo "Starting curriculum insert..."
echo "Done with shell setup"
