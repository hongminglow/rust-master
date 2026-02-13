# 🦀 Rust Learning Hub: Beginner-Friendly Template

Welcome to the **Rust Learning Hub**! This is a simple, monorepo-style template designed for beginners to understand how Rust acts as a backend with a modern frontend.

## 🚀 What's Inside?

- **`backend/`**: A Rust-powered REST API using `Axum`.
  - Full CRUD implementation (Create, Read, Update, Delete).
  - Real-time communication via WebSockets (Real-time clock).
  - In-memory data store using `Arc<RwLock<Vec<T>>>`.
- **`frontend/`**: A sleek React (TypeScript + Vite) dashboard.
  - Interactive CRUD interface.
  - Real-time WebSocket clock display in the top right.
  - Premium dark-mode aesthetics.

---

## 🛠️ Getting Started

### 1. Run the Backend
```bash
cd backend
cargo run
```
The backend will start on `http://localhost:3001`.

### 2. Run the Frontend
```bash
cd frontend
npm install
npm run dev
```
The frontend will start on `http://localhost:5173` (or similar).

---

## � Understanding the Stack

### What is Axum?
If you're coming from other languages, think of **Axum** as:
- **Node.js**: Express / Fastify
- **Go**: Gin / Gorilla Mux / Echo
- **Python**: FastAPI

It handles the "Web" part of your Rust backend: routing, parsing JSON requests, sending responses, and managing middlewares (like CORS).

---

## 🛠️ How to Add a New API Route

Follow this flow to add a new feature (e.g., a "Profile" endpoint):

### 1. Define your Data Structure
In `backend/src/models.rs`, create a struct for your data. Use `#[derive(Serialize)]` so Rust can turn it into JSON.
```rust
#[derive(Serialize)]
pub struct Profile {
    pub username: String,
    pub bio: String,
}
```

### 2. Create the Handler Function
In `backend/src/handlers.rs`, create an `async` function.
```rust
pub async fn get_profile() -> Json<Profile> {
    Json(Profile {
        username: String::from("Rustacean"),
        bio: String::from("Learning Rust is fun!"),
    })
}
```

### 3. Register the Route
In `backend/src/main.rs`, add the route to the `Router`:
```rust
use crate::handlers::{get_profile}; // <--- Import it

let app = Router::new()
    .route("/api/profile", get(get_profile)) // <--- Register it
```

### 4. Update the Frontend
In `frontend/src/App.tsx`, you can now fetch from your new endpoint:
```typescript
const fetchProfile = async () => {
  const res = await fetch('http://localhost:3001/api/profile');
  const data = await res.json();
  console.log(data);
};
```

---

## �🧐 Rust vs. Node.js: Syntax Comparison

For developers coming from a Node.js background, Rust might look intimidating at first. Here is a quick comparison to help you bridge the gap:

### 1. Variables & Mutability
*   **Node.js**: All variables are mutable by default (unless using `const`).
    ```javascript
    let x = 5;
    x = 6; // OK
    ```
*   **Rust**: Variables are **immutable** by default. You must use `mut` to change them.
    ```rust
    let mut x = 5;
    x = 6; // OK
    ```

### 2. Error Handling
*   **Node.js**: Uses `try/catch` for synchronous code and `.catch()` for promises.
    ```javascript
    try {
      const data = fs.readFileSync('file.txt');
    } catch (err) {
      console.error(err);
    }
    ```
*   **Rust**: Uses the `Result<T, E>` enum. Errors are values, not exceptions.
    ```rust
    let data = std::fs::read_to_string("file.txt")?; // The '?' operator is magic!
    ```

### 3. State Management (Concurrency)
*   **Node.js**: Single-threaded event loop. Sharing state is easy but can lead to race conditions in complex logic.
    ```javascript
    let todos = []; // Global variable
    ```
*   **Rust**: Multi-threaded safety. You must use "Smart Pointers" like `Arc` (Atomic Reference Counter) and `RwLock` (Read-Write Lock) to safely share data across threads.
    ```rust
    // A thread-safe, shared, mutable list of todos
    let state = Arc::new(RwLock::new(Vec::new()));
    ```

### 4. Direct CRUD Comparison
*   **Node.js (Express)**:
    ```javascript
    app.post('/todos', (req, res) => {
      const todo = req.body;
      todos.push(todo);
      res.status(201).json(todo);
    });
    ```
*   **Rust (Axum)**:
    ```rust
    async fn create_todo(
        State(state): State<AppState>,
        Json(payload): Json<CreateTodo>,
    ) -> impl IntoResponse {
        let todo = TodoItem { id: Uuid::new_v4(), title: payload.title, completed: false };
        state.write().unwrap().push(todo.clone());
        (StatusCode::CREATED, Json(todo))
    }
    ```

---

## 🎯 Key Concepts to Learn
1.  **Ownership**: Rust's unique way of managing memory without a garbage collector.
2.  **Enums & Matching**: Use `match` to handle different outcomes elegantly.
3.  **Strict Typing**: Rust catches most bugs at compile time, so if it compiles, it usually works!

Happy coding! 🦀✨
