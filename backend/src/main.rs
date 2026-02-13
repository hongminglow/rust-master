use axum::{
    extract::{
        ws::{Message, WebSocket, WebSocketUpgrade},
        Path, State,
    },
    http::StatusCode,
    response::IntoResponse,
    routing::{delete, get, post, put},
    Json, Router,
};
use chrono::Local;
use serde::{Deserialize, Serialize};
use std::sync::{Arc, RwLock};
use tokio::time::{interval, Duration};
use tower_http::cors::{Any, CorsLayer};
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize, Clone)]
struct TodoItem {
    id: Uuid,
    title: String,
    completed: bool,
}

#[derive(Debug, Deserialize)]
struct CreateTodo {
    title: String,
}

#[derive(Debug, Deserialize)]
struct UpdateTodo {
    title: Option<String>,
    completed: Option<bool>,
}

type AppState = Arc<RwLock<Vec<TodoItem>>>;

#[tokio::main]
async fn main() {
    // Initialize tracing
    tracing_subscriber::fmt::init();

    let state = Arc::new(RwLock::new(Vec::new()));

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    let app = Router::new()
        .route("/api/todos", get(get_todos).post(create_todo))
        .route("/api/todos/:id", put(update_todo).delete(delete_todo))
        .route("/ws", get(ws_handler))
        .layer(cors)
        .with_state(state);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3001").await.unwrap();
    println!("Backend listening on http://localhost:3001");
    axum::serve(listener, app).await.unwrap();
}

async fn get_todos(State(state): State<AppState>) -> Json<Vec<TodoItem>> {
    let todos = state.read().unwrap();
    Json(todos.clone())
}

async fn create_todo(
    State(state): State<AppState>,
    Json(payload): Json<CreateTodo>,
) -> impl IntoResponse {
    let todo = TodoItem {
        id: Uuid::new_v4(),
        title: payload.title,
        completed: false,
    };
    state.write().unwrap().push(todo.clone());
    (StatusCode::CREATED, Json(todo))
}

async fn update_todo(
    Path(id): Path<Uuid>,
    State(state): State<AppState>,
    Json(payload): Json<UpdateTodo>,
) -> impl IntoResponse {
    let mut todos = state.write().unwrap();
    if let Some(todo) = todos.iter_mut().find(|t| t.id == id) {
        if let Some(title) = payload.title {
            todo.title = title;
        }
        if let Some(completed) = payload.completed {
            todo.completed = completed;
        }
        Json(todo.clone()).into_response()
    } else {
        StatusCode::NOT_FOUND.into_response()
    }
}

async fn delete_todo(Path(id): Path<Uuid>, State(state): State<AppState>) -> StatusCode {
    let mut todos = state.write().unwrap();
    if let Some(pos) = todos.iter().position(|t| t.id == id) {
        todos.remove(pos);
        StatusCode::NO_CONTENT
    } else {
        StatusCode::NOT_FOUND
    }
}

async fn ws_handler(ws: WebSocketUpgrade) -> impl IntoResponse {
    ws.on_upgrade(handle_socket)
}

async fn handle_socket(mut socket: WebSocket) {
    let mut ticker = interval(Duration::from_secs(1));
    loop {
        ticker.tick().await;
        let now = Local::now().format("%H:%M:%S").to_string();
        if socket.send(Message::Text(now)).await.is_err() {
            break;
        }
    }
}
