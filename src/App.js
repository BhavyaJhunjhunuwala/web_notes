
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './components/registers/registers';
import Login from './components/login/login';
import { NotesState } from './Context/NotesContext';
import { AuthState } from './Context/AuthContext';
import TodoPages from './components/ComponentContainer/TaskComponents';
import { TaskState } from './Context/TaskContext';
import NotesPage from './components/ComponentContainer/NotesComponent';
import ProtectedRoutes from './ProtectedRoutes';
function App() {
  return (
    <BrowserRouter>
      <NotesState>
          <AuthState>
        <TaskState>
            <Routes>
              <Route path='/notes' element={<ProtectedRoutes Component={ <NotesPage />} />} />
              <Route path='/task' element={<ProtectedRoutes Component={ <TodoPages />} />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/*' element={<ProtectedRoutes Component={ <NotesPage />} />} />
            </Routes>
        </TaskState>
          </AuthState>
      </NotesState>
    </BrowserRouter>
  );
}

export default App;
