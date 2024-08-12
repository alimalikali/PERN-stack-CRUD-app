import PropTypes from 'prop-types'; // Import PropTypes
import { useState } from 'react';
import axios from 'axios';
import Button from './Button';

function TodoForm({ addTodo }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/todos/  ', { title, description });
      addTodo(response.data);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Add Todo</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      />
      <Button type="submit">Add Todo</Button>
    </form>
  );
}

// Add prop type validation
TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default TodoForm;
