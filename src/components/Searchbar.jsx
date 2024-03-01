import { useEffect, useState } from 'react';
import ListItem from './ListItem';

function Searchbar() {
  const [term, setTerm] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTask = localStorage.getItem('Task');
    if (storedTask) {
      setTodos(JSON.parse(storedTask));
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = { id: todos.length + 1, text: term, completed: false };
    setTodos([...todos, newTodo]);
    localStorage.setItem('Task', JSON.stringify([...todos, newTodo]));
    setTerm('');
  }

  function handleChange(e) {
    setTerm(e.target.value);
  }

  const handleDelete = (itemId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== itemId);
    setTodos(updatedTodos);
    localStorage.setItem('Task', JSON.stringify(updatedTodos));
  };

  const handleComplete = (itemId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === itemId) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
    localStorage.setItem('Task', JSON.stringify(updatedTodos));
  };

  const handleEdit = (itemId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === itemId) {
        return { ...todo, text: term };
      }
      return todo;
    });
    setTodos(updatedTodos);
    localStorage.setItem('Task', JSON.stringify(updatedTodos));
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <input
            type="text"
            onChange={handleChange}
            value={term}
            className="rounded-md px-2 w-full mr-2"
            placeholder="Create a new task..."
          />
          <button
            type="submit"
            className="bg-gray-600 text-white px-2 rounded-md hover:bg-green-600 easw-in-out duration-300"
          >
            Create
          </button>
        </div>
      </form>
      <ul className="taskList ">
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            id={todo.id}
            onDelete={handleDelete}
            onComplete={handleComplete}
            onEdit={handleEdit}
          >
            {todo.text}
          </ListItem>
        ))}
      </ul>
    </div>
  );
}

export default Searchbar;
