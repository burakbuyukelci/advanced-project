package com.datapulse.ecommerce.dto.response;

import java.math.BigDecimal;

public class DashboardResponse {
    private BigDecimal totalRevenue; private String revenueGrowth, ordersGrowth, customersGrowth, ratingGrowth;
    private Long totalOrders, totalCustomers, pendingOrders, shippedOrders, deliveredOrders; private Double averageRating;

    public BigDecimal getTotalRevenue() { return totalRevenue; } public void setTotalRevenue(BigDecimal v) { this.totalRevenue = v; }
    public String getRevenueGrowth() { return revenueGrowth; } public void setRevenueGrowth(String v) { this.revenueGrowth = v; }
    public Long getTotalOrders() { return totalOrders; } public void setTotalOrders(Long v) { this.totalOrders = v; }
    public String getOrdersGrowth() { return ordersGrowth; } public void setOrdersGrowth(String v) { this.ordersGrowth = v; }
    public Long getTotalCustomers() { return totalCustomers; } public void setTotalCustomers(Long v) { this.totalCustomers = v; }
    public String getCustomersGrowth() { return customersGrowth; } public void setCustomersGrowth(String v) { this.customersGrowth = v; }
    public Double getAverageRating() { return averageRating; } public void setAverageRating(Double v) { this.averageRating = v; }
    public String getRatingGrowth() { return ratingGrowth; } public void setRatingGrowth(String v) { this.ratingGrowth = v; }
    public Long getPendingOrders() { return pendingOrders; } public void setPendingOrders(Long v) { this.pendingOrders = v; }
    public Long getShippedOrders() { return shippedOrders; } public void setShippedOrders(Long v) { this.shippedOrders = v; }
    public Long getDeliveredOrders() { return deliveredOrders; } public void setDeliveredOrders(Long v) { this.deliveredOrders = v; }

    public static DashboardResponseBuilder builder() { return new DashboardResponseBuilder(); }
    public static class DashboardResponseBuilder {
        private final DashboardResponse r = new DashboardResponse();
        public DashboardResponseBuilder totalRevenue(BigDecimal v) { r.totalRevenue=v; return this; }
        public DashboardResponseBuilder revenueGrowth(String v) { r.revenueGrowth=v; return this; }
        public DashboardResponseBuilder totalOrders(long v) { r.totalOrders=v; return this; }
        public DashboardResponseBuilder ordersGrowth(String v) { r.ordersGrowth=v; return this; }
        public DashboardResponseBuilder totalCustomers(long v) { r.totalCustomers=v; return this; }
        public DashboardResponseBuilder customersGrowth(String v) { r.customersGrowth=v; return this; }
        public DashboardResponseBuilder averageRating(double v) { r.averageRating=v; return this; }
        public DashboardResponseBuilder ratingGrowth(String v) { r.ratingGrowth=v; return this; }
        public DashboardResponseBuilder pendingOrders(long v) { r.pendingOrders=v; return this; }
        public DashboardResponseBuilder shippedOrders(long v) { r.shippedOrders=v; return this; }
        public DashboardResponseBuilder deliveredOrders(long v) { r.deliveredOrders=v; return this; }
        public DashboardResponse build() { return r; }
    }
}
