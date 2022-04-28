package dream_team.server.model;

import dream_team.server.model.Demographics;
import dream_team.server.model.DistrictPlan;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2022-04-28T18:40:00")
@StaticMetamodel(District.class)
public class District_ { 

    public static volatile SingularAttribute<District, Long> area;
    public static volatile SingularAttribute<District, String> districtID;
    public static volatile SingularAttribute<District, Long> perimeter;
    public static volatile SingularAttribute<District, Integer> voteRep;
    public static volatile SingularAttribute<District, Integer> voteDem;
    public static volatile SingularAttribute<District, DistrictPlan> planName;
    public static volatile SingularAttribute<District, Integer> districtNum;
    public static volatile SingularAttribute<District, String> incumbent;
    public static volatile SingularAttribute<District, Integer> population;
    public static volatile SingularAttribute<District, Demographics> demographics;

}