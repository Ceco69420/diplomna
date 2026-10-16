bus_km = float(input())
taxi_km = float(input())
bus_price = float(input())
taxi_price = float(input())
total_km = bus_km + taxi_km
total_price = bus_km * bus_price + taxi_km * taxi_price
print(f"{total_km:.2f}")
print(f"{total_price:.2f}")