length = float(input())
width = float(input())
height = float(input())
windows_doors = float(input())
coverage = float(input())
price_per_liter = float(input())

wall_area = 2 * (length * height + width * height)
paint_area = wall_area - windows_doors

liters = paint_area / coverage
total_price = liters * price_per_liter

print(f"{liters:.2f}")
print(f"{total_price:.2f}")