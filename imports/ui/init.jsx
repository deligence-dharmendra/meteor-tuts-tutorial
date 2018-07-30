// Import package
import React from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter} from 'react-router-dom';
import Router from './Router';

// Create App component
class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        );
    }
}

// Render component
ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('app'));