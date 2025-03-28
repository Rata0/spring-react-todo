package com.hexlet.demo.services;

import com.hexlet.demo.model.Todo;
import com.hexlet.demo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {
    @Autowired
    private TodoRepository todoRepository;

    public List<Todo> findByUsername(String username) {
        return todoRepository.findByUserUsername(username);
    }
}
