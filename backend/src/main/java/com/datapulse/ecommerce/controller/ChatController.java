package com.datapulse.ecommerce.controller;
import com.datapulse.ecommerce.dto.request.ChatRequest;
import com.datapulse.ecommerce.dto.response.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController @RequestMapping("/api/chat") @Tag(name="AI Chatbot")
public class ChatController {
    @PostMapping("/ask") public ResponseEntity<ApiResponse<Map<String,String>>> ask(@RequestBody ChatRequest req) {
        return ResponseEntity.ok(ApiResponse.success(Map.of("question",req.getQuestion(),"answer","AI chatbot service is not yet connected.","status","PLACEHOLDER")));
    }
}
