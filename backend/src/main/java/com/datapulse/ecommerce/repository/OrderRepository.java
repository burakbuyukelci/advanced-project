package com.datapulse.ecommerce.repository;

import com.datapulse.ecommerce.entity.Order;
import com.datapulse.ecommerce.entity.enums.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {

    Page<Order> findByUserId(Long userId, Pageable pageable);

    Optional<Order> findByOrderNumber(String orderNumber);

    List<Order> findByStatus(OrderStatus status);

    @Query("SELECT o FROM Order o JOIN o.items oi JOIN oi.product p WHERE p.store.id = :storeId")
    Page<Order> findByStoreId(@Param("storeId") Long storeId, Pageable pageable);

    @Query("SELECT o FROM Order o WHERE o.orderDate BETWEEN :start AND :end")
    List<Order> findByDateRange(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT COUNT(o) FROM Order o WHERE o.status = :status")
    Long countByStatus(@Param("status") OrderStatus status);

    @Query("SELECT SUM(o.totalAmount) FROM Order o WHERE o.orderDate BETWEEN :start AND :end")
    java.math.BigDecimal sumRevenueByDateRange(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
}
