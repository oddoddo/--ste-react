import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";

export type Todo = {
  id: string;
  input?: any;
  output?: any;
  completed: boolean;
};

export type TodoState = {
  todos: Todo[];
};

const initialState: TodoState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    toggleTodo: (state, action: PayloadAction<Todo>) => {
      const todo = state.todos.find((t: Todo) => t.id === action.payload.id);
      if (todo) {
        todo.completed = action.payload.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((t: Todo) => t.id !== action.payload);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const { id, output } = action.payload;
      const index = state.todos.findIndex((todo: Todo) => todo.id === id);
      if (index !== -1) {
        const todo = state.todos[index];
        todo.output = output;
        todo.completed = true;
      }
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, updateTodo } =
  todoSlice.actions;

export default todoSlice.reducer;

export const StateTodos = (state: RootState) => state.todo.todos;
