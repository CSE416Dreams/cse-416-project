SELECT * 
FROM dreams.DistrictPlan
JOIN dreams.MississippiRepublicanPlan
ON dreams.DistrictPlan.PlanID = dreams.MississippiRepublicanPlan.PlanID;