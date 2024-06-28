import { useCallback, useEffect, useState } from "react";
import { TodoForm } from "../TodoForm/TodoForm";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "../Todo/Todo";
import { EditTodoForm } from "../EditTodoForm/EditTodoForm";
import { FilterButtons } from "../FilterButtons/FilterButtons";
import React from "react";

export type TodoType = {
  id: string;
  task: string;
  completed: boolean;
  isEditing: boolean;
};
export type FilterButtonsType = "Active" | "Completed" | "All";

export const TodoWrapper = React.memo((props: any) => {
  const [todos, setTodos] = useState<Array<TodoType>>([]);
  const [filter, setFilter] = useState<FilterButtonsType>("All");

  useEffect(() => {
    setTodos(
      props.tasks.map((task: any) => ({
        ...task,
        isEditing: false,
      }))
    );
  }, [props.tasks]);

  const addTodo = useCallback(
    (task: string) => {
      if (task.trim().length > 0) {
        const newTodos = [
          ...todos,
          { id: uuidv4(), task, completed: false, isEditing: false },
        ];
        setTodos(newTodos);
        props.onSave(newTodos);
      }
    },
    [todos, props]
  );

  const toggleComplete = useCallback(
    (id: string) => {
      const newTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(newTodos);
      props.onSave(newTodos);
    },
    [todos, props]
  );

  const deleteTask = useCallback(
    (id: string) => {
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
      props.onSave(newTodos);
    },
    [todos, props]
  );

  const editTodo = useCallback(
    (id: string) => {
      const newTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      );
      setTodos(newTodos);
    },
    [todos]
  );

  const editTask = useCallback(
    (task: string, id: string) => {
      const newTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: false } : todo
      );
      setTodos(newTodos);
      props.onSave(newTodos);
    },
    [todos, props]
  );

  const changeFilter = useCallback((value: FilterButtonsType) => {
    setFilter(value);
  }, []);

  let tasksForTodo = todos;
  if (filter === "Completed") {
    tasksForTodo = todos.filter((t) => t.completed);
  } else if (filter === "Active") {
    tasksForTodo = todos.filter((t) => !t.completed);
  }

  return (
    <div className="">
      <TodoForm addTodo={addTodo} />
      {tasksForTodo.map((todo, index) =>
        todo.isEditing ? (
          <EditTodoForm tasks={todo} editTodo={editTask} />
        ) : (
          <Todo
            task={todo}
            key={index}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
            editTodo={editTodo}
          />
        )
      )}
      <FilterButtons changeFilter={changeFilter} />
    </div>
  );
});
