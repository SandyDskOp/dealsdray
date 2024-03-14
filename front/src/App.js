import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/UnprotectedRoutes.js/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import LoadingModal from "./Components/UtillClasses/LoadingModal";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false); 

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth === "true") {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setAuthChecked(true); 
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem("auth", "true");
  };

  if (!authChecked) {
    return <LoadingModal display={true} />;
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/*"
          element={loggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </div>
  );
}

export default App;
