import './App.css'
import{ BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import UserDashboard from './pages/UserDashboard.jsx';



function App() {
  

  return (
    <>
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userDashboard" element={<UserDashboard />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}
 
export default App
