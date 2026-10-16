length = float(input())
width = float(input())
height = float(input())

volume = length * width * height
surface_area = 2 * (length * width + length * height + width * height)

print(f"{volume:.3f}")
print(f"{surface_area:.3f}")