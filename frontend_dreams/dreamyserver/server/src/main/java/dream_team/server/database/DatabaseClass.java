package dream_team.server.database;

import java.util.HashMap;

//hibernate class style
//not thread safe - only for learning purposes (NOT A REAL DB!)
import dream_team.server.model.StateMap;
import dream_team.server.model.DistrictPlan;
import dream_team.server.model.Message;
import dream_team.server.model.Profile;
import org.json.JSONObject;
import java.util.Map;

public class DatabaseClass {
	
	private static Map<Long, Message> messages = new HashMap<>();
	private static Map<String, Profile> profiles = new HashMap<>();
	private static Map<String, StateMap> stateMaps = new HashMap<>();
	private static Map<String, DistrictPlan> districtPlans = new HashMap<>();

	
	public static Map<Long, Message> getMessages(){
		return messages;
	}
	public static Map<String, Profile> getProfiles(){
		return profiles;
	}
	public static Map<String, StateMap> getMaps(){
		return stateMaps;
	}
	public static Map<String, DistrictPlan> getPlans(){
		return districtPlans;
	}
}
