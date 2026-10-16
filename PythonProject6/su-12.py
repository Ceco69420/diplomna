import math

length = float(input())
width = float(input())
tile_area = float(input())
reserve = float(input())
tile_price = float(input())

floor_area = length * width
tiles_needed = floor_area / tile_area
tiles_needed = tiles_needed * (1 + reserve / 100)

tiles_count = math.ceil(tiles_needed)
total_price = tiles_count * tile_price

print(tiles_count)
print(f"{total_price:.2f}")