package com.example.RiddleRealm.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * MVC controller responsible for routing users to
 * application pages and views.
 */
@Controller
@RequestMapping("/RiddleRealm")
public class PageController {
    @GetMapping
    public String home() {
        return "home";
    }

    @GetMapping("/welcome")
    public String welcome() {
        return "dashboard";
    }

    @GetMapping("/sokoban")
    public String sokoban() {
        return "sokoban";
    }

    @GetMapping("/problem-solving-sokoban")
    public String problemSolvingSokoban() {
        return "problemsolving";
    }

    @GetMapping("/problem-solving-wordle")
    public String problemSolvingWordle() {
        return "problemsolvingwordle";
    }

    @GetMapping("/wordle")
    public String wordle() {
        return "wordle";
    }

    @GetMapping("/register")
    public String register() {
        return "register";
    }

    @PostMapping("/register")
    public String handleRegister() {
        return "redirect:/RiddleRealm/login";
    }

    @GetMapping("/forgotpassword")
    public String forgotPassword() {
        return "forgotpassword";
    }

    @PostMapping("/forgotpassword")
    public String handleForgotPassword() {
        return "redirect:/RiddleRealm/login";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }
    
    @GetMapping("/accessibility")
    public String accessibility() {
        return "accessibility";
    }
}
