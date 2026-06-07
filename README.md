# Skill Bursts – MiFuture Hackathon Prototype

## Overview

This project is a web-based learning platform prototype developed for the MiFuture Hackathon.

The platform uses interactive games, accessibility features, and progression systems to help users develop transferable skills in an engaging and accessible way. Through gameplay and challenge-based activities, users can strengthen problem-solving abilities, logical reasoning, strategic thinking, adaptability, and vocabulary skills.

---

## Features

### Sokoban Puzzle Game

- Procedurally generated levels
- Increasing difficulty progression
- BFS-based level validation
- Final challenge level
- Progress tracking

### Wordle Game

- Vocabulary development
- Logical deduction
- Pattern recognition
- Progressive gameplay

### Accessibility Features

- Adjustable text size
- Page zoom controls
- Brightness controls
- Dark mode
- OpenDyslexic font support
- Text-to-speech functionality

### Gamification

- Level progression
- Unlockable challenges
- Skill development messaging

---

## Requirements

Before running the application, ensure the following software is installed:

### Software Requirements

- Java 21
- Gradle 8+

---

## Running the Application

### Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
```

### Start the Application

From the project root directory:

```bash
./gradlew bootRun
```

### Access the Application

Once the application has started successfully, open:

```text
http://localhost:8080/RiddleRealm
```

---

## Example Routes

| Route                                  | Description            |
| -------------------------------------- | ---------------------- |
| `/RiddleRealm`                         | Home Page              |
| `/RiddleRealm/welcome`                 | Dashboard              |
| `/RiddleRealm/login`                   | Login Page             |
| `/RiddleRealm/register`                | Registration Page      |
| `/RiddleRealm/forgotpassword`          | Password Recovery      |
| `/RiddleRealm/accessibility`           | Accessibility Settings |
| `/RiddleRealm/problem-solving-sokoban` | Sokoban Overview       |
| `/RiddleRealm/sokoban`                 | Sokoban Game           |
| `/RiddleRealm/problem-solving-wordle`  | Wordle Overview        |
| `/RiddleRealm/wordle`                  | Wordle Game            |

---

## Technologies Used

### Backend

- Java 21
- Spring Boot 3
- Spring MVC

### Frontend

- HTML5
- CSS3
- JavaScript
- Thymeleaf

### Build Tools

- Gradle
