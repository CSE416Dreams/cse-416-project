SELECT * 
FROM dreams.DistrictPlan
JOIN dreams.GeorgiaDemocraticPlan
ON dreams.DistrictPlan.PlanID = dreams.GeorgiaDemocraticPlan.PlanID;