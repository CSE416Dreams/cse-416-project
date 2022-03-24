package dream_team.server.model;

import java.util.List;

public class VotingMeasure {
	private String id;
	private List<String[]> estimatedVotingResult;
	private List<String[]> reliableWins;
	private List<String[]> lopsidedOutcomes;
	private List<String[]> opportunityDistricts;
	public VotingMeasure(String id, List<String[]> estimatedVotingResult, List<String[]> reliableWins,
			List<String[]> lopsidedOutcomes, List<String[]> opportunityDistricts) {
		this.id = id;
		this.estimatedVotingResult = estimatedVotingResult;
		this.reliableWins = reliableWins;
		this.lopsidedOutcomes = lopsidedOutcomes;
		this.opportunityDistricts = opportunityDistricts;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public List<String[]> getEstimatedVotingResult() {
		return estimatedVotingResult;
	}
	public void setEstimatedVotingResult(List<String[]> estimatedVotingResult) {
		this.estimatedVotingResult = estimatedVotingResult;
	}
	public List<String[]> getReliableWins() {
		return reliableWins;
	}
	public void setReliableWins(List<String[]> reliableWins) {
		this.reliableWins = reliableWins;
	}
	public List<String[]> getLopsidedOutcomes() {
		return lopsidedOutcomes;
	}
	public void setLopsidedOutcomes(List<String[]> lopsidedOutcomes) {
		this.lopsidedOutcomes = lopsidedOutcomes;
	}
	public List<String[]> getOpportunityDistricts() {
		return opportunityDistricts;
	}
	public void setOpportunityDistricts(List<String[]> opportunityDistricts) {
		this.opportunityDistricts = opportunityDistricts;
	}
	
	
}
