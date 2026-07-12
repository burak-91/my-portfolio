package Portfolio.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String company;
    private String year;
    private String title;
    private String link;
    private String image;
    
    @ElementCollection
    @CollectionTable(name = "project_results", joinColumns = @JoinColumn(name = "project_id"))
    private List<ProjectResult> results;
    
    @Embeddable
    @Data
    public static class ProjectResult {
        private String title;
    }
} 