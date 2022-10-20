package com.fix.mobile.controller;

import com.fix.mobile.constant.HttpConstantMessage;
import com.fix.mobile.exception.ErrorMessage;
import com.fix.mobile.exception.SaleException;
import com.fix.mobile.exception.StaffException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.security.sasl.SaslException;

@ControllerAdvice
public class ApplicationExceptionHandler {
    @ExceptionHandler(value = {
            SaleException.class
    })
    protected ResponseEntity<ErrorMessage> handleExceptionSale(Exception exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                ErrorMessage.builder().code(HttpConstantMessage.SALE_EXCEPTION).message(exception.getMessage()).build()
        );
    }

    @ExceptionHandler(value = {
            StaffException.class
    })
    protected ResponseEntity<ErrorMessage> handleExceptionStaff(Exception exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                ErrorMessage.builder().code(HttpConstantMessage.SALE_NOT_FOUND).message(exception.getMessage()).build()
        );
    }
}
