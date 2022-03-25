package dream_team.server.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import dream_team.server.database.DatabaseClass;
import dream_team.server.model.DistrictPlan;
import dream_team.server.model.State;

public class StateService {
	private Map<String, State> states = DatabaseClass.getStates();
	public StateService() {
//		states.put("plan-r-mississippi", new DistrictPlan("Republican Proposed Plan", "Republican", "2/5/2021", "Mississippi","On Jan. 24, Gov. Tate Reeves signed Mississippi’s new congressional map into law a few weeks after it passed the legislature along party lines. The map largely leaves the status quo in place: Although the map moves some turf from the 3rd District into the 2nd District in order to account for population changes, its partisan breakdown is the same as the current map: three white-majority, solidly Republican districts and one Black-majority, solidly Democratic district (the 2nd District).", "Enacted"));
//		states.put("plan-r-georgia", new DistrictPlan("Republican Proposed Plan", "Republican", "12/30/2020", "Georgia","The new map has five districts in which white voters are a minority of the voting-age population, unchanged from the current lines despite the fact that much of Georgia's population growth since 2010 has been driven by people of color. As a result, multiple federal lawsuits claim the map dilutes the political power of Black voters, in violation of the Voting Rights Act and/or the U.S. Constitution. However, the delay in making the maps official meant the lawsuits were filed too close to the May 24 primary, and on Feb. 28 a judge cited that fact in allowing the maps to stand, at least for the 2022 election.", "Proposed"));
//		states.put("plan-d-georgia", new DistrictPlan("Democratic Proposed Plan", "Democratic", "12/30/2020", "Georgia", "The new map has five districts in which white voters are a minority of the voting-age population, unchanged from the current lines despite the fact that much of Georgia's population growth since 2010 has been driven by people of color. As a result, multiple federal lawsuits claim the map dilutes the political power of Black voters, in violation of the Voting Rights Act and/or the U.S. Constitution. However, the delay in making the maps official meant the lawsuits were filed too close to the May 24 primary, and on Feb. 28 a judge cited that fact in allowing the maps to stand, at least for the 2022 election.", "Proposed"));
		states.put("mississippi", new State("Mississippi","001",2976000,  new double[]{55.9, 59.1, 37.8, 1.1, 0.1, 0.6, -4.0, 12.9, 52.3, 7.4, 57.4}));
	//insert georgia here
	//insert florida here
	}
	public State getState(String state) {
		return states.get(state);
	}
	public List<State> getAllStates(){
		return new ArrayList<State>(states.values());
	}
	
	public State addState(State state) {
		states.put(state.getName(), state);
		return state;
	}

}
