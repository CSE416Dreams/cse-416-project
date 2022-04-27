package dream_team.server.resources;
  

import dream_team.server.model.District;
import dream_team.server.model.DistrictPlan;
import dream_team.server.model.State;
import dream_team.server.service.StateService;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import javax.persistence.*;  
@Path("/states")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)

public class StateController { 
   
	@GET
	@Path("/{stateName}")
	public Response getState(@PathParam("stateName") String stateName) {
	    EntityManagerFactory emf = Persistence.createEntityManagerFactory("state_unit");  
	    EntityManager em = emf.createEntityManager();  
	    
	    State selectedState = (State)em.find(State.class, stateName);
		return Response
	            .status(200)
	            .header("Access-Control-Allow-Origin", "*")
	            .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
	            .header("Access-Control-Allow-Credentials", "true")
	            .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
	            .header("Access-Control-Max-Age", "1209600")
	            .entity(selectedState)
	            .build();
		
	}
	
}  