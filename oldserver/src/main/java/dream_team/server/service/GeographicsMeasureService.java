package dream_team.server.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import dream_team.server.database.DatabaseClass;
import dream_team.server.model.GeographicsMeasure;
import dream_team.server.model.CompactnessMeasure;
import dream_team.server.model.DistrictPlanSummary;

public class GeographicsMeasureService {
	private Map<String, GeographicsMeasure> geomeasures = DatabaseClass.getGeomeasures();
	
	public GeographicsMeasureService() {
		geomeasures.put("mississippi-plan1-geo", new GeographicsMeasure("mississippi-plan1-geo", new CompactnessMeasure(0.2,0.3), 3));
		geomeasures.put("mississippi-plan2-geo",  new GeographicsMeasure("mississippi-plan2-geo", new CompactnessMeasure(0.2,0.3), 3));
		geomeasures.put("georgia-plan1-geo",  new GeographicsMeasure("georgia-plan1-geo", new CompactnessMeasure(0.2,0.3), 3));
		geomeasures.put("georgia-plan2-geo",  new GeographicsMeasure("georgia-plan2-geo", new CompactnessMeasure(0.2,0.3), 3));
		geomeasures.put("florida-plan1-geo",  new GeographicsMeasure("florida-plan1-geo", new CompactnessMeasure(0.2,0.3), 3));
		geomeasures.put("florida-plan2-geo",  new GeographicsMeasure("florida-plan2-geo", new CompactnessMeasure(0.2,0.3), 3));
		geomeasures.put("florida-plan3-geo",  new GeographicsMeasure("florida-plan3-geo", new CompactnessMeasure(0.2,0.3), 3));
	}

	public GeographicsMeasure getgeomeasure(String geomeasureName) {
		return geomeasures.get(geomeasureName);
	}
	public List<GeographicsMeasure> getAllgeomesaures(){
		return new ArrayList<GeographicsMeasure>(geomeasures.values());
	}
	
	public GeographicsMeasure addCMeasure(GeographicsMeasure geomeasure) {
		geomeasures.put(geomeasure.getId(), geomeasure);
		return geomeasure;
	}
}
