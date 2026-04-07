package com.datapulse.ecommerce.entity;

import com.datapulse.ecommerce.entity.enums.ShipmentStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity @Table(name = "shipments")
public class Shipment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @OneToOne(fetch = FetchType.LAZY) @JoinColumn(name = "order_id", nullable = false, unique = true) private Order order;
    private String warehouseBlock; private String modeOfShipment; private String trackingNumber;
    @Enumerated(EnumType.STRING) @Column(nullable = false) private ShipmentStatus status;
    private Integer customerCareCalls; private LocalDateTime shippedDate; private LocalDateTime deliveryDate;

    public Shipment() {}
    @PrePersist protected void onCreate() { if (this.status == null) this.status = ShipmentStatus.PROCESSING; }

    public Long getId() { return id; } public void setId(Long id) { this.id = id; }
    public Order getOrder() { return order; } public void setOrder(Order v) { this.order = v; }
    public String getWarehouseBlock() { return warehouseBlock; } public void setWarehouseBlock(String v) { this.warehouseBlock = v; }
    public String getModeOfShipment() { return modeOfShipment; } public void setModeOfShipment(String v) { this.modeOfShipment = v; }
    public String getTrackingNumber() { return trackingNumber; } public void setTrackingNumber(String v) { this.trackingNumber = v; }
    public ShipmentStatus getStatus() { return status; } public void setStatus(ShipmentStatus v) { this.status = v; }
    public Integer getCustomerCareCalls() { return customerCareCalls; } public void setCustomerCareCalls(Integer v) { this.customerCareCalls = v; }
    public LocalDateTime getShippedDate() { return shippedDate; } public void setShippedDate(LocalDateTime v) { this.shippedDate = v; }
    public LocalDateTime getDeliveryDate() { return deliveryDate; } public void setDeliveryDate(LocalDateTime v) { this.deliveryDate = v; }

    public static ShipmentBuilder builder() { return new ShipmentBuilder(); }
    public static class ShipmentBuilder {
        private Order order; private String warehouseBlock, modeOfShipment, trackingNumber;
        private ShipmentStatus status; private Integer customerCareCalls; private LocalDateTime shippedDate, deliveryDate;
        public ShipmentBuilder order(Order v) { this.order = v; return this; }
        public ShipmentBuilder warehouseBlock(String v) { this.warehouseBlock = v; return this; }
        public ShipmentBuilder modeOfShipment(String v) { this.modeOfShipment = v; return this; }
        public ShipmentBuilder trackingNumber(String v) { this.trackingNumber = v; return this; }
        public ShipmentBuilder status(ShipmentStatus v) { this.status = v; return this; }
        public ShipmentBuilder customerCareCalls(Integer v) { this.customerCareCalls = v; return this; }
        public ShipmentBuilder shippedDate(LocalDateTime v) { this.shippedDate = v; return this; }
        public ShipmentBuilder deliveryDate(LocalDateTime v) { this.deliveryDate = v; return this; }
        public Shipment build() {
            Shipment s = new Shipment(); s.order=order; s.warehouseBlock=warehouseBlock; s.modeOfShipment=modeOfShipment;
            s.trackingNumber=trackingNumber; s.status=status; s.customerCareCalls=customerCareCalls;
            s.shippedDate=shippedDate; s.deliveryDate=deliveryDate; return s;
        }
    }
}
