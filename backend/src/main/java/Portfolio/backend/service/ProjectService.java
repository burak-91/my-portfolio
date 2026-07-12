package Portfolio.backend.service;

import Portfolio.backend.model.Project;
import Portfolio.backend.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectService {
    
    private final ProjectRepository projectRepository;
    
    public List<Project> getAllProjects() {
        try {
            log.debug("Fetching all projects");
            List<Project> projects = projectRepository.findAll();
            log.debug("Found {} projects", projects.size());
            return projects;
        } catch (Exception e) {
            log.error("Error fetching projects: ", e);
            throw e;
        }
    }
    
    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public Project updateProject(Long id, Project project) {
        if (!projectRepository.existsById(id)) {
            throw new IllegalArgumentException("Project not found: " + id);
        }
        project.setId(id);
        return projectRepository.save(project);
    }
    
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
} 