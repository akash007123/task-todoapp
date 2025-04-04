import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TodoProvider } from './context/TodoContext';
import { Navigation } from './components/Navigation';
import { TodoPage } from './pages/TodoPage';
import { ProfilePage } from './pages/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <TodoProvider>
        <div className="min-h-screen bg-gray-100">
          <Navigation />
          <Routes>
            <Route path="/" element={<TodoPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </TodoProvider>
    </BrowserRouter>
  );
}

export default App;