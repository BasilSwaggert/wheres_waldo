import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs} from "firebase/firestore/lite";
import React, {useState} from "react";
import Header from './components/Header';
import Game from './components/Game';
import "../src/styles/app.css";
import Footer from "./components/Footer";
import LeaderBoard from './components/LeaderBoard';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GameMenu from './components/GameMenu';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDllH6lP5dG9oF1lBrBZ4SbzY7hA-o_jQA",
    authDomain: "project-wheres-waldo.firebaseapp.com",
    databaseURL: "https://project-wheres-waldo-default-rtdb.firebaseio.com",
    projectId: "project-wheres-waldo",
    storageBucket: "project-wheres-waldo.appspot.com",
    messagingSenderId: "980239304211",
    appId: "1:980239304211:web:c4a3ffd8f418454432a1e6",
    measurementId: "G-W224LPFPSE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getData = async () => {
  const waldoCol = collection(db, "waldo");
  const waldoSnapshot = await getDocs(waldoCol);
  const waldo = waldoSnapshot.docs.map(doc => doc.data());
  return waldo;
}

function App() {
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  
  return (
    <div className="app">
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<GameMenu setAlertMessage={setAlertMessage} alertMessage={alertMessage} setShowAlert={setShowAlert} showAlert={showAlert}/>}/>
        <Route path="/play" element={<Game setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} db={db} getData={getData}/>}/>
        <Route path="/leaderboard" element={<LeaderBoard db={db}/>}/>
      </Routes>
    </BrowserRouter>
    <Footer/>
    </div>
  )
}

export default App;