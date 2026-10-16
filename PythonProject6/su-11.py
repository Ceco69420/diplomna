seconds = int(input())

hours = seconds // 3600
minutes = (seconds % 3600) // 60
remaining_seconds = seconds % 60

print(hours)
print(minutes)
print(remaining_seconds)