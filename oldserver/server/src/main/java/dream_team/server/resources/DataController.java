package dream_team.server.resources;

import dream_team.server.service.DistrictPlanSummaryService;
import dream_team.server.service.GeographicsMeasureService;
import dream_team.server.service.PopulationMeasureService;
import dream_team.server.service.VotingMeasureService;
import dream_team.server.service.CompactnessMeasureService;
import dream_team.server.service.DemographicsMeasureService;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/plans")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)

public class DataController {
DistrictPlanSummaryService planService = new DistrictPlanSummaryService();
CompactnessMeasureService cms = new CompactnessMeasureService();
DemographicsMeasureService dms = new DemographicsMeasureService();
GeographicsMeasureService gms = new GeographicsMeasureService();
VotingMeasureService vms = new VotingMeasureService();
PopulationMeasureService pms = new PopulationMeasureService();
	
	@GET
	@Path("/{planName}")
	public Response getPlan(@PathParam("planName") String planName) {
		return Response
	            .status(200)
	            .header("Access-Control-Allow-Origin", "*")
	            .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
	            .header("Access-Control-Allow-Credentials", "true")
	            .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
	            .header("Access-Control-Max-Age", "1209600")
	            .entity(planService.getPlanSummary(planName))
	            .build();
		
	}
	
//	@POST
//	public StateMap addMap(StateMap map) {
//		return mapService.addMap(map);
//	}
	
	@GET
	@Path("/cmeasures/{cmeasure-id}")
	public Response getCompactnessMeasure(@PathParam("cmeasure-id") String cmeasureid) {
		return Response
	            .status(200)
	            .header("Access-Control-Allow-Origin", "*")
	            .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
	            .header("Access-Control-Allow-Credentials", "true")
	            .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
	            .header("Access-Control-Max-Age", "1209600")
	            .entity(cms.getcmeasure(cmeasureid))
	            .build();
		
	}
	
	@GET
	@Path("/dmeasures/{dmeasure-id}")
	public Response getDemographicsMeasure(@PathParam("dmeasure-id") String dmeasureid) {
		return Response
	            .status(200)
	            .header("Access-Control-Allow-Origin", "*")
	            .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
	            .header("Access-Control-Allow-Credentials", "true")
	            .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
	            .header("Access-Control-Max-Age", "1209600")
	            .entity(dms.getdmeasure(dmeasureid))
	            .build();
		
	}
	
	@GET
	@Path("/geomeasures/{gmeasure-id}")
	public Response getGeographicMeasure(@PathParam("gmeasure-id") String gmeasureid) {
		return Response
	            .status(200)
	            .header("Access-Control-Allow-Origin", "*")
	            .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
	            .header("Access-Control-Allow-Credentials", "true")
	            .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
	            .header("Access-Control-Max-Age", "1209600")
	            .entity(gms.getgeomeasure(gmeasureid))
	            .build();
		
	}

	@GET
	@Path("/popmeasures/{pmeasure-id}")
	public Response getPopulationMeasure(@PathParam("pmeasure-id") String pmeasureid) {
		return Response
	            .status(200)
	            .header("Access-Control-Allow-Origin", "*")
	            .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
	            .header("Access-Control-Allow-Credentials", "true")
	            .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
	            .header("Access-Control-Max-Age", "1209600")
	            .entity(pms.getpopmeasure(pmeasureid))
	            .build();
		
	}
	
	@GET
	@Path("/votemeasures/{vmeasure-id}")
	public Response getVotingMeasure(@PathParam("vmeasure-id") String vmeasureid) {
		return Response
	            .status(200)
	            .header("Access-Control-Allow-Origin", "*")
	            .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
	            .header("Access-Control-Allow-Credentials", "true")
	            .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
	            .header("Access-Control-Max-Age", "1209600")
	            .entity(vms.getvotemeasure(vmeasureid))
	            .build();
		
	}
	
}