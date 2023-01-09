//const Transactions = React.lazy(()=>import('./components/HomeContainer/Transactions'));
import React from "react";
import "./App.css";
import Leftnavbar from "./components/leftNavbar/Leftnavbar";
import { AuthProvider } from "./components/Login/Auth";
import { Route, Routes, Link,createBrowserRouter,RouterProvider } from "react-router-dom"
import Login from "./components/Login/Login";
import RequireAuth from "./components/Home/RequireAuth";
//const Transactions = React.lazy(()=>import('./components/HomeContainer/Transactions'));
import Transactions from "./components/HomeContainer/Transactions";
function App() {
  return (
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/transactions" element={<RequireAuth><Transactions /></RequireAuth>} />
      </Routes>
      </AuthProvider>
  
  );
}

export default App;
