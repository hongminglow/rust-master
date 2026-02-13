use axum::{
    routing::{delete, get, post, put},
    Router,
};
use std::sync::{Arc, RwLock};
use tower_http::cors::{Any, CorsLayer};

mod handlers;
mod models;

use crate::handlers::{create_todo, delete_todo, get_todos, update_todo, ws_handler};

#[tokio::main]
async fn main() {
    // Initialize tracing for logging
    tracing_subscriber::fmt::init();

    // Shared state for our application
    let state = Arc::new(RwLock::new(Vec::new()));

    // Setup CORS for frontend communication
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    // Build our router with routes and state
    let app = Router::new()
        .route("/api/todos", get(get_todos).post(create_todo))
        .route("/api/todos/:id", put(update_todo).delete(delete_todo))
        .route("/ws", get(ws_handler))
        .layer(cors)
        .with_state(state);

    // Run our app with hyper
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3001").await.unwrap();
    println!("🚀 Rust Backend running at http://localhost:3001");

    axum::serve(listener, app).await.unwrap();
}
