import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Todo App</h1>
        <nav>
          <Link to="/" className="text-white hover:underline mx-2">Home</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
