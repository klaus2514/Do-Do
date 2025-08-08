import './App.css';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import { MyProvider } from './MyContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Chat from './Chat';
import PrivateRoute from './PrivateRoute';

function ChatAppLayout() {
  return (
    <div className="main">
      <Sidebar />
      <ChatWindow />
    </div>
  );
}

function App() {
  return (
    <MyProvider>
      <Router>
        <Routes>
          <Route path="/" element= {< Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <ChatAppLayout />
              </PrivateRoute>
            }
          />
          {/* Optional: redirect any unknown route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </MyProvider>
  );
}

export default App;
