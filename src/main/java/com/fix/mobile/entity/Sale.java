package com.fix.mobile.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "sale")
public class Sale {

    @Id
    @Column(name = "id_sale")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idSale;

    @Column(name = "name")
    private String name;

    @Column(name = "type_sale")
    private Integer typeSale;

    @Column(name = "create_start")
    private Date createStart;

    @Column(name = "create_end")
    private Date createEnd;

    @Column(name = "voucher")
    private String voucher;

    @Column(name = "value_min")
    private BigDecimal valueMin;

    @Column(name = "money_sale")
    private BigDecimal moneySale;

    @Column(name = "percent_sale")
    private Integer percentSale;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "status")
    private Integer status;

    @Column(name = "create_time")
    private Date createTime;

    @Column(name = "update_time")
    private Date updateTime;

    @Column(name = "user_create")
    private Integer userCreate;

    @Column(name = "user_update")
    private Integer userpdate;

    @Column(name = "detail_sale")
    private String detailSale;

    @JsonIgnore
    @OneToMany(mappedBy = "sale")
    private List<SaleDetail> saleDetails;
}
