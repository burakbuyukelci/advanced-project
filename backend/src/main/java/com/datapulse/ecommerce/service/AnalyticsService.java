package com.datapulse.ecommerce.service;

import com.datapulse.ecommerce.dto.response.DashboardResponse;
import com.datapulse.ecommerce.entity.enums.OrderStatus;
import com.datapulse.ecommerce.repository.*;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;

@Service
public class AnalyticsService {
    private final OrderRepository orderRepository; private final UserRepository userRepository;
    private final ProductRepository productRepository;
    public AnalyticsService(OrderRepository or, UserRepository ur, ProductRepository pr) { this.orderRepository=or; this.userRepository=ur; this.productRepository=pr; }

    public DashboardResponse getDashboardData() {
        LocalDateTime now = LocalDateTime.now(), thirtyAgo = now.minusDays(30), sixtyAgo = now.minusDays(60);
        BigDecimal curRev = orderRepository.sumRevenueByDateRange(thirtyAgo, now); if (curRev==null) curRev = BigDecimal.ZERO;
        BigDecimal prevRev = orderRepository.sumRevenueByDateRange(sixtyAgo, thirtyAgo); if (prevRev==null) prevRev = BigDecimal.ZERO;
        long totalOrders = orderRepository.count();
        long curOrders = orderRepository.findByDateRange(thirtyAgo, now).size();
        long prevOrders = orderRepository.findByDateRange(sixtyAgo, thirtyAgo).size();
        Long pending = orderRepository.countByStatus(OrderStatus.PENDING); if(pending==null) pending=0L;
        Long shipped = orderRepository.countByStatus(OrderStatus.SHIPPED); if(shipped==null) shipped=0L;
        Long delivered = orderRepository.countByStatus(OrderStatus.DELIVERED); if(delivered==null) delivered=0L;
        double avgRating = productRepository.findAll().stream().filter(p -> p.getRating()!=null && p.getRating()>0).mapToDouble(p -> p.getRating()).average().orElse(0.0);

        return DashboardResponse.builder().totalRevenue(curRev).revenueGrowth(calcGrowth(prevRev, curRev))
                .totalOrders(totalOrders).ordersGrowth(calcGrowthL(prevOrders, curOrders))
                .totalCustomers(userRepository.count()).customersGrowth("+0%")
                .averageRating(Math.round(avgRating*10.0)/10.0).ratingGrowth("+0.0")
                .pendingOrders(pending).shippedOrders(shipped).deliveredOrders(delivered).build();
    }

    private String calcGrowth(BigDecimal prev, BigDecimal cur) {
        if (prev.compareTo(BigDecimal.ZERO)==0) return cur.compareTo(BigDecimal.ZERO)>0?"+100%":"0%";
        BigDecimal g = cur.subtract(prev).divide(prev,4,RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(100));
        return (g.compareTo(BigDecimal.ZERO)>=0?"+":"") + g.setScale(1,RoundingMode.HALF_UP) + "%";
    }
    private String calcGrowthL(long prev, long cur) {
        if (prev==0) return cur>0?"+100%":"0%";
        double g = ((double)(cur-prev)/prev)*100; return (g>=0?"+":"") + String.format("%.1f",g) + "%";
    }
}
