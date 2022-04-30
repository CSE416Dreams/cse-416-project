import sys

if __name__ == '__main__':
    totalPopulation = int(sys.argv[1])
    white = float(sys.argv[2])
    black = float(sys.argv[3])
    asian = float(sys.argv[4])
    indian = float(sys.argv[5])
    hawaiian = float(sys.argv[6])
    hispanic = float(sys.argv[7])
    print("total population: " + str(totalPopulation))
    print("White percentage: " + str(white) + ", amount: " + str(white * totalPopulation))
    print("black percentage: " + str(black) + ", amount: " + str(black * totalPopulation))
    print("asian percentage: " + str(asian) + ", amount: " + str(asian * totalPopulation))
    print("indian percentage: " + str(indian) + ", amount: " + str(indian * totalPopulation))
    print("hawaiian percentage: " + str(hawaiian) + ", amount: " + str(hawaiian * totalPopulation))
    print("hispanic percentage: " + str(hispanic) + ", amount: " + str(hispanic * totalPopulation))