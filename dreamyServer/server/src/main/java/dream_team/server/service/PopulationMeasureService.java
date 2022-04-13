package dream_team.server.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import dream_team.server.database.DatabaseClass;
import dream_team.server.model.GeographicsMeasure;
import dream_team.server.model.PopulationMeasure;
import dream_team.server.model.CompactnessMeasure;
import dream_team.server.model.DistrictPlanSummary;

public class PopulationMeasureService {
	private Map<String, PopulationMeasure> popmeasures = DatabaseClass.getPopmeasures();
	
	public PopulationMeasureService() {
		popmeasures.put("mississippi-plan1", new PopulationMeasure("mississippi-plan1-pop", 0.5));
		popmeasures.put("mississippi-plan2",  new PopulationMeasure("mississippi-plan2-pop", 0.3));
		popmeasures.put("georgia-plan1",  new PopulationMeasure("georgia-plan1-pop", 0.4));

	}

	public PopulationMeasure getpopmeasure(String popmeasureName) {
		return popmeasures.get(popmeasureName);
	}
	public List<PopulationMeasure> getAllpopmesaures(){
		return new ArrayList<PopulationMeasure>(popmeasures.values());
	}
	
	public PopulationMeasure addPopMeasure(PopulationMeasure popmeasure) {
		popmeasures.put(popmeasure.getId(), popmeasure);
		return popmeasure;
	}
}
