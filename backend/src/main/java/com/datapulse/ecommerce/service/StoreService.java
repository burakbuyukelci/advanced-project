package com.datapulse.ecommerce.service;

import com.datapulse.ecommerce.dto.request.StoreRequest;
import com.datapulse.ecommerce.entity.Store;
import com.datapulse.ecommerce.entity.User;
import com.datapulse.ecommerce.exception.ResourceNotFoundException;
import com.datapulse.ecommerce.repository.StoreRepository;
import com.datapulse.ecommerce.repository.UserRepository;
import com.datapulse.ecommerce.security.UserPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class StoreService {
    private final StoreRepository storeRepository; private final UserRepository userRepository;
    public StoreService(StoreRepository sr, UserRepository ur) { this.storeRepository=sr; this.userRepository=ur; }

    public List<Store> getAllStores() { return storeRepository.findAll(); }
    public Store getStoreById(Long id) { return storeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Store","id",id)); }
    public List<Store> getStoresByOwner(Long ownerId) { return storeRepository.findByOwnerId(ownerId); }

    @Transactional public Store createStore(StoreRequest req) {
        UserPrincipal principal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User owner = userRepository.findById(principal.getId()).orElseThrow();
        return storeRepository.save(Store.builder().name(req.getName()).description(req.getDescription()).owner(owner).isOpen(true).build());
    }

    @Transactional public Store updateStore(Long id, StoreRequest req) {
        Store s = storeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Store","id",id));
        s.setName(req.getName()); s.setDescription(req.getDescription()); return storeRepository.save(s);
    }

    @Transactional public Store toggleStoreStatus(Long id) {
        Store s = storeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Store","id",id));
        s.setIsOpen(!s.getIsOpen()); return storeRepository.save(s);
    }
}
