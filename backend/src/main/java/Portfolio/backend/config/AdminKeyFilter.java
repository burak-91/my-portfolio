package Portfolio.backend.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * /api/projects üzerindeki yazma isteklerini (POST/PUT/DELETE) X-Admin-Key
 * header'ı ile korur. GET ve CORS preflight (OPTIONS) herkese açıktır.
 */
@Component
public class AdminKeyFilter extends OncePerRequestFilter {

    @Value("${admin.api-key}")
    private String adminKey;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String method = request.getMethod();
        boolean isWrite = request.getRequestURI().startsWith("/api/projects")
                && !"GET".equals(method)
                && !"OPTIONS".equals(method);

        if (isWrite && !adminKey.equals(request.getHeader("X-Admin-Key"))) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\":\"Unauthorized\"}");
            return;
        }
        filterChain.doFilter(request, response);
    }
}
