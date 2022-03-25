package dream_team.server.model;

import java.util.List;

public class DemographicsMeasure {
	private String id;
	private double[] splitDemographics;
	private List<String[]> racialFairness;
	
	public DemographicsMeasure(String id, double[] splitDemographics, List<String[]> racialFairness) {
		this.id = id;
		this.splitDemographics = splitDemographics;
		this.racialFairness = racialFairness;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public double[] getSplitDemographics() {
		return splitDemographics;
	}
	public void setSplitDemographics(double[] splitDemographics) {
		this.splitDemographics = splitDemographics;
	}
	public List<String[]> getRacialFairness() {
		return racialFairness;
	}
	public void setRacialFairness(List<String[]> racialFairness) {
		this.racialFairness = racialFairness;
	}
	
	
	
}
