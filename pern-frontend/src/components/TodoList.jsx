import PropTypes from 'prop-types'; // Import PropTypes
import Button from './Button';
import axios from 'axios';

function TodoList({ todos, deleteTodo, toggleComplete }) {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      deleteTodo(id);
    } catch (error) {
      console.error('Error deleting todo:', error); 
    } 
  };

  const handleToggleComplete = async (id) => {
    try {
      const todo = todos.find((todo) => todo.id === id);
      await axios.put(`/api/todos/${id}`, { completed: !todo.completed });
      toggleComplete(id);
    } catch (error) {
      console.error('Error toggling complete:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Todo List</h2>
      {todos.map((todo) => (
        <div key={todo.id} className="border-b mb-2 pb-2">
          <h3 className={`text-lg ${todo.completed ? 'line-through' : ''}`}>{todo.title}</h3>
          <p>{todo.description}</p>
          <div className="mt-2">
            <Button onClick={() => handleToggleComplete(todo.id)} className="mr-2">
              {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </Button>
            <Button onClick={() => handleDelete(todo.id)}>Delete</Button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Add prop type validation
TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleComplete: PropTypes.func.isRequired,
};

export default TodoList;
