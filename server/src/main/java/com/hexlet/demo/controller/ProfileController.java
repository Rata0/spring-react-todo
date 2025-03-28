package com.hexlet.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/profile")
public class ProfileController {

    @GetMapping
    public ResponseEntity<?> getUserProfile(Authentication authentication) {
        return ResponseEntity.ok(authentication.getPrincipal());
    }
}
