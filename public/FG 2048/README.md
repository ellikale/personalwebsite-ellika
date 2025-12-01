# FG 2048 Tile Images

This folder should contain tile images for the FG 2048 game. Each tile value should have a corresponding image file.

## Required Images

Place the following image files in this folder:

- `2.png` - Image for tile value 2
- `4.png` - Image for tile value 4
- `8.png` - Image for tile value 8
- `16.png` - Image for tile value 16
- `32.png` - Image for tile value 32
- `64.png` - Image for tile value 64
- `128.png` - Image for tile value 128
- `256.png` - Image for tile value 256
- `512.png` - Image for tile value 512
- `1024.png` - Image for tile value 1024
- `2048.png` - Image for tile value 2048 (also used as fallback for higher values)

## Image Specifications

- Format: PNG (recommended) or any web-compatible image format
- Recommended size: Square images (e.g., 200x200px or larger)
- The images will be scaled to fit the tiles automatically

## Notes

- If an image is missing, the tile will display without a background image
- Tiles with values higher than 2048 will use the `2048.png` image as a fallback
- Make sure all image files are named exactly as listed above (case-sensitive)

