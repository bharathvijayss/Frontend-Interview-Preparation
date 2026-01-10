import { useState } from "react";
import {
  todo_list_container,
  remove_todo_btn,
  todo_box,
  todo_input_box_container,
  todo_input_box,
  todo_name,
  todo_list
} from "./TodoList.module.css";

const TodoList = () => {
  const [todoName, setTodoName] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    const todo = todoName.trim();
    if (!todo) return;

    const newItem = {
      name: todo,
      completed: false,
      id: crypto.randomUUID(),
    };
    setTodos((prev) => [...prev, newItem]);
    setTodoName("");
  };

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((todoItem) => todoItem.id !== id));
  };

  const toggleTodoState = (id) => {
    setTodos((prev) =>
      prev.map((todoItem) => {
        if (todoItem.id === id) {
          return {
            ...todoItem,
            completed: !todoItem.completed,
          };
        }
        return todoItem;
      })
    );
  };

  return (
    <div className={todo_list_container}>
      <div className={todo_input_box_container}>
        <input
          type="text"
          placeholder="add todo"
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
          className={todo_input_box}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <div>
        <ul className={todo_list}>
          {todos.map((todo) => (
            <li key={todo.id} className={todo_box}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodoState(todo.id)}
              />
              <span className={todo.completed ? todo_name : ""}>
                {todo.name}
              </span>
              <button
                className={remove_todo_btn}
                onClick={() => removeTodo(todo.id)}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
