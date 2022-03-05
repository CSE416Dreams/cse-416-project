package dream_team.server.model;

@jakarta.xml.bind.annotation.XmlRootElement
public class DistrictPlan {
	private String planName;
	private String proposedParty;
	private String dateEnacted;
	private String state;
	private String summary;
	//private PlanAnalysis planMeasures;
	public DistrictPlan() {
		
	}
	public DistrictPlan(String planName, String proposedParty, String dateEnacted, String state, String summary) {
		super();
		this.planName = planName;
		this.proposedParty = proposedParty;
		this.dateEnacted = dateEnacted;
		this.state = state;
		this.summary = summary;
	}
	public String getPlanName() {
		return planName;
	}
	public void setPlanName(String planName) {
		this.planName = planName;
	}
	public String getProposedParty() {
		return proposedParty;
	}
	public void setProposedParty(String proposedParty) {
		this.proposedParty = proposedParty;
	}
	public String getDateEnacted() {
		return dateEnacted;
	}
	public void setDateEnacted(String dateEnacted) {
		this.dateEnacted = dateEnacted;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getSummary() {
		return summary;
	}
	public void setSummary(String summary) {
		this.summary = summary;
	}
	public String getPlan() {
		// TODO Auto-generated method stub
		return null;
	}
	
	

}
