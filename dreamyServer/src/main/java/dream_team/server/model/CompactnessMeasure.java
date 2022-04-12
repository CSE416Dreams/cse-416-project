package dream_team.server.model;

public class CompactnessMeasure {
	private String id;
	private double polsbyPopperValue;
	private double schwartzValue;
	
	public CompactnessMeasure(String id, double polsbyPopperValue, double schwartzValue) {
		this.id = id;
		this.polsbyPopperValue = polsbyPopperValue;
		this.schwartzValue = schwartzValue;
	}
	public CompactnessMeasure(double polsbyPopperValue, double schwartzValue) {
		this.polsbyPopperValue = polsbyPopperValue;
		this.schwartzValue = schwartzValue;
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
	 * @return the polsbyPopperValue
	 */
	public double getPolsbyPopperValue() {
		return polsbyPopperValue;
	}
	/**
	 * @param polsbyPopperValue the polsbyPopperValue to set
	 */
	public void setPolsbyPopperValue(double polsbyPopperValue) {
		this.polsbyPopperValue = polsbyPopperValue;
	}
	/**
	 * @return the schwartzValue
	 */
	public double getSchwartzValue() {
		return schwartzValue;
	}
	/**
	 * @param schwartzValue the schwartzValue to set
	 */
	public void setSchwartzValue(double schwartzValue) {
		this.schwartzValue = schwartzValue;
	}
}
