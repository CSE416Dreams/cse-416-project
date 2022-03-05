package dream_team.server.resources;

import dream_team.server.model.StateMap;
import dream_team.server.service.DistrictPlanService;
import jakarta.ws.rs.Consumes;
//import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
//import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
//import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/maps")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)

public class DistrictPlanResource {
DistrictPlanService planService = new DistrictPlanService();
	
	@GET
	@Path("/{mapName}")
	public Response getPlan(@PathParam("planName") String planName) {
		return Response
	            .status(200)
	            .header("Access-Control-Allow-Origin", "*")
	            .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
	            .header("Access-Control-Allow-Credentials", "true")
	            .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
	            .header("Access-Control-Max-Age", "1209600")
	            .entity(planService.getPlan(planName))
	            .build();
		
	}
	
//	@POST
//	public StateMap addMap(StateMap map) {
//		return mapService.addMap(map);
//	}
	
}
