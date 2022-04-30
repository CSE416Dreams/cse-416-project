from geopandas import gpd
import pandas

districtPlan = gpd.read_file("Mississippi/MississippiRepublicanDistrictingPlan.geojson")
precinct = gpd.read_file("Mississippi/MississippiPrecinctswithElectionData.geojson")
temp = gpd.sjoin(precinct, districtPlan)
pandas.set_option("max_rows", None)
output = open("output.txt", 'w')
output.write(str(temp.head(10000)))