import sys
import csv

def calculateVotes():
    filename = open(sys.argv[1], 'r')
    file = csv.reader(filename, delimiter=',')
    votes = {}
    for row in file:
        if (votes.get(row[3]) == None):
            votes[row[3]] = [int(row[1]), int(row[2])]
        else:
            votes[row[3]] = [votes[row[3]][0] + int(row[1]), votes[row[3]][1] + int(row[2])]
    print(votes)
        

if __name__ == "__main__":
    calculateVotes()