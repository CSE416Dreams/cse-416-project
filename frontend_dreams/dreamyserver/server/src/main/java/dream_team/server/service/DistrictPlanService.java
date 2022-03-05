package dream_team.server.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import dream_team.server.database.DatabaseClass;
import dream_team.server.model.DistrictPlan;

public class DistrictPlanService {
	
	private Map<String, DistrictPlan> plans = DatabaseClass.getPlans();
	
	public DistrictPlanService() {
		plans.put("Mississippi", new DistrictPlan());

	}
	public DistrictPlan getPlan(String planName) {
		return plans.get(planName);
	}
	public List<DistrictPlan> getAllPlans(){
		return new ArrayList<DistrictPlan>(plans.values());
	}
	
	public DistrictPlan addPlan(DistrictPlan plan) {
		plans.put(plan.getPlanName(), plan);
		return plan;
	}
	
//	public Message updateMessage (Message message) {
//		if (message.getId() <= 0) {
//			return null;
//		}
//		messages.put(message.getId(), message);
//		return message;
//	}
//	
//	public Message removeMessage(long id) {
//		return messages.remove(id);
//	}
}