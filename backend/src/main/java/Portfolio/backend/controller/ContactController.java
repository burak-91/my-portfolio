package Portfolio.backend.controller;

import Portfolio.backend.model.EmailRequest;
import Portfolio.backend.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {
    
    private final EmailService emailService;
    
    @PostMapping
    public ResponseEntity<Void> sendEmail(@RequestBody EmailRequest request) {
        emailService.sendEmail(request);
        return ResponseEntity.ok().build();
    }
} 