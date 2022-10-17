import os
import csv

budgetfilepath = "Resources/budget_data.csv"



with open(budgetfilepath, 'r') as csvfile:

    csvreader = csv.reader(csvfile, delimiter = ',')
    header = next(csvreader)



    budgetarray = []

    for row in csvfile:
        roww = row.split(',')
        roww[1] = int(roww[1].rstrip('\n'))
        budgetarray.append(roww)
    
# print(budgetarray)
# print(len(budgetarray))

totalmonths = len(budgetarray)
change = 0
totalchange = 0
avgchange = 0
greatestincrease = [0,0]
greatestdecrease = [0,0]
totalprofit = 0
prevchange = 0

for i in range(86):
    totalprofit = totalprofit + budgetarray[i][1]
    if i > 0:
        change = budgetarray[i][1] - budgetarray[i - 1][1] 
    totalchange = totalchange + change
    if change > greatestincrease[1]:
        greatestincrease = [budgetarray[i][0], change]
    if change < greatestdecrease[1]:
        greatestdecrease = [budgetarray[i][0], change]
    prevchange = change

avgchange = round(totalchange/(totalmonths - 1),2)

print('\n')
print('Financial Analysis')
print('-------------------------------------------')
print(f"Total Months:  {totalmonths}")
print(f"Total:  ${totalprofit}")
print(f"Average Change:  ${avgchange}")
print(f"Greatest Increase in Profits:  {greatestincrease[0]}  (${greatestincrease[1]})")
print(f"Greatest Decrease in Profits:  {greatestdecrease[0]}  (${greatestdecrease[1]})")
print('\n')


budgetoutputpath = os.path.join("Resources/budget_output.csv")

with open(budgetoutputpath, 'w') as csvfile:

    csvwriter = csv.writer(csvfile, delimiter=',')

    csvwriter.writerow(['Financial Analysis'])
    csvwriter.writerow(['---------------------------------'])
    csvwriter.writerow([f"Total Months:  {totalmonths}"])
    csvwriter.writerow([f"Total:  ${totalprofit}"])
    csvwriter.writerow([f"Average Change:  ${avgchange}"])
    csvwriter.writerow([f"Greatest Increase in Profits:  {greatestincrease[0]}  (${greatestincrease[1]})"])
    csvwriter.writerow([f"Greatest Decrease in Profits:  {greatestdecrease[0]}  (${greatestdecrease[1]})"])

