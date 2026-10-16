juice1_liters = float(input())
juice1_price = float(input())
juice2_liters = float(input())
juice2_price = float(input())

total_liters = juice1_liters + juice2_liters
total_cost = juice1_liters * juice1_price + juice2_liters * juice2_price
average_price = total_cost / total_liters

print(f"{total_liters:.2f}")
print(f"{average_price:.2f}")