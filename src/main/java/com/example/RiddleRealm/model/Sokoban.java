package com.example.RiddleRealm.model;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.Random;

/**
 * Generates procedurally-created Sokoban-style levels.
 *
 * Levels increase in complexity as the player progresses by:
 * - increasing board size
 * - increasing wall density
 * - requiring longer optimal paths
 *
 * Breadth-First Search (BFS) is used to calculate the ideal
 * number of moves needed to reach the target.
 */
public class Sokoban {
    private static final char WALL = 'W';
    private static final char PLAYER = 'P';
    private static final char TARGET = 'T';

    private static final Random RANDOM = new Random();

    private Sokoban() {
        // Prevent instantiation
    }

    private static final int[][] DIRECTIONS = {
        {-1, 0}, // up
        {1, 0},  // down
        {0, -1}, // left
        {0, 1}   // right
    };

    /**
     * Creates and initialises an empty game board.
     *
     * Every cell is populated with a blank space character,
     * representing an accessible tile.
     *
     * @param gridSize size of the square board
     * @return empty board ready for level generation
     */
    private static char[][] createEmptyBoard(int gridSize) {
        char[][] board = new char[gridSize][gridSize];

        for (int row = 0; row < gridSize; row++) {
            for (int col = 0; col < gridSize; col++) {
                board[row][col] = ' ';
            }
        }

        return board;
    }

    /**
     * Randomly places wall tiles on the board.
     *
     * Walls act as obstacles that the player cannot move through.
     *
     * @param board board to modify
     * @param wallCount number of walls to place
     */
    private static void addWalls(char[][] board, int wallCount) {
        int gridSize = board.length;

        for (int i = 0; i < wallCount; i++) {
            int row = RANDOM.nextInt(gridSize);
            int col = RANDOM.nextInt(gridSize);
            board[row][col] = WALL;
        }
    }

    /**
     * Retrieves all currently accessible positions on the board.
     *
     * Accessible positions are empty cells that can be used
     * for player or target placement.
     *
     * @param board game board to inspect
     * @return list of accessible row and column coordinates
     */
    private static List<int[]> getAccessiblePositions(char[][] board) {
        List<int[]> positions = new ArrayList<>();

        for (int row = 0; row < board.length; row++) {
            for (int col = 0; col < board[row].length; col++) {
                if (board[row][col] == ' ') {
                    positions.add(new int[]{row, col});
                }
            }
        }

        return positions;
    }
   
    /**
     * Generates a playable level for the specified difficulty level.
     *
     * @param level current player level
     * @return generated board, player position, target position,
     *         and calculated ideal move count
     */
    public static LevelResponse generateLevel(int level) {
        int gridSize = getGridSize(level);
        char[][] board = createEmptyBoard(gridSize);

        // Increase obstacle count as levels become harder.
        int numWalls = level * 2;
        addWalls(board, numWalls);

        // Collect all empty cells that can be used for player and target placement.
        List<int[]> accessiblePositions = getAccessiblePositions(board);

        if (accessiblePositions.size() >= 2) {

            int[] playerPosition =
                    accessiblePositions.remove(
                            RANDOM.nextInt(accessiblePositions.size()));

            int[] targetPosition =
                    accessiblePositions.remove(
                            RANDOM.nextInt(accessiblePositions.size()));

            board[playerPosition[0]][playerPosition[1]] = PLAYER;
            board[targetPosition[0]][targetPosition[1]] = TARGET;

            // Calculate shortest valid path between player and target.
            int idealMoves = calculateIdealMoves(
                    board,
                    playerPosition[0],
                    playerPosition[1],
                    targetPosition[0],
                    targetPosition[1]
            );

            // Regenerate the level if it is unsolvable or too easy.
            if (idealMoves == -1) {
                return generateLevel(level);
            }

            return new LevelResponse(
                board,
                new Position(playerPosition[1], playerPosition[0]),
                new Position(targetPosition[1], targetPosition[0]),
                idealMoves
            );

        } else {
            return generateLevel(level);
        }
    }

    /**
     * Generates the final challenge level.
     *
     * This level uses a fixed 20x20 board and significantly
     * more obstacles than normal levels.
     *
     * @return final challenge level
     */
    public static LevelResponse generateFinalLevel() {
        int gridSize = 20;
        char[][] board = createEmptyBoard(gridSize);

        // Generate the final challenge level
        int numWalls = 100;
        addWalls(board, numWalls);

        List<int[]> accessiblePositions = getAccessiblePositions(board);

        if (accessiblePositions.size() < 2) {
            return generateFinalLevel();
        }

        int[] playerPosition =
                accessiblePositions.remove(
                        RANDOM.nextInt(accessiblePositions.size()));

        int[] targetPosition =
                accessiblePositions.remove(
                        RANDOM.nextInt(accessiblePositions.size()));

        board[playerPosition[0]][playerPosition[1]] = PLAYER;
        board[targetPosition[0]][targetPosition[1]] = TARGET;

        int idealMoves = calculateIdealMoves(board, playerPosition[0], playerPosition[1], targetPosition[0], targetPosition[1]);

        if (idealMoves == -1) {
            return generateFinalLevel();
        }

        return new LevelResponse(
            board,
            new Position(playerPosition[1], playerPosition[0]),
            new Position(targetPosition[1], targetPosition[0]),
            idealMoves
        );
    }

    /**
     * Determines board dimensions based on level progression.
     *
     * @param level current player level
     * @return board size
     */
    private static int getGridSize(int level) {
        if (level <= 20) {
            return 10;
        } else if (level <= 40) {
            return 12;
        } else if (level <= 60) {
            return 14;
        } else if (level <= 80) {
            return 16;
        } else {
            return 18;
        }
    }

    /**
     * Uses Breadth-First Search (BFS) to determine the shortest
     * path from the player position to the target.
     *
     * Returns -1 if:
     * - no valid path exists
     * - the path is considered too short for the board size
     *
     * @return shortest path length or -1
     */
    private static int calculateIdealMoves(char[][] board, int playerRow, int playerCol, int targetRow, int targetCol) {
        int gridSize = board.length;

        Queue<int[]> queue = new LinkedList<>();
        boolean[][] visited = new boolean[gridSize][gridSize];
        int[][] distance = new int[gridSize][gridSize];

        queue.offer(new int[]{playerRow, playerCol});
        visited[playerRow][playerCol] = true;
        distance[playerRow][playerCol] = 0;

        while (!queue.isEmpty()) {
            int[] current = queue.poll();
            int row = current[0];
            int col = current[1];

            if (row == targetRow && col == targetCol) {
                if (distance[row][col] <= gridSize) {
                    return -1;
                }

                return distance[row][col];
            }

            // Explore neighbouring cells: up, down, left, right.
            for (int[] direction : DIRECTIONS) {
                int newRow = row + direction[0];
                int newCol = col + direction[1];

                if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize
                        && !visited[newRow][newCol] && board[newRow][newCol] != WALL) {
                    queue.offer(new int[]{newRow, newCol});
                    visited[newRow][newCol] = true;
                    distance[newRow][newCol] = distance[row][col] + 1;
                }
            }
        }

        return -1;
    }


}