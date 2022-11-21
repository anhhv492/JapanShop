package com.fix.mobile.rest.controller;

import com.fix.mobile.entity.Sale;
import com.fix.mobile.entity.SaleDetail;
import com.fix.mobile.service.SaleDetailService;
import com.fix.mobile.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Path;
import java.util.ArrayList;
import java.util.List;

@RestController @RequestMapping("/admin/rest/sale")
public class SaleRestController {

    @Autowired
    SaleService saleSV;

    @Autowired
    SaleDetailService saleDetailSV;

    @RequestMapping("/add")
    public Sale addSale(@RequestBody Sale sale){
        return saleSV.add(sale);
    }
    @RequestMapping("/update")
    public Sale updateSale(@RequestBody Sale sale){
        System.out.println(sale.toString());
        return saleSV.update(sale);
    }

    @RequestMapping("/adddetail/{idx}")
    public void addDetailSale1(@PathVariable(name="idx") Integer idx,
                               @RequestBody ArrayList<String> listID){
        for (int i=0;i<listID.size();i++){
            saleDetailSV.createSaleDetail(listID.get(i),idx);
        }
    }

    @RequestMapping("/updatedetail/{idx}")
    public void updatedetail(@PathVariable(name="idx") Integer idx,
                               @RequestBody ArrayList<String> listID){
        for (int i=0;i<listID.size();i++){
            saleDetailSV.createSaleDetail(listID.get(i),idx);
        }
    }
    @RequestMapping("/getall/{page}")
    public Page<Sale> getAll(@PathVariable ("page") Integer page,
                             @RequestParam ("stt") Integer stt,
                             @RequestParam ("share") String share,
                             @RequestParam ("type") String type
                             ){
        return saleSV.getByPage(page,5,stt,null,null);
    }
    @RequestMapping("/getsale/{id}")
    public Sale finByid(@PathVariable("id") Integer id){
        return saleSV.findByid(id);
    }
    @RequestMapping("/getsaledetail/{id}")
    public List<SaleDetail> finByidsaledetail(@PathVariable("id") Integer id){
        Sale sale = saleSV.findByid(id);
        return saleDetailSV.findByid(sale);
    }

//    @RequestMapping("demotb")
//    public ResponseEntity<Sale> login(@RequestBody Sale sale) {
//        log.info("Begin login");
//        try {
//            // Thực hiện login
//        } finally {
//            log.info("Done");
//        }
//    }
}
