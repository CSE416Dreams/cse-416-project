package dream_team.server.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import dream_team.server.database.DatabaseClass;
import dream_team.server.model.CompactnessMeasure;
import dream_team.server.model.DistrictPlanSummary;

public class CompactnessMeasureService {
	private Map<String, CompactnessMeasure> cmeasures = DatabaseClass.getcmeasures();
	
	public CompactnessMeasureService() {
		cmeasures.put("compactness-mississippi-plan1", new CompactnessMeasure(null, 0.2, 0.3));
		cmeasures.put("compactness-mississippi-plan2", new CompactnessMeasure(null, 0.4, 0.3));
		cmeasures.put("compactness-georgia-plan1", new CompactnessMeasure(null, 0.3, 0.3));
		cmeasures.put("compactness-georgia-plan2", new CompactnessMeasure(null, 0.3, 0.4));
		cmeasures.put("compactness-florida-plan1", new CompactnessMeasure(null, 0.3, 0.5));
		cmeasures.put("compactness-florida-plan2", new CompactnessMeasure(null, 0.2, 0.3));
		cmeasures.put("compactness-florida-plan3", new CompactnessMeasure(null, 0.3, 0.4));
	}

	public CompactnessMeasure getcmeasure(String cmeasureName) {
		return cmeasures.get(cmeasureName);
	}
	public List<CompactnessMeasure> getAllcmesaures(){
		return new ArrayList<CompactnessMeasure>(cmeasures.values());
	}
	
	public CompactnessMeasure addCMeasure(CompactnessMeasure cmeasure) {
		cmeasures.put(cmeasure.getId(), cmeasure);
		return cmeasure;
	}
}
