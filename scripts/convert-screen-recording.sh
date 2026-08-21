#!/usr/bin/env bash

# Convert a macOS screen recording (.mov / HEVC) into a fast-loading blog MP4
# and a matching poster image.
#
# Usage:
#   ./scripts/convert-screen-recording.sh path/to/recording.mov [output-directory]
#
# By default, generated files are placed in an `optimized` folder next to the
# original recording. The original file is never changed.

set -euo pipefail

input_file="${1:?Usage: $0 path/to/recording.mov [output-directory]}"
input_dir="$(dirname "$input_file")"
filename="$(basename "$input_file")"
basename_without_extension="${filename%.*}"
output_dir="${2:-"$input_dir/optimized"}"
output_video="$output_dir/$basename_without_extension.mp4"
output_poster="$output_dir/$basename_without_extension.jpg"

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg is required. Install it with: brew install ffmpeg" >&2
  exit 1
fi

if [[ ! -f "$input_file" ]]; then
  echo "Input file does not exist: $input_file" >&2
  exit 1
fi

case "${input_file##*.}" in
  mov|MOV) ;;
  *) echo "Expected a .mov screen recording: $input_file" >&2; exit 1 ;;
esac

mkdir -p "$output_dir"

# VideoToolbox uses the Mac's dedicated media hardware. 8 Mbps is a strong
# quality/size tradeoff for screen recordings while remaining broadly playable.
ffmpeg -hide_banner -nostdin -y -i "$input_file" \
  -map 0:v:0 -map 0:a? \
  -vf "scale='min(1920,iw)':-2,fps=30" \
  -c:v h264_videotoolbox -b:v 8M \
  -c:a aac -b:a 128k \
  -movflags +faststart \
  "$output_video"

# One second avoids the fade-to-black frame that many screen recordings start with.
ffmpeg -hide_banner -nostdin -y -ss 1 -i "$output_video" \
  -map 0:v:0 -frames:v 1 -update 1 \
  -c:v mjpeg -q:v 3 \
  "$output_poster"

dimensions="$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$output_video")"
echo "Created: $output_video ($dimensions)"
echo "Created: $output_poster"
