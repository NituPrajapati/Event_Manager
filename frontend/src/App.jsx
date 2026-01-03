import './App.css'
import Role from './components/Role.jsx';
import{ Route, Routes} from 'react-router-dom';
import Home from './components/Home.jsx';


function App() {
  

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/role' element={<Role />} />
    </Routes>
    </>
  )
}
 
export default App
