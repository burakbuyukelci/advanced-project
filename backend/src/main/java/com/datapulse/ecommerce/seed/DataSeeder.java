package com.datapulse.ecommerce.seed;

import com.datapulse.ecommerce.entity.*;
import com.datapulse.ecommerce.entity.enums.OrderStatus;
import com.datapulse.ecommerce.entity.enums.Role;
import com.datapulse.ecommerce.entity.enums.ShipmentStatus;
import com.datapulse.ecommerce.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {
    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);
    private final UserRepository userRepo; private final StoreRepository storeRepo;
    private final CategoryRepository catRepo; private final ProductRepository prodRepo;
    private final OrderRepository orderRepo; private final ReviewRepository reviewRepo;
    private final ShipmentRepository shipRepo; private final CustomerProfileRepository cpRepo;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository ur, StoreRepository sr, CategoryRepository cr, ProductRepository pr,
                      OrderRepository or, ReviewRepository rr, ShipmentRepository shr, CustomerProfileRepository cpr, PasswordEncoder pe) {
        this.userRepo=ur; this.storeRepo=sr; this.catRepo=cr; this.prodRepo=pr; this.orderRepo=or; this.reviewRepo=rr; this.shipRepo=shr; this.cpRepo=cpr; this.passwordEncoder=pe;
    }

    @Override @Transactional
    public void run(String... args) {
        if (userRepo.count() > 0) { log.info("DB already seeded."); return; }
        log.info("=== Seeding Database ===");

        // Users
        User admin = User.builder().fullName("DataPulse Admin").email("admin@datapulse.com").password(passwordEncoder.encode("123456")).role(Role.ADMIN).gender("Male").age(35).city("Istanbul").country("Turkey").enabled(true).build(); userRepo.save(admin);
        User corp1 = User.builder().fullName("Ahmet Yılmaz").email("ahmet@datapulse.com").password(passwordEncoder.encode("123456")).role(Role.CORPORATE).gender("Male").age(42).city("Ankara").country("Turkey").enabled(true).build(); userRepo.save(corp1);
        User corp2 = User.builder().fullName("Elif Kaya").email("elif@datapulse.com").password(passwordEncoder.encode("123456")).role(Role.CORPORATE).gender("Female").age(38).city("Izmir").country("Turkey").enabled(true).build(); userRepo.save(corp2);
        User ind1 = User.builder().fullName("Mehmet Demir").email("mehmet@gmail.com").password(passwordEncoder.encode("123456")).role(Role.INDIVIDUAL).gender("Male").age(28).city("Istanbul").country("Turkey").enabled(true).build(); userRepo.save(ind1);
        User ind2 = User.builder().fullName("Zeynep Çelik").email("zeynep@gmail.com").password(passwordEncoder.encode("123456")).role(Role.INDIVIDUAL).gender("Female").age(24).city("Bursa").country("Turkey").enabled(true).build(); userRepo.save(ind2);
        User ind3 = User.builder().fullName("Can Özkan").email("can@gmail.com").password(passwordEncoder.encode("123456")).role(Role.INDIVIDUAL).gender("Male").age(31).city("Antalya").country("Turkey").enabled(true).build(); userRepo.save(ind3);

        cpRepo.save(CustomerProfile.builder().user(ind1).membershipType("Gold").totalSpend(BigDecimal.valueOf(4500)).itemsPurchased(12).avgRating(4.5).discountApplied(true).satisfactionLevel("Satisfied").build());
        cpRepo.save(CustomerProfile.builder().user(ind2).membershipType("Silver").totalSpend(BigDecimal.valueOf(1200)).itemsPurchased(5).avgRating(4.8).discountApplied(false).satisfactionLevel("Very Satisfied").build());
        cpRepo.save(CustomerProfile.builder().user(ind3).membershipType("Bronze").totalSpend(BigDecimal.valueOf(350)).itemsPurchased(2).avgRating(3.5).discountApplied(false).satisfactionLevel("Neutral").build());

        // Categories
        catRepo.save(Category.builder().name("Wearable Technology").build());
        catRepo.save(Category.builder().name("Audio & Music").build());
        catRepo.save(Category.builder().name("Computers").build());
        catRepo.save(Category.builder().name("Accessories").build());
        catRepo.save(Category.builder().name("Smart Home").build());

        // Stores
        Store store1 = Store.builder().name("DataPulse Tech Store").description("Premium tech products").owner(corp1).isOpen(true).build(); storeRepo.save(store1);
        Store store2 = Store.builder().name("DataPulse Audio Lab").description("High-fidelity audio equipment").owner(corp2).isOpen(true).build(); storeRepo.save(store2);

        Category wearable = catRepo.findByName("Wearable Technology").orElseThrow();
        Category audio = catRepo.findByName("Audio & Music").orElseThrow();
        Category computers = catRepo.findByName("Computers").orElseThrow();
        Category accessories = catRepo.findByName("Accessories").orElseThrow();

        // Products
        prodRepo.saveAll(List.of(
            Product.builder().name("DataPulse Smart Watch").description("Heart rate & GPS, 7-day battery").sku("DP-SW-01").price(BigDecimal.valueOf(299.99)).stock(15).category(wearable).store(store1).rating(4.8).reviewCount(128).imageUrl("https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=400&q=80").build(),
            Product.builder().name("DataPulse Wireless Earbuds").description("ANC, 24h battery").sku("DP-WE-02").price(BigDecimal.valueOf(149.99)).stock(3).category(audio).store(store2).rating(4.5).reviewCount(85).imageUrl("https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80").build(),
            Product.builder().name("DataPulse Vision VR").description("4K, 120Hz").sku("DP-VR-03").price(BigDecimal.valueOf(499.00)).stock(8).category(wearable).store(store1).rating(4.9).reviewCount(42).imageUrl("https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=400&q=80").build(),
            Product.builder().name("DataPulse DevBook Pro").description("16-core CPU, 32GB RAM").sku("DP-LT-04").price(BigDecimal.valueOf(1899.00)).stock(2).category(computers).store(store1).rating(5.0).reviewCount(210).imageUrl("https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80").build(),
            Product.builder().name("DataPulse 4K Creator Monitor").description("32-inch 4K, 99% sRGB").sku("DP-MN-05").price(BigDecimal.valueOf(549.99)).stock(25).category(computers).store(store1).rating(4.7).reviewCount(56).imageUrl("https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=80").build(),
            Product.builder().name("DataPulse Mechanical Keyboard").description("Tactile switches, RGB").sku("DP-KB-06").price(BigDecimal.valueOf(129.50)).stock(50).category(accessories).store(store1).rating(4.6).reviewCount(314).imageUrl("https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=400&q=80").build(),
            Product.builder().name("DataPulse Smart Tuner Pro").description("High-precision clip-on").sku("DP-ST-07").price(BigDecimal.valueOf(45.00)).stock(1).category(audio).store(store2).rating(4.3).reviewCount(19).imageUrl("https://images.unsplash.com/photo-1582216503803-b09787ff0217?auto=format&fit=crop&w=400&q=80").build(),
            Product.builder().name("DataPulse PowerBank 20K").description("20000mAh, 65W").sku("DP-PB-08").price(BigDecimal.valueOf(59.99)).stock(0).category(accessories).store(store1).rating(4.8).reviewCount(412).imageUrl("https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=400&q=80").build()
        ));

        // Orders
        Product sw = prodRepo.findAll().stream().filter(p->p.getSku().equals("DP-SW-01")).findFirst().orElseThrow();
        Product eb = prodRepo.findAll().stream().filter(p->p.getSku().equals("DP-WE-02")).findFirst().orElseThrow();
        Product kb = prodRepo.findAll().stream().filter(p->p.getSku().equals("DP-KB-06")).findFirst().orElseThrow();
        Product lt = prodRepo.findAll().stream().filter(p->p.getSku().equals("DP-LT-04")).findFirst().orElseThrow();

        Order o1 = Order.builder().orderNumber("ORD-100001").user(ind1).status(OrderStatus.DELIVERED).totalAmount(BigDecimal.valueOf(449.98)).paymentMethod("Credit Card").orderDate(LocalDateTime.now().minusDays(15)).build();
        o1.setItems(List.of(OrderItem.builder().order(o1).product(sw).quantity(1).unitPrice(sw.getPrice()).build(), OrderItem.builder().order(o1).product(eb).quantity(1).unitPrice(eb.getPrice()).build()));
        orderRepo.save(o1);
        shipRepo.save(Shipment.builder().order(o1).warehouseBlock("A").modeOfShipment("Road").trackingNumber("TRK-100001").status(ShipmentStatus.DELIVERED).customerCareCalls(0).shippedDate(LocalDateTime.now().minusDays(13)).deliveryDate(LocalDateTime.now().minusDays(10)).build());

        Order o2 = Order.builder().orderNumber("ORD-100002").user(ind2).status(OrderStatus.SHIPPED).totalAmount(BigDecimal.valueOf(129.50)).paymentMethod("Debit Card").orderDate(LocalDateTime.now().minusDays(3)).build();
        o2.setItems(List.of(OrderItem.builder().order(o2).product(kb).quantity(1).unitPrice(kb.getPrice()).build()));
        orderRepo.save(o2);
        shipRepo.save(Shipment.builder().order(o2).warehouseBlock("B").modeOfShipment("Flight").trackingNumber("TRK-100002").status(ShipmentStatus.IN_TRANSIT).customerCareCalls(1).shippedDate(LocalDateTime.now().minusDays(2)).build());

        Order o3 = Order.builder().orderNumber("ORD-100003").user(ind1).status(OrderStatus.PENDING).totalAmount(BigDecimal.valueOf(1899.00)).paymentMethod("Credit Card").orderDate(LocalDateTime.now().minusHours(5)).build();
        o3.setItems(List.of(OrderItem.builder().order(o3).product(lt).quantity(1).unitPrice(lt.getPrice()).build()));
        orderRepo.save(o3);

        // Reviews
        reviewRepo.saveAll(List.of(
            Review.builder().user(ind1).product(sw).starRating(5).reviewText("Excellent smartwatch!").helpfulVotes(12).totalVotes(15).build(),
            Review.builder().user(ind2).product(sw).starRating(4).reviewText("Great product overall.").helpfulVotes(8).totalVotes(10).build(),
            Review.builder().user(ind1).product(eb).starRating(5).reviewText("Best noise cancellation!").helpfulVotes(20).totalVotes(22).build(),
            Review.builder().user(ind2).product(kb).starRating(4).reviewText("Perfect for coding.").helpfulVotes(5).totalVotes(7).build()
        ));

        log.info("=== Seeding Complete: 6 users, 2 stores, 8 products, 3 orders, 4 reviews ===");
    }
}
