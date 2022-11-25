import './App.css';
import Home from './components/Home';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import EditPage from './components/EditPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/edit/:id" element={<EditPage />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
