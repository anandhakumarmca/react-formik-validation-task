import React from "react";
import BookList from "../components/BookList";
import AuthorList from "../components/AuthorList";
import "../styles/Dashboard.css"; // Import your CSS file

function Dashboard() {
  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-logo">Library Management</div>
        {/* <ul className="navbar-links">
          <li className="navbar-link">User</li>
          <li className="navbar-link">Login</li>
        </ul> */}
      </nav>
      <div className="dashboard-content">
        <BookList />
        <AuthorList />
      </div>
    </div>
  );
}

export default Dashboard;
