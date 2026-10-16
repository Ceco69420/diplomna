distance1 = float(input())
speed1 = float(input())
distance2 = float(input())
speed2 = float(input())

time1 = distance1 / speed1
time2 = distance2 / speed2

total_time = time1 + time2
total_distance = distance1 + distance2

average_speed = total_distance / total_time

print(f"{total_time:.2f}")
print(f"{average_speed:.2f}")