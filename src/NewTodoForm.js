import { useState } from "react"

export function NewTodoForm({ onSubmit }) {
  const [newItem, setNewItem] = useState("")

  // responsible for submitting user-input 
  function handleSubmit(e) {
    e.preventDefault()
    if (newItem === "") return
    onSubmit(newItem)
    setNewItem("")
  }

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <h1 htmlFor="item" style={{fontSize: "2em", textAlign:"center"}}>What do you want to accomplish?</h1>
        <hr class="divider"/>
        <input
          style={{height:"30px"}}
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          type="text"
          id="item"
          placeholder="What's your task?"
        />
      </div>
      <button className="btn">Add Task</button>
      <hr class="divider"/>
    </form>
  )
}