package com.fix.mobile.service;


import com.fix.mobile.entity.Accessory;
import com.fix.mobile.entity.Category;
import com.fix.mobile.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

public interface ProductService extends GenericService<Product, Integer> {

  Page<Product> getByPage(int pageNumber, int maxRecord, Integer status);
	Page<Product> getAll (Pageable page);
	Optional<Product> findByName(String name);
	List<Product> findByCategoryAndStatus(Optional<Category> cate);

	List<Product> findByProductLimit();
	List<Product> findByProductLitmitPrice();

}

