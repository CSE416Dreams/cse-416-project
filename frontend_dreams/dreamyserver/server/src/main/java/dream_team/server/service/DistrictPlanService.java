package dream_team.server.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import dream_team.server.database.DatabaseClass;
import dream_team.server.model.DistrictPlan;

public class DistrictPlanService {
	
	private Map<String, DistrictPlan> plans = DatabaseClass.getPlans();
	
	public DistrictPlanService() {
		plans.put("plan-r-mississippi", new DistrictPlan("Republican Proposed Plan", "Republican", "2/5/2021", "Mississippi","On Jan. 24, Gov. Tate Reeves signed Mississippi’s new congressional map into law a few weeks after it passed the legislature along party lines. The map largely leaves the status quo in place: Although the map moves some turf from the 3rd District into the 2nd District in order to account for population changes, its partisan breakdown is the same as the current map: three white-majority, solidly Republican districts and one Black-majority, solidly Democratic district (the 2nd District).", "Enacted"));
		plans.put("plan-r-georgia", new DistrictPlan("Republican Proposed Plan", "Republican", "12/30/2020", "Georgia","The new map has five districts in which white voters are a minority of the voting-age population, unchanged from the current lines despite the fact that much of Georgia's population growth since 2010 has been driven by people of color. As a result, multiple federal lawsuits claim the map dilutes the political power of Black voters, in violation of the Voting Rights Act and/or the U.S. Constitution. However, the delay in making the maps official meant the lawsuits were filed too close to the May 24 primary, and on Feb. 28 a judge cited that fact in allowing the maps to stand, at least for the 2022 election.", "Proposed"));
		plans.put("plan-d-georgia", new DistrictPlan("Democratic Proposed Plan", "Democratic", "12/30/2020", "Georgia", "The new map has five districts in which white voters are a minority of the voting-age population, unchanged from the current lines despite the fact that much of Georgia's population growth since 2010 has been driven by people of color. As a result, multiple federal lawsuits claim the map dilutes the political power of Black voters, in violation of the Voting Rights Act and/or the U.S. Constitution. However, the delay in making the maps official meant the lawsuits were filed too close to the May 24 primary, and on Feb. 28 a judge cited that fact in allowing the maps to stand, at least for the 2022 election.", "Proposed"));
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