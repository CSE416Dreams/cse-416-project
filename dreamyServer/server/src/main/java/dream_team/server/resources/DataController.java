package dream_team.server.resources;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import dream_team.server.model.DistrictPlan;
import dream_team.server.oldservice.CompactnessMeasureService;
import dream_team.server.oldservice.DemographicsMeasureService;
import dream_team.server.oldservice.DistrictPlanSummaryService;
import dream_team.server.oldservice.GeographicsMeasureService;
import dream_team.server.oldservice.PopulationMeasureService;
import dream_team.server.oldservice.VotingMeasureService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
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
	public Response getPlan(
			/* HttpServletRequest request, HttpServletResponse response, */ @PathParam("planName") String planName) {
	    EntityManagerFactory emf = Persistence.createEntityManagerFactory("state_unit");  
	    EntityManager em = emf.createEntityManager();  
	    
		/*
		 * HttpSession session = request.getSession(); DistrictPlan dp = (DistrictPlan)
		 * session.getAttribute(planName); if(dp == null) { //query the db }
		 */
	    List<String> results = em.createQuery("SELECT * from DistrictPlans where StateID = value").setParameter("value", 1).getResultList();
	    
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
	

	
	@GET
	@Path("/cmeasures/{cmeasure-id}")
	public Response getCompactnessMeasure(@PathParam("cmeasure-id") String cmeasureid) {
		return Response
				//get current district plan from session
				//use the current district plan geometrics to calculate compactness
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