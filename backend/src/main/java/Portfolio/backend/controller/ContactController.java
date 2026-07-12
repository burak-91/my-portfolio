package Portfolio.backend.controller;

import Portfolio.backend.model.EmailRequest;
import Portfolio.backend.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final EmailService emailService;

    @PostMapping
    public ResponseEntity<?> sendEmail(@RequestBody EmailRequest request) {
        try {
            emailService.sendEmail(request);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("İletişim e-postası gönderilemedi", e);
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                    .body(Map.of("error", "mail_failed",
                            "message", "Mesaj şu anda iletilemiyor, lütfen daha sonra tekrar deneyin."));
        }
    }
}
