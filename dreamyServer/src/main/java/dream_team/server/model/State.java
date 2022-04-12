package dream_team.server.model;

public class State {
	private String name;
	private String id;
	private long population;
	private DistrictPlanSummary[] dps; //dps will hold the four district plan summaries
	public State(String name, String id, long population, double[] demographics) {
		this.name = name;
		this.id = id;
		this.population = population;
		this.dps = new DistrictPlanSummary[4];
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
	 * @return the dps
	 */
	public DistrictPlanSummary[] getDps() {
		return dps;
	}
	/**
	 * @param dps the dps to set
	 */
	public void setDps(DistrictPlanSummary[] dps) {
		this.dps = dps;
	}

	
	
}
