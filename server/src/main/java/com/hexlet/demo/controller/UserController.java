package com.hexlet.demo.controller;

import com.hexlet.demo.model.User;
import com.hexlet.demo.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class UserController {
    private UserService userService;


    @GetMapping("/")
    public String greet(HttpServletRequest request) {
        return "Welcome to Telusko "+request.getSession().getId();
    }

    @GetMapping("/users")
    public List<User> index() {
        return userService.getAllUsers();
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.register(user);
    }
}
