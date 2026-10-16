h = float(input())
pph = float(input())
b = float(input())
d = float(input())
salary = h * pph
salary1 = salary + b
salary2 = salary1 - salary * d / 100
print(f"{salary2:.2f}")