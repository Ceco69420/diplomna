class Person:
    def __init__(self, name, family, age, nationality):
        self.name = name
        self.family = family
        self.age = age
        self.nationality = nationality

    def print_info(self):
        print(f"Име: {self.name} {self.family}, Националност: {self.nationality}")

p1 = Person("Иван", "Иванов", 25, "Българска")
p2 = Person("John", "Smith", 30, "Американска")

p1.print_info()
p2.print_info()


class Student(Person):
    def __init__(self, name, family, age, nationality, university, yearofstudy):
        super().__init__(name, family, age, nationality)
        self.university = university
        self.yearofstudy = yearofstudy

    def print_info(self):
        print(f"Студент: {self.name} {self.family}, Националност: {self.nationality}, Университет: {self.university}, Курс: {self.yearofstudy}")

s1 = Student("Мария", "Петрова", 21, "Българска", "СУ „Св. Климент Охридски“", 3)
s1.print_info()


class Lecturer(Person):
    def __init__(self, name, family, age, nationality, university, experience):
        super().__init__(name, family, age, nationality)
        self.university = university
        self.experience = experience

    def print_info(self):
        print(f"Преподавател: {self.name} {self.family}, Националност: {self.nationality}, Университет: {self.university}, Стаж: {self.experience} г.")

l1 = Lecturer("Петър", "Димитров", 45, "Българска", "ТУ-София", 15)
l1.print_info()


class Employee:
    def __init__(self, name, position, salary):
        self.name = name
        self.position = position
        self.salary = salary

    def print_info(self):
        print(f"Служител: {self.name}, Длъжност: {self.position}, Заплата: {self.salary} лв.")

e1 = Employee("Георги Георгиев", "Софтуерен инженер", 4500)
e2 = Employee("Елена Тодорова", "Счетоводител", 2200)
e3 = Employee("Николай Николов", "Маркетинг специалист", 2500)

e1.print_info()
e2.print_info()
e3.print_info()


class Manager(Employee):
    def __init__(self, name, position, salary, department):
        super().__init__(name, position, salary)
        self.department = department

    def print_info(self):
        print(f"Мениджър: {self.name}, Длъжност: {self.position}, Отдел: {self.department}, Заплата: {self.salary} лв.")

m1 = Manager("Стоян Илиев", "ИТ Директор", 7000, "Информационни технологии")
m2 = Manager("Ана Василева", "HR Мениджър", 4000, "Човешки ресурси")

m1.print_info()
m2.print_info()


class Vehicle:
    def __init__(self, brand, model, year):
        self.brand = brand
        self.model = model
        self.year = year

    def print_info(self):
        print(f"МПС: {self.brand} {self.model}, Година: {self.year}")

v1 = Vehicle("Toyota", "Corolla", 2018)
v2 = Vehicle("Volkswagen", "Golf", 2015)

v1.print_info()
v2.print_info()


class Car(Vehicle):
    def __init__(self, brand, model, year, doors):
        super().__init__(brand, model, year)
        self.doors = doors

    def print_info(self):
        print(f"Автомобил: {self.brand} {self.model}, Година: {self.year}, Брой врати: {self.doors}")

car1 = Car("Audi", "A4", 2020, 4)
car1.print_info()


class Motorcycle(Vehicle):
    def __init__(self, brand, model, year, engine_capacity):
        super().__init__(brand, model, year)
        self.engine_capacity = engine_capacity

    def print_info(self):
        print(f"Мотоциклет: {self.brand} {self.model}, Година: {self.year}, Кубатура: {self.engine_capacity} куб.см")

moto1 = Motorcycle("Yamaha", "MT-07", 2021, 689)
moto2 = Motorcycle("Honda", "CBR 650R", 2022, 649)

moto1.print_info()
moto2.print_info()


class Animal:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def sound(self):
        pass

class Dog(Animal):
    def sound(self):
        print(f"Кучето {self.name} казва: Бау-бау!")

class Cat(Animal):
    def sound(self):
        print(f"Котката {self.name} казва: Мяу!")

dog = Dog("Шаро", 3)
cat = Cat("Пина", 2)

dog.sound()
cat.sound()


class Book:
    def __init__(self, title, author, year):
        self.title = title
        self.author = author
        self.year = year

    def print_info(self):
        print(f"Книга: „{self.title}“, Автор: {self.author}, Година: {self.year}")

b1 = Book("Под игото", "Иван Вазов", 1894)
b2 = Book("Тютюн", "Димитър Димов", 1951)
b3 = Book("Крадецът на праскови", "Емилиян Станев", 1948)

b1.print_info()
b2.print_info()
b3.print_info()


class EBook(Book):
    def __init__(self, title, author, year, format, size):
        super().__init__(title, author, year)
        self.format = format
        self.size = size

    def print_info(self):
        print(f"Е-книга: „{self.title}“, Автор: {self.author}, Година: {self.year}, Формат: {self.format}, Размер: {self.size} MB")

eb1 = EBook("Чичовци", "Иван Вазов", 1885, "PDF", 2.5)
eb1.print_info()


class Shape:
    def area(self):
        pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

class Circle(Shape):
    import math
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        import math
        return math.pi * (self.radius ** 2)

rect = Rectangle(5, 10)
circle = Circle(7)

print(f"Лице на правоъгълник (5x10): {rect.area()}")
print(f"Лице на кръг (радиус 7): {circle.area():.2f}")


class Account:
    def __init__(self, owner, balance=0.0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        if amount > 0:
            self.balance += amount
            print(f"Внесени {amount} лв. Нов баланс: {self.balance} лв.")

    def withdraw(self, amount):
        if 0 < amount <= self.balance:
            self.balance -= amount
            print(f"Изтеглени {amount} лв. Остатък: {self.balance} лв.")
        else:
            print("Недостатъчна наличност или невалидна сума!")

    def print_info(self):
        print(f"Сметка на: {self.owner}, Баланс: {self.balance} лв.")

acc = Account("Иван Петров", 100)
acc.print_info()
acc.deposit(50)
acc.withdraw(30)
acc.print_info()


class SavingsAccount(Account):
    def __init__(self, owner, balance=0.0, interest_rate=0.02):
        super().__init__(owner, balance)
        self.interest_rate = interest_rate

    def add_interest(self):
        interest = self.balance * self.interest_rate
        self.balance += interest
        print(f"Начислена лихва: {interest:.2f} лв. Нов баланс: {self.balance:.2f} лв.")

    def print_info(self):
        print(f"Спестовна сметка на: {self.owner}, Баланс: {self.balance:.2f} лв., Лихвен процент: {self.interest_rate * 100}%")

sav_acc = SavingsAccount("Георги Стоянов", 1000, 0.05)
sav_acc.print_info()
sav_acc.add_interest()
sav_acc.print_info()


p = Person("Иван", "Атанасов", 40, "Българска")
st = Student("Димитър", "Колев", 20, "Българска", "УНСС", 2)
lect = Lecturer("д-р Борисов", "Михайлов", 50, "Българска", "Софийски университет", 20)

people_list = [p, st, lect]

print("--- Демонстрация на полиморфизъм ---")
for person_obj in people_list:
    person_obj.print_info()
