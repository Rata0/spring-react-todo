package com.hexlet.demo.services;

import com.hexlet.demo.model.Todo;
import com.hexlet.demo.model.User;
import com.hexlet.demo.repository.TodoRepository;
import com.hexlet.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {
    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Todo> findByUsername(String username) {
        return todoRepository.findByUserUsername(username);
    }

    public Todo createTodo(String username, Todo newTodo) {
        User user = userRepository.findByUsername(username);
        newTodo.setUser(user);
        return todoRepository.save(newTodo);
    }
}
