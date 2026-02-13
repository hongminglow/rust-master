use axum::{
    extract::{
        ws::{Message, WebSocket, WebSocketUpgrade},
        Path, State,
    },
    http::StatusCode,
    response::IntoResponse,
    Json,
};
use chrono::Local;
use std::sync::{Arc, RwLock};
use tokio::time::{interval, Duration};
use uuid::Uuid;

use crate::models::{CreateTodo, TodoItem, UpdateTodo};

pub type AppState = Arc<RwLock<Vec<TodoItem>>>;

pub async fn get_todos(State(state): State<AppState>) -> Json<Vec<TodoItem>> {
    let todos = state.read().unwrap();
    Json(todos.clone())
}

pub async fn create_todo(
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

pub async fn update_todo(
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

pub async fn delete_todo(Path(id): Path<Uuid>, State(state): State<AppState>) -> StatusCode {
    let mut todos = state.write().unwrap();
    if let Some(pos) = todos.iter().position(|t| t.id == id) {
        todos.remove(pos);
        StatusCode::NO_CONTENT
    } else {
        StatusCode::NOT_FOUND
    }
}

pub async fn ws_handler(ws: WebSocketUpgrade) -> impl IntoResponse {
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
