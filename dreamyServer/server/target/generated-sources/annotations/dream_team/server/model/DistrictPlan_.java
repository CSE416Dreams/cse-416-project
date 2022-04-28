package dream_team.server.model;

import dream_team.server.model.District;
import dream_team.server.model.State;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2022-04-28T18:39:58")
@StaticMetamodel(DistrictPlan.class)
public class DistrictPlan_ { 

    public static volatile ListAttribute<DistrictPlan, District> districts;
    public static volatile SingularAttribute<DistrictPlan, String> proposedBy;
    public static volatile SingularAttribute<DistrictPlan, String> planName;
    public static volatile SingularAttribute<DistrictPlan, String> planStatus;
    public static volatile SingularAttribute<DistrictPlan, State> state;
    public static volatile SingularAttribute<DistrictPlan, String> splitID;
    public static volatile SingularAttribute<DistrictPlan, Integer> numSplitCounties;

}