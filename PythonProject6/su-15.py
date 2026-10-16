quantity = int(input())
selling_price = float(input())
delivery_price = float(input())
extra_costs = float(input())

total_revenue = quantity * selling_price
total_cost = quantity * delivery_price + extra_costs
profit = total_revenue - total_cost

print(f"{total_revenue:.2f}")
print(f"{total_cost:.2f}")
print(f"{profit:.2f}")