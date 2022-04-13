package dream_team.server.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="tix_event")
public class EntityManager {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @NotNull
  @Column(name = "id")
  private int id;
  @Column(name = "title")
  private String title;
  @Column(name = "uid")
  private int uid;
  @Column(name = "created")
  private String created;
  @Column(name="description")
  private String desc;
  
  public int getId() {
    return id;
  }
  public void setId(int id) {
    this.id = id;
  }
  public String getTitle() {
    return title;
  }
  public void setTitle(String title) {
    this.title = title;
  }
  public int getUid() {
    return uid;
  }
  public void setUid(int uid) {
    this.uid = uid;
  }
  public String getCreated() {
    return created;
  }
  public void setCreated(String created) {
    this.created = created;
  }
  public String getDesc() {
    return desc;
  }
  public void setDesc(String desc) {
    this.desc = desc;
  }
}