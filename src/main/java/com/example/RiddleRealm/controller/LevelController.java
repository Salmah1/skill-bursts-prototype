package com.example.RiddleRealm.controller;

import com.example.RiddleRealm.model.LevelResponse;
import com.example.RiddleRealm.model.Sokoban;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller responsible for generating Sokoban levels.
 *
 * Returns level data as JSON for use by the frontend.
 */
@RestController
public class LevelController {

    /**
     * Generates a Sokoban level for the requested difficulty.
     *
     * @param level requested level number
     * @return generated level data
     */
    @GetMapping("/level/{level}")
    public LevelResponse getLevel(@PathVariable int level) {
        return Sokoban.generateLevel(level);
    }

    /**
     * Generates the final Sokoban challenge level.
     *
     * This endpoint returns the fixed end-game level
     * consisting of a larger board and increased obstacle density.
     *
     * @return final challenge level data
     */
    @GetMapping("/level/final")
    public LevelResponse getFinalLevel() {
        return Sokoban.generateFinalLevel();
    }
}