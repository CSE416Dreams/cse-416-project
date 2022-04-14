package dream_team.server.database;

import java.util.HashMap;


//hibernate class style
//not thread safe - only for learning purposes (NOT A REAL DB!)
import dream_team.server.model.StateMap;
import dream_team.server.model.VotingMeasure;
import dream_team.server.model.CompactnessMeasure;
import dream_team.server.model.DemographicsMeasure;
import dream_team.server.model.DistrictPlanSummary;
import dream_team.server.model.GeographicsMeasure;
import dream_team.server.model.PopulationMeasure;
import dream_team.server.model.State;

import org.json.JSONObject;
import java.util.Map;

public class DatabaseClass {
	
	private static Map<String, StateMap> stateMaps = new HashMap<>();
	private static Map<String, State> states = new HashMap<>();
	
	private static Map<String, DistrictPlanSummary> planSummaries = new HashMap<>();
	private static Map<String, CompactnessMeasure> cmeasures = new HashMap<>();
	private static Map<String, DemographicsMeasure> dmeasures = new HashMap<>();
	private static Map<String, GeographicsMeasure> geomeasures = new HashMap<>();
	private static Map<String, PopulationMeasure> popmeasures = new HashMap<>();
	private static Map<String, VotingMeasure> vmeasures = new HashMap<>();
	private static Map<String, JSONObject> geojsons = new HashMap<>();


	public static Map<String, StateMap> getMaps(){
		return stateMaps;
	}

	public static Map<String, State> getStates(){
		return states;
	}
	
	public static Map<String, DistrictPlanSummary> getPlanSummaries() {
		return planSummaries;
	}
	public static Map<String, CompactnessMeasure> getcmeasures() {
		return cmeasures;
	}
	public static Map<String, DemographicsMeasure> getdmeasures() {
		return dmeasures;
	}
	public static Map<String, GeographicsMeasure> getGeomeasures() {
		return geomeasures;
	}
	public static Map<String, PopulationMeasure> getPopmeasures() {
		return popmeasures;
	}
	public static Map<String, VotingMeasure> getVmeasures() {
		return vmeasures;
	}
	public static Map<String, JSONObject> getGeojsons() {
		return geojsons;
	}

	
	
}
