package dream_team.server.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import dream_team.server.database.DatabaseClass;
import dream_team.server.model.DemographicsMeasure;
import dream_team.server.model.DistrictPlanSummary;

public class DemographicsMeasureService {
	private Map<String, DemographicsMeasure> dmeasures = DatabaseClass.getdmeasures();
	
	public DemographicsMeasureService() {
		dmeasures.put("mississippi-plan1-demo", new DemographicsMeasure("mississippi-plan1-demo", new double[] {0.2,0.4}, 0.3));
		dmeasures.put("mississippi-plan2-demo", new DemographicsMeasure("mississippi-plan2-demo", new double[] {0.2,0.4}, 0.3));
		dmeasures.put("georgia-plan1-demo", new DemographicsMeasure("georgia-plan1-demo",new double[] {0.2,0.4}, 0.3));

	}

	public DemographicsMeasure getdmeasure(String dmeasureName) {
		return dmeasures.get(dmeasureName);
	}
	public List<DemographicsMeasure> getAlldmesaures(){
		return new ArrayList<DemographicsMeasure>(dmeasures.values());
	}
	
	public DemographicsMeasure addDMeasure(DemographicsMeasure dmeasure) {
		dmeasures.put(dmeasure.getId(), dmeasure);
		return dmeasure;
	}
}
