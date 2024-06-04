import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from 'react-router-dom';
import App from './App.jsx'
import Home from './components/Home.jsx'
import Server from './components/Server.jsx'
import Forum from './components/Forum.jsx'
import Rules from './components/Rules.jsx'
import Help from './components/Help.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/server" element={<Server />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/help" element={<Help />} />
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);