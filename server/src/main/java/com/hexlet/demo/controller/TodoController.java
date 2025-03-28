package com.hexlet.demo.controller;

import com.hexlet.demo.model.Todo;
import com.hexlet.demo.services.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todos")
public class TodoController {
    @Autowired
    private TodoService todoService;

    @GetMapping
    public ResponseEntity<List<Todo>> getUserTodos(Authentication authentication) {
        String username = authentication.getName();
        List<Todo> todos = todoService.findByUsername(username);
        return ResponseEntity.ok(todos);
    }

    @PostMapping
    public ResponseEntity<Todo> createTodo(
            Authentication authentication,
            @RequestBody Todo newTodo) {

        String username = authentication.getName();
        Todo createdTodo = todoService.createTodo(username, newTodo);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(createdTodo);
    }

}
