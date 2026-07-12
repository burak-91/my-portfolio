package Portfolio.backend.service;

import Portfolio.backend.model.EmailRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final String from;
    private final String recipient;

    public EmailService(JavaMailSender mailSender,
                        @Value("${spring.mail.username}") String from,
                        @Value("${app.contact.recipient}") String recipient) {
        this.mailSender = mailSender;
        this.from = from;
        this.recipient = recipient;
    }

    public void sendEmail(EmailRequest request) {
        SimpleMailMessage message = new SimpleMailMessage();
        // Gmail yabanci From adreslerini reddeder: From biziz, Reply-To ziyaretci
        message.setFrom(from);
        message.setReplyTo(request.getEmail());
        message.setTo(recipient);
        message.setSubject("Portfolio Contact Form: " + request.getName());
        message.setText("From: " + request.getName() + "\nEmail: " + request.getEmail()
                + "\n\nMessage:\n" + request.getMessage());

        mailSender.send(message);
    }
}
