package Portfolio.backend.service;

import Portfolio.backend.model.EmailRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Slf4j
@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final String from;
    private final String recipient;
    private final String resendApiKey;
    private final String resendFrom;
    private final HttpClient httpClient = HttpClient.newHttpClient();

    public EmailService(JavaMailSender mailSender,
                        @Value("${spring.mail.username}") String from,
                        @Value("${app.contact.recipient}") String recipient,
                        @Value("${app.resend.api-key:}") String resendApiKey,
                        @Value("${app.resend.from}") String resendFrom) {
        this.mailSender = mailSender;
        this.from = from;
        this.recipient = recipient;
        this.resendApiKey = resendApiKey;
        this.resendFrom = resendFrom;
    }

    public void sendEmail(EmailRequest request) {
        // Railway gibi SMTP portlarini engelleyen ortamlarda Resend (HTTP API) kullanilir
        if (resendApiKey != null && !resendApiKey.isBlank()) {
            sendViaResend(request);
        } else {
            sendViaSmtp(request);
        }
    }

    private void sendViaSmtp(EmailRequest request) {
        SimpleMailMessage message = new SimpleMailMessage();
        // Gmail yabanci From adreslerini reddeder: From biziz, Reply-To ziyaretci
        message.setFrom(from);
        message.setReplyTo(request.getEmail());
        message.setTo(recipient);
        message.setSubject("Portfolio Contact Form: " + request.getName());
        message.setText(buildBody(request));
        mailSender.send(message);
    }

    private void sendViaResend(EmailRequest request) {
        String json = """
                {"from":"%s","to":["%s"],"reply_to":"%s",\
                "subject":"Portfolio Contact Form: %s","text":"%s"}"""
                .formatted(escape(resendFrom), escape(recipient), escape(request.getEmail()),
                        escape(request.getName()), escape(buildBody(request)));
        try {
            HttpRequest httpRequest = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.resend.com/emails"))
                    .header("Authorization", "Bearer " + resendApiKey)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(json))
                    .build();
            HttpResponse<String> response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() >= 300) {
                throw new IllegalStateException("Resend " + response.statusCode() + ": " + response.body());
            }
        } catch (Exception e) {
            throw new IllegalStateException("Resend ile e-posta gonderilemedi", e);
        }
    }

    private String buildBody(EmailRequest request) {
        return "From: " + request.getName() + "\nEmail: " + request.getEmail()
                + "\n\nMessage:\n" + request.getMessage();
    }

    private String escape(String s) {
        return s == null ? "" : s
                .replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "");
    }
}
