import json
from area import area
import sys
from math import radians, sqrt, cos, sin, asin

def calculateArea():
    with open(sys.argv[1]) as js: # open GEOJSON
        gj = json.load(js) # Load into json
    for feature in gj["features"]:
        print(feature["properties"]["District"])
        districtArea = area(feature["geometry"])
        districtArea = 0.0000003861022 * districtArea # convert square meter to square mile
        print(districtArea)

def distance(lon1, lon2, lat1, lat2):
    lat1 = lat1 * 69 # Degree to mile
    lat2 = lat2 * 69 # Degree to mile
    lon1 = lon1 * 54.6 # Degree to mile
    lon2 = lon2 * 54.6 # Degree to mile
    return sqrt((lat1-lat2)*(lat1-lat2)+(lon1-lon2)*(lon1-lon2))
    

def calculatePerimeter():
    with open(sys.argv[1]) as js:
        gj = json.load(js)
    for feature in gj["features"]:
        print(feature["properties"]["District"])
        perimeter = 0
        if(feature["geometry"]["type"] == "Polygon"):
            for points in feature["geometry"]["coordinates"]:
                for i in range(0, len(points) - 1):
                    pt1 = points[i]
                    pt2 = points[i+1]
                    tempPerimeter = distance(pt2[0], pt1[0], pt2[1], pt1[1])
                    perimeter += tempPerimeter
                    if(i + 1) == len(points):
                        pt2 = points[0]
                        tempPerimeter = distance(pt2[0], pt1[0], pt2[1], pt1[1])
                        print(tempPerimeter)
                    else:
                        continue
            print(perimeter)
        elif(feature["geometry"]["type"] == "MultiPolygon"):
            for coords in feature["geometry"]["coordinates"]:
                for i in range(0, len(coords)):
                    for x in range(0, len(coords[i]) - 1):
                        pt1 = coords[i][x]
                        pt2 = coords[i][x+1]
                        tempPerimeter = distance(pt2[0], pt1[0], pt2[1], pt1[1])
                        perimeter += tempPerimeter
                        if(i + 1) == len(coords[i]):
                            pt2 = coords[i][0]
                            tempPerimeter = distance(pt2[0], pt1[0], pt2[1], pt1[1])
                        else:
                            continue
            print(perimeter)

if __name__ == '__main__':
    print("Calculate Area of GEOJSON\n")
    calculateArea()
    print("\nCalculate Perimeter of GEOJSON\n")
    calculatePerimeter()