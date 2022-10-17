import os


import os
import csv

electiondatapath = "Resources/election_data.csv"

with open(electiondatapath, 'r') as csvfile:

    csvreader = csv.reader(csvfile, delimiter=',')
    header = next(csvreader)
   # print(header)

    electionresults = {}

    for row in csvreader:

       if row[2] in electionresults:
          electionresults[row[2]] += 1 
       else: 
          electionresults.update({row[2]:1})
    


electionpercentages = {}
winner = [0,0]
totalvotes = 0
percentag = 0

#print(electionresultspercentages)

for key in electionresults:

    totalvotes = totalvotes + electionresults[key]

for key in electionresults:
    percentag = round(electionresults[key]/totalvotes*100,3)
    electionpercentages.update({key:percentag})
    if electionpercentages[key] > winner[1]:
        winner[0] = key
        winner[1] = electionpercentages[key]


print('\n')
print("Election Results")
print("----------------------------")
print(f"Total Votes: {totalvotes}")
print("----------------------------")
for key in electionpercentages:
    print(f"{key}: {electionpercentages[key]}% ({electionresults[key]})")
print("----------------------------")
print(f"Winner: {winner[0]}")
print("----------------------------")

electionoutputpath = os.path.join("Resources\election_output.csv")

with open(electionoutputpath, 'w') as csvfile:

    csvwriter = csv.writer(csvfile, delimiter=',')

    csvwriter.writerow(['Election Results'])
    csvwriter.writerow(['----------------------------'])
    csvwriter.writerow([f"Total Votes: {totalvotes}"])
    csvwriter.writerow(['----------------------------'])
    for key in electionpercentages:
        csvwriter.writerow([f"{key}: {electionpercentages[key]}% ({electionresults[key]})"])
    csvwriter.writerow(['----------------------------'])
    csvwriter.writerow([f"Winner: {winner[0]}"])
    csvwriter.writerow(['----------------------------'])



