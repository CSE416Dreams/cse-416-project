import sys
from geopandas import gpd
import pandas

districtPlan = gpd.read_file(sys.argv[1])
precinct = gpd.read_file(sys.argv[2])
temp = gpd.sjoin(precinct, districtPlan)
pandas.set_option("max_rows", None)
pandas.set_option("max_columns", None)
output = open("output.txt", 'w')
output.write(str(temp.loc[:, ~temp.columns.isin(['GEOID', 'votes_total', 'votes_per_sqkm', 'pct_dem_lead', 'geometry', 'index_right'])].head(10000)))
