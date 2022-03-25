package dream_team.server.model;

public class State {
	private String name;
	private String id;
	private long population;
	private double[] demographics;
	public State(String name, String id, long population, double[] demographics) {
		this.name = name;
		this.id = id;
		this.population = population;
		this.demographics = demographics;
	}
	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}
	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}
	/**
	 * @return the population
	 */
	public long getPopulation() {
		return population;
	}
	/**
	 * @param population the population to set
	 */
	public void setPopulation(long population) {
		this.population = population;
	}
	/**
	 * @return the demographics
	 */
	public double[] getDemographics() {
		return demographics;
	}
	/**
	 * @param demographics the demographics to set
	 */
	public void setDemographics(double[] demographics) {
		this.demographics = demographics;
	}

	
	
}
