import './App.css';
import Home from "./pages/Home";
import Policy from "./pages/Policy";
import News from "./pages/News";
import Quiz from "./pages/Quiz";
import SignIn from "./pages/SignIn";
import DragDrop from './pages/quiz-sites/DragDrop';
import FillIn from './pages/quiz-sites/Fill_In';
import CreateTest from "./pages/Create-Test"
import CreateNews from "./pages/Create-News"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { useState } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

function App() {
  const [admin, setAdmin] = useState(null);

  // Send "Get" request to the server to know if user accessing website is regular or admin user.
  if (!admin){
    axios.get("https://tienganhcoan.herokuapp.com/starting").then(res => {
      setAdmin(res.data.isAdmin);
    })
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home admin={admin} />}/>
          <Route path="/policy" exact element={<Policy admin={admin} />}/>
          <Route path="/news/:newsId" exact element={<News admin={admin} />}/>
          <Route path="/news" exact element={<News admin={admin} />}/>
          <Route path="/quiz" exact element={<Quiz admin={admin} />}/>
          <Route path="/sign-in" exact 
            element={<SignIn 
              isAdmin={(signedIn) => {if (signedIn) {setAdmin(true)} else setAdmin(false)}} 
              admin={admin}/>}/>
          <Route path="/quiz/drag-drop" exact element={<DragDrop admin={admin} />}/>
          <Route path="/quiz/fill-in" exact element={<FillIn admin={admin} />}/>
          <Route path="/create-test" exact element={<CreateTest admin={admin} />}/>
          <Route path="/create-news" exact element={<CreateNews admin={admin} />}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
