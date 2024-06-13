import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from "./components/layout/main/home.tsx";
import Login from "./view/login.tsx";
import {useState} from "react";

function App(): JSX.Element {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <section className={'w-full h-[100vh] flex'}>
            <BrowserRouter>
                <Routes>
                    <Route path={'/*'} element={isLoggedIn ? <Home/> : <Navigate to={'/login'}/>}/>
                    <Route path={'/login'} element={<Login setIsLogged={setIsLoggedIn}/>}/>
                </Routes>
            </BrowserRouter>
        </section>
    );
}

export default App
