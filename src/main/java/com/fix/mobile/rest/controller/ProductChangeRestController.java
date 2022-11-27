package com.fix.mobile.rest.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.fix.mobile.dto.ProductChangeDTO;
import com.fix.mobile.entity.Image;
import com.fix.mobile.entity.ProductChange;
import com.fix.mobile.service.ImageService;
import com.fix.mobile.service.ImayProductService;
import com.fix.mobile.service.ProductChangeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value= "/rest/productchange")
@CrossOrigin("*")
public class ProductChangeRestController {

	@Autowired private ProductChangeService productChangeSerivce;
	@Autowired private Cloudinary cloud;

	@Autowired private ImageService imageService;

	@RequestMapping(value="/save",method = RequestMethod.POST,consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	public void requestProductChange(
			@ModelAttribute List <ProductChangeDTO> productRequest){
		try {
			ProductChange p = new ProductChange();
			for (int i = 0; i < productRequest.size(); i++) {
					p.setAccount(productRequest.get(i).getAccount());
					p.setImei(productRequest.get(i).getImei());
					p.setPrice(productRequest.get(i).getPrice());
					p.setNote(productRequest.get(i).getNote());
					p.setStatus(true);
					productChangeSerivce.save(p);
				for ( MultipartFile multipartFile :  productRequest.get(i).getFiles()) {
					Map r = this.cloud.uploader().upload(multipartFile.getBytes(),
							ObjectUtils.asMap(
									"cloud_name", "dcll6yp9s",
									"api_key", "916219768485447",
									"api_secret", "zUlI7pdWryWsQ66Lrc7yCZW0Xxg",
									"secure", true,
									"folders","c202a2cae1893315d8bccb24fd1e34b816"
							));
					Image image = new Image();
					image.setName(r.get("secure_url").toString());
					System.out.println(image.getName() + " ddddddddddddddddd");
					image.setProductChange(p);
					imageService.save(image);
				}
			}


		}catch (Exception e){
			e.getMessage();
		}
	}

}