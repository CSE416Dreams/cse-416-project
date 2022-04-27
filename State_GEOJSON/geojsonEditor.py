import pygeoj



file = pygeoj.load('./Mississippi/MississippiRepublicanDistrictingPlan.geojson')


for i in range(len(file)):
    print(file[i].properties)
    file[i].properties = {"District": i+1, "id": i+1}


file.save('./processedGeojson/mississppi-1.geojson')