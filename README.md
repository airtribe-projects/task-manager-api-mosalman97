# Task Manager API

A RESTful API for managing tasks, built with Node.js and Express. This project allows users to create, read, update, and delete tasks, making it ideal for integration with task management applications or as a backend for productivity tools.

## Features

- Create, read, update, and delete tasks (CRUD)
- RESTful API design
- JSON-based request and response
- Error handling and validation
- Modular and scalable codebase

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/airtribe-projects/task-manager-api-mosalman97.git
    cd task-manager-api-mosalman97
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**
    - Create a `.env` file in the root directory.
    - Add any required environment variables (e.g., `PORT=3222`).

## Usage

### Start the server

```bash
npm start
```

The API will be available at `http://localhost:3222` (or your configured port).

### Example: Create a Task

```bash
curl -X POST http://localhost:3222/api/v1/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "description": "Milk, eggs, bread", "completed": false,
  "priority":"high"}'
```

### Example: Get All Tasks

```bash
curl http://localhost:3222/api/v1/tasks
```

## API Endpoints

### `GET /tasks`

- **Description:** Retrieve all tasks.
- **Response:** Array of task objects.

### Filter by Completed Task (true/false)

`GET /tasks?completed=true`

- **Description:** Retrieve task that align with completed query.
- **Response:** Array of task objects.

### `GET /tasks/:id`

- **Description:** Retrieve a specific task by ID.
- **Response:** Task object.

### `POST /tasks`

- **Description:** Create a new task.
- **Body:**

    ```json
    {
    	"title": "Task title",
    	"description": "Task description",
    	"completed": false,
    	"priority": "high"
    }
    ```

- **Response:** Created task object.

### `PUT /tasks/:id`

- **Description:** Update an existing task.
- **Body:**
    ```json
    {
    	"title": "Updated title",
    	"description": "Updated description"
    }
    ```
- **Response:** Updated task object.

### `DELETE /tasks/:id`

- **Description:** Delete a task by ID.
- **Response:** Success message.

## Running Locally

1. Ensure you have [Node.js](https://nodejs.org/) installed.
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the server:
    ```bash
    npm start
    ```
4. The API will be running at `http://localhost:3222`.

## License

This project is licensed under the [MIT License](LICENSE).
