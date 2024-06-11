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
import Login from './components/Login.jsx'
import PostPage from './components/forum/PostPage.jsx'
import store from './redux/store.js'
import { Provider } from 'react-redux'

const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="server" element={<Server />} />
          <Route path="forum" element={<Forum />} />
          <Route path="forum/:postID" element={<PostPage />} />
          <Route path="rules" element={<Rules />} />
          <Route path="help" element={<Help />} />
          <Route path="login" element={<Login />} />
      </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);