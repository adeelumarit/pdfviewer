import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../views/Home';
import Login from '../Auth-ui/Login';
import SearchForm from '../views/Search';
import ExcelTableComponent from '../views/ExcelTableComponent';
import { getAccessToken } from '../services/Accesstoken';

const AppRouter: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  // check token existence
  useEffect(() => {
    let storedToken = getAccessToken();
    storedToken = storedToken ? JSON.parse(storedToken) : null;
    setToken(storedToken);
  }, []);

  return (
    <div>
      <Router>
        <Routes>

          <Route path="/" element={token ? <Home /> : <Login />} />
          <Route path="/SearchPage" element={<SearchForm />} />
          <Route path="/ExceltblComponent" element={<ExcelTableComponent />} />


        </Routes>
      </Router>
    </div>
  );
};

export default AppRouter;
