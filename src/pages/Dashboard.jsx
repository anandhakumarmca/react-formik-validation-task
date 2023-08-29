import React from 'react';
import BookList from '../components/BookList';
// import AuthorList from '../components/AuthorList';
import '../styles/Dashboard.css'; // Import your CSS file

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Library Management Dashboard</h1>
      <div className="dashboard-content">
        <BookList />
        {/* <AuthorList /> */}
      </div>
    </div>
  );
}

export default Dashboard;
