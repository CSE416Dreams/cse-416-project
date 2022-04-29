import pygeoj



file = pygeoj.load('florida-3.geojson')


for i in range(len(file)):
    print(file[i].properties)
    file[i].properties = {"District": i+1, "id": i+1}


file.save('florida-3.geojson')