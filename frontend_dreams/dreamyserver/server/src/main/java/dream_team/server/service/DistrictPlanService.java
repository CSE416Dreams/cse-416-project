package dream_team.server.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import dream_team.server.database.DatabaseClass;
import dream_team.server.model.DistrictPlan;

public class DistrictPlanService {
	
	private Map<String, DistrictPlan> plans = DatabaseClass.getPlans();
	
	public DistrictPlanService() {
		plans.put("plan1", new DistrictPlan("Republican Proposed Plan", "Republican", "2/5/2021", "Mississippi","On Jan. 24, Gov. Tate Reeves signed Mississippi’s new congressional map into law a few weeks after it passed the legislature along party lines. The map largely leaves the status quo in place: Although the map moves some turf from the 3rd District into the 2nd District in order to account for population changes, its partisan breakdown is the same as the current map: three white-majority, solidly Republican districts and one Black-majority, solidly Democratic district (the 2nd District)."));

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