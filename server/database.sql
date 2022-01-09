CREATE DATABASE test;

CREATE TABLE todo (
  todo_id SERIAL PRIMARY KEY,
  todo_date DATE,
  todo_name VARCHAR(255),
  todo_count INT,
  todo_distance INT 
);