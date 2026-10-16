grade1 = float(input())
weight1 = float(input())
grade2 = float(input())
weight2 = float(input())
grade3 = float(input())
weight3 = float(input())

final_grade = (grade1 * weight1 + grade2 * weight2 + grade3 * weight3) / 100

print(f"{final_grade:.2f}")