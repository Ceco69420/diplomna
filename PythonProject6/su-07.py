distance = float(input())
speed = float(input())
break_time = float(input())
travel_time = distance / speed * 60
total_time = travel_time + break_time
print(f"{total_time:.2f}")