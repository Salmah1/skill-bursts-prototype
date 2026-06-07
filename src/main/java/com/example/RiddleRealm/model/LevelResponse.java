package com.example.RiddleRealm.model;

/**
 * Represents the data returned for a generated Sokoban level.
 *
 * Contains the board layout, player position,
 * target position and optimal move count.
 */
public class LevelResponse {

    private final char[][] board;
    private final Position player;
    private final Position target;
    private final int idealMoves;

    /**
     * Creates a level response object.
     *
     * @param board generated game board
     * @param player player starting position
     * @param target target position
     * @param idealMoves optimal number of moves
     */
    public LevelResponse(
            char[][] board,
            Position player,
            Position target,
            int idealMoves) {

        this.board = board;
        this.player = player;
        this.target = target;
        this.idealMoves = idealMoves;
    }

    public char[][] getBoard() {
        return board;
    }

    public Position getPlayer() {
        return player;
    }

    public Position getTarget() {
        return target;
    }

    public int getIdealMoves() {
        return idealMoves;
    }
}