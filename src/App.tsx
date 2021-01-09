import React from 'react';
import {HashRouter} from 'react-router-dom';
import './App.css';
import {Header} from './Components/Header/Header';
import {Routes} from './Components/Routes/Routes';

function App() {
    return (
        <div className="App">
            <HashRouter>
                <Header/>
                <Routes/>
            </HashRouter>
        </div>
    );
}

export default App;
