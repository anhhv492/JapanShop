package com.fix.mobile.rest.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.fix.mobile.config.WebConfigrutation;
import com.fix.mobile.entity.*;
import com.fix.mobile.payload.SaveProductRequest;
import com.fix.mobile.service.*;
import org.aspectj.bridge.IMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.text.SimpleDateFormat;
import java.util.*;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping(value= "/rest/admin/product")
public class RestProductsController {
	@Autowired
	private ProductService productService;
	@Autowired
	private RamService ramService;
	@Autowired
	private ColorService colorService;

	@Autowired
	private CapacityService capacityService;

	@Autowired
	private ImageService imageService;

	@Autowired
	private CategoryService categoryService;

	@Autowired
	private Cloudinary cloud;


	@GetMapping("/getAllRam")
	public List<Ram> findAllRam(){
		return ramService.findAll();
	}

	@GetMapping("/getAllCapacity")
	public List<Capacity> findAllCapacity(){
		return capacityService.findAll();
	}
	@GetMapping("/getAllColor")
	public List<Color> findAllColor(){
		return colorService.findAll();
	}
	// ảnh
	@GetMapping("/getAllImage")
	public List<Image> findAllImage(){
		return imageService.findAll();
	}
	// danh mục
	@GetMapping("/category")
	public List<Category> findByCate(){
		return categoryService.findByTypeProduct();
	}

	@GetMapping("/getAll")
	public List<Product> findAll(){
		return productService.findAll();
	}

	@GetMapping(value="/page/{page}")
	public List<Product> findAllPageable(@PathVariable("page") Optional<Integer> page){
		Pageable pageable = PageRequest.of(page.get(), 5);
		List<Product> products = productService.findAll(pageable).getContent();
		return products;
	}

	@RequestMapping(path = "/saveProduct", method = POST, consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	public void save(@ModelAttribute SaveProductRequest saveProductRequest){
		Date date = new Date();
		Product p = new Product();
		p.setName(saveProductRequest.getName());
		p.setNote(saveProductRequest.getNote());
		p.setSize(saveProductRequest.getSize());
		p.setCategory(saveProductRequest.getCategory());
		p.setColor(saveProductRequest.getColor());
		p.setCreateDate(date);
		p.setRam(saveProductRequest.getRam());
		p.setImei(saveProductRequest.getImei());
		p.setCapacity(saveProductRequest.getCapacity());
		p.setCamera(saveProductRequest.getCamera());
		p.setStatus(saveProductRequest.getStatus());
		p.setPrice(saveProductRequest.getPrice());
		productService.save(p);
		try {
			System.out.println("Uploaded the files successfully: " + saveProductRequest.getFiles().size());
			for ( MultipartFile multipartFile :  saveProductRequest.getFiles()) {
				Map r = this.cloud.uploader().upload(multipartFile.getBytes(),
						ObjectUtils.asMap(
								"cloud_name", "dcll6yp9s",
								"api_key", "916219768485447",
								"api_secret", "zUlI7pdWryWsQ66Lrc7yCZW0Xxg",
								"secure", true,
								"folders","c202a2cae1893315d8bccb24fd1e34b816"
						));
				Image i = new Image();
				i.setName(r.get("secure_url").toString());
				i.setProduct(p);
				imageService.save(i);
			}
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}

 	}

	@DeleteMapping("/delete/{id}")
	public void delete(@PathVariable("id") Integer id){
		productService.deleteById(id);
	}

	@PutMapping("/{id}")
	public Product update(@PathVariable("id") Integer id, @RequestBody Product product){
		return productService.update(product,id);
	}
}