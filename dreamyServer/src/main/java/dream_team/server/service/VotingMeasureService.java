package dream_team.server.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import dream_team.server.database.DatabaseClass;
import dream_team.server.model.GeographicsMeasure;
import dream_team.server.model.PopulationMeasure;
import dream_team.server.model.VotingMeasure;
import dream_team.server.model.CompactnessMeasure;
import dream_team.server.model.DistrictPlanSummary;

public class VotingMeasureService {
	private Map<String, VotingMeasure> votemeasures = DatabaseClass.getVmeasures();
	
	public VotingMeasureService() {//double efficiencyGap, int[] estimatedVotingResults, double meanMedianDifference,
		//double lopsidedT, int opportunityDistrict
		votemeasures.put("mississippi-plan1-vote", new VotingMeasure("mississippi-plan1-vote", 0.5, new int[] {8,7,6,2}, 0.5, 0.4, 3));
		votemeasures.put("mississippi-plan2-vote",  new VotingMeasure("mississippi-plan2-vote", 0.5, new int[] {8,7,6,2}, 0.5, 0.4, 3));
		votemeasures.put("georgia-plan1-vote",  new VotingMeasure("georgia-plan1-vote", 0.5, new int[] {8,7,6,2}, 0.5, 0.4, 3));

	}

	public VotingMeasure getvotemeasure(String votemeasureName) {
		return votemeasures.get(votemeasureName);
	}
	public List<VotingMeasure> getAllvotemesaures(){
		return new ArrayList<VotingMeasure>(votemeasures.values());
	}
	
	public VotingMeasure addVoteMeasure(VotingMeasure votemeasure) {
		votemeasures.put(votemeasure.getId(), votemeasure);
		return votemeasure;
	}
}
