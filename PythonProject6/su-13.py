power = float(input())
hours_per_day = float(input())
days = int(input())
price_per_kwh = float(input())

consumption = (power / 1000) * hours_per_day * days
total_price = consumption * price_per_kwh

print(f"{consumption:.2f}")
print(f"{total_price:.2f}")