import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from './components/Home';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';

function App() {

  return (
    <>
    
    <Router>
    {/* <Home/> */}
    <Routes>
    <Route exact path="/"element={<Home/>}></Route>
    <Route exact path="/register"element={<Signup/>}></Route>
    <Route exact path="/login" element={<Login/>}></Route>
    </Routes>
    </Router>
    </>
  );
}

export default App;
