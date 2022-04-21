SELECT * 
FROM dreams.DistrictPlan
JOIN dreams.GeorgiaRepublicanPlan
ON dreams.DistrictPlan.PlanID = dreams.GeorgiaRepublicanPlan.PlanID;