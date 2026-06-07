package com.example.RiddleRealm.model;

/**
 * Represents a coordinate on the game board.
 */
public class Position {

    private final int x;
    private final int y;

    /**
     * Creates a board position.
     *
     * @param x horizontal coordinate
     * @param y vertical coordinate
     */
    public Position(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }
}