export function TodoItem({ completed, id, title, toggleTodo, deleteTodo, onDragStart, onDragOver, onDrop }) {
  return (
    <li
      draggable
      onDragStart={e => onDragStart(e, id)}
      onDragOver={onDragOver}
      onDrop={e => onDrop(e, id)}
    >
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={e => toggleTodo(id, e.target.checked)}
        />
        {title}
      </label>
      <button onClick={() => deleteTodo(id)} className="btn btn-danger">
        Delete
      </button>
    </li>
  )
}
