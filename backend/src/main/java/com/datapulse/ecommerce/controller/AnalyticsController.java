package com.datapulse.ecommerce.controller;
import com.datapulse.ecommerce.dto.response.ApiResponse;
import com.datapulse.ecommerce.dto.response.DashboardResponse;
import com.datapulse.ecommerce.service.AnalyticsService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/analytics") @Tag(name="Analytics")
public class AnalyticsController {
    private final AnalyticsService analyticsService;
    public AnalyticsController(AnalyticsService as) { this.analyticsService = as; }
    @GetMapping("/dashboard") @PreAuthorize("hasAnyRole('CORPORATE','ADMIN')") public ResponseEntity<ApiResponse<DashboardResponse>> getDashboard() { return ResponseEntity.ok(ApiResponse.success(analyticsService.getDashboardData())); }
}
