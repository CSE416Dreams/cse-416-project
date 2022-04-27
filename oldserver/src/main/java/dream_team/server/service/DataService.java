package dream_team.server.service;

public class DataService {
	//for the measures
	 public static void main(String[] args) {

	    }

	    public double squareRoot(double squareRooted) {
	        double result = 0;
	        double squareRoot = squareRooted / 2;
	        do {
	            result = squareRoot;
	            squareRoot = (result + (squareRooted / result)) / 2;
	        } while ((result - squareRoot) != 0);
	        return squareRoot;
	    }

	    public Boolean isMajorityMinorityDistrict(int totalPopulation, int white) {
	        int minorities = totalPopulation - white;
	        if(minorities > totalPopulation) {
	            return true;
	        }
	        return false;
	    }

	    public int totalMajorityMinorityDistricts(district[] districts) {
	        int numOfMajorityMinorityDistricts = 0;
	        for(district temp : districts) {
	            if(isMajorityMinorityDistrict(temp.population, temp.white) == true) {
	                numOfMajorityMinorityDistricts++;
	            }
	        }
	        return numOfMajorityMinorityDistricts;
	    }

	    public double equalPopulationMeasure(district[] districts) {
	        double totalSum = 0;
	        for(district temp : districts) {
	            numOfMajorityMinorityDistricts += districts.population;
	        }
	        double mean = totalSum/(double)districts.length;
	        double sqDiff = 0;
	        for(district temp : districts) {
	            sqDiff += (districts.population - mean) * (districts.population - mean);
	        }
	        return sqDiff/(double)districts.length;
	    }

	    public double polsbyPopperValue(district District) {
	        double area = District.area;
	        double perimeter = District.perimeter;
	        return ((12.56) * (area/(perimeter * perimeter)));
	    }

	    public double schwartzbergValue(district District) {
	        double area = District.area;
	        double perimeter = District.perimeter;
	        double temp = squareRoot((area / 3.14));
	        return (1/((perimeter)/(6.28 * temp)));
	    }

	    public double efficiencyGap(district[] districts) {
	        int wasted = 0;
	        int total = 0;
	        for (district temp : districts) {
	            wasted += (temp.voteRep - temp.voteDem);
	            total += temp.voteRep;
	            total += temp.voteDem;
	        }
	        double efficiencygap = (double)wasted / (double)total;
	        return efficiencygap;
	    }

	    public int[] estimatedVotingResults() {
	        return null;
	    }

	    public double meanMedianDifference(district[] districts) {
	        double[] votes = new double[districts.length];
	        for(int x = 0; x < districts.length; x++) {
	            double temp = (double)(districts[x].voteRep - districts[x].voteDem)/(districts[x].voteRep + districts[x].voteDem);
	            votes[x] = temp;
	        }
	        Arrays.sort(votes);
	        double median = 0;
	        if(votes.length % 2 != 0)
	            median = (double) votes[votes.length/2];
	        else
	            median = (double) (votes[(votes.length - 1)/2] + votes[votes.length / 2] / 2.0);
	        double mean = 0;
	        for(int x = 0; x < votes.length; x++) {
	            mean += votes[x];
	        }
	        mean = mean / votes.length;
	        return mean - median;
	    }

	    public Boolean opportunityDistrict(district District) {
	        double wasted = District.voteRep - District.voteDem;
	        wasted = wasted/(District.voteRep + District.voteDem);
	        if(wasted < 0.5) {
	            return true;
	        }
	        return false;
	    }

}
