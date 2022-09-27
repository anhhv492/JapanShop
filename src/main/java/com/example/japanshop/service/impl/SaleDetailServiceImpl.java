package com.example.japanshop.service.impl;

import com.example.japanshop.repository.SaleDetailRepository;
import com.example.japanshop.entity.SaleDetail;
import com.example.japanshop.service.SaleDetailService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SaleDetailServiceImpl implements SaleDetailService {
    private final SaleDetailRepository repository;

    public SaleDetailServiceImpl(SaleDetailRepository repository) {
        this.repository = repository;
    }

    @Override
    public SaleDetail save(SaleDetail entity) {
        return repository.save(entity);
    }

    @Override
    public List<SaleDetail> save(List<SaleDetail> entities) {
        return (List<SaleDetail>) repository.saveAll(entities);
    }

    @Override
    public void deleteById(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public Optional<SaleDetail> findById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public List<SaleDetail> findAll() {
        return (List<SaleDetail>) repository.findAll();
    }

    @Override
    public Page<SaleDetail> findAll(Pageable pageable) {
        Page<SaleDetail> entityPage = repository.findAll(pageable);
        List<SaleDetail> entities = entityPage.getContent();
        return new PageImpl<>(entities, pageable, entityPage.getTotalElements());
    }

    @Override
    public SaleDetail update(SaleDetail entity, Integer id) {
        Optional<SaleDetail> optional = findById(id) ;
        if (optional.isPresent()) {
            return save(entity);
        }
        return null;
    }
}