import { useEffect, useState } from "react"
import { NewTodoForm } from "./NewTodoForm"
import "./styles.css"
import { TodoList } from "./TodoList"

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
  })

  // update local storage when todos change
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  // adds new todo item
  function addTodo(title) {
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ]
    })
  }

  // toggle completion of todo item
  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }

        return todo
      })
    })
  }

  // deletes a todo item
  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  // other functions allow for drag-and-drop of todo item
  function handleDragStart(e, id) {
    e.dataTransfer.setData("text/plain", id);
  }

  function handleDragOver(e) {
    e.preventDefault(); // Necessary for allowing drop
  }

  function handleDrop(e, droppedOnId) {
    e.preventDefault(); // Preventing default drop behavior
    const draggedId = e.dataTransfer.getData("text");
    rearrangeTodos(draggedId, droppedOnId);
} 

  function rearrangeTodos(draggedId, droppedOnId) {
      setTodos(currentTodos => {
          const draggedIndex = currentTodos.findIndex(todo => todo.id === draggedId);
          const droppedIndex = currentTodos.findIndex(todo => todo.id === droppedOnId);

          if (draggedIndex < 0 || droppedIndex < 0) return currentTodos; // Invalid drag and drop indices

          const newTodos = [...currentTodos];
          const [reorderedItem] = newTodos.splice(draggedIndex, 1);
          newTodos.splice(droppedIndex, 0, reorderedItem);

          return newTodos;
      });
}

  return (
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Your list for today:</h1>
      <TodoList
      todos={todos}
      toggleTodo={toggleTodo}
      deleteTodo={deleteTodo}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      />
    </>
  )
}