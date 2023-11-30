import { TodoItem } from "./TodoItem"

export function TodoList({ todos, toggleTodo, deleteTodo, onDragStart, onDragOver, onDrop }) {
  return (
    <ul className="list">
      {todos.length === 0 && "You have finished everything"}
      {todos.map(todo => {
        return (
          <TodoItem
            {...todo}
            key={todo.id}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
          />
        )
      })}
    </ul>
  )
}