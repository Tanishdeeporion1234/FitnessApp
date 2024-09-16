import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Componen/Login';
import Dashboard from './Componen/Dashboard';

interface AppState {
  isAuthenticated: boolean;
}

export default class App extends Component<{}, AppState> {
  state: AppState = {
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true', 
  };

  handleLoginSuccess = () => {
    this.setState({ isAuthenticated: true });
    localStorage.setItem('isAuthenticated', 'true'); 
  };

  handleLogout = () => {
    this.setState({ isAuthenticated: false });
    localStorage.removeItem('isAuthenticated');
  };

  render() {
    const { isAuthenticated } = this.state;

    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLoginSuccess={this.handleLoginSuccess} />}
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard onLogout={this.handleLogout} /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    );
  }
}
