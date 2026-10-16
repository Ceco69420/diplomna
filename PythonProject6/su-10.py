principal = float(input())
interest_rate = float(input())
years = int(input())

interest = principal * interest_rate / 100 * years
total_amount = principal + interest

print(f"{interest:.2f}")
print(f"{total_amount:.2f}")