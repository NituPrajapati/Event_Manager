import './App.css'
import{ BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import ProtectedRoute from './context/ProtectedRoute.jsx';
import Unauthorized from "./pages/Unauthorized.jsx";
import EventList from './components/EventList.jsx';


function App() {
  

  return (
    <>
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userDashboard" element={<ProtectedRoute allowedRoles={["user"]}>
              <UserDashboard />
            </ProtectedRoute>} />
          <Route path="/adminDashboard" element={<ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/eventList" element={<EventList />} />
        </Routes>    
    </BrowserRouter>
    </>
  )
}
 
export default App
