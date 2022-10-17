import os
import csv
from tokenize import Double

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
avgchange = 0
greatestincrease = 0
greatestdecrease = 0
totalprofit = 0
changearray1 = []
changearray0 = []
maxindex = 0
minindex = 0
lengthof = 0

for i in range(86):
    totalprofit = totalprofit + budgetarray[i][1]
    if i > 0:
        changearray1.append(budgetarray[i][1] - budgetarray[i - 1][1])
        changearray0.append(budgetarray[i][0])

lengthof = len(changearray1)

avgchange = round(sum(changearray1)/lengthof, 2)
greatestincrease = max(changearray1)
greatestdecrease = min(changearray1)

for i in range(lengthof):
    if greatestincrease == changearray1[i]:
        maxindex = i
    if greatestdecrease == changearray1[i]:
        minindex = i


print('\n')
print('Financial Analysis')
print('-------------------------------------------')
print(f"Total Months:  {totalmonths}")
print(f"Total:  ${totalprofit}")
print(f"Average Change:  ${avgchange}")
print(f"Greatest Increase in Profits:  {changearray0[maxindex]}  (${changearray1[maxindex]})")
print(f"Greatest Decrease in Profits:  {changearray0[minindex]}  (${changearray1[minindex]})")
print('\n')


budgetoutputpath = os.path.join("Resources/budget_output.csv")

with open(budgetoutputpath, 'w') as csvfile:

    csvwriter = csv.writer(csvfile, delimiter=',')

    csvwriter.writerow(['Financial Analysis'])
    csvwriter.writerow(['---------------------------------'])
    csvwriter.writerow([f"Total Months:  {totalmonths}"])
    csvwriter.writerow([f"Total:  ${totalprofit}"])
    csvwriter.writerow([f"Average Change:  ${avgchange}"])
    csvwriter.writerow([f"Greatest Increase in Profits:  {changearray0[maxindex]}  (${changearray1[maxindex]})"])
    csvwriter.writerow([f"Greatest Decrease in Profits:  {changearray0[minindex]}  (${changearray1[minindex]})"])

