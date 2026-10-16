food = float(input())
drinks = float(input())
service_fee = float(input())
people = int(input())

total = food + drinks
total = total + total * service_fee / 100

per_person = total / people

print(f"{total:.2f}")
print(f"{per_person:.2f}")