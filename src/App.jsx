import React, { useState, useEffect } from 'react';
import UserList from './components/UserList';
import UserProfile from './components/UserProfile';
import Spinner from './components/Spinner'; 
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Gagal memuat data pengguna.');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <h1>User Dashboard</h1>
        <p>Data Kreatif Prototype</p>
      </header>
      <main className="dashboard-main">
        <div className="user-list-container">
          {loading && (
            <div className="spinner-container">
              <Spinner />
            </div>
          )}
          {error && <p className="error-message">Error: {error}</p>}
          {!loading && !error && (
            <UserList
              users={users}
              selectedUserId={selectedUserId}
              onSelectUser={handleSelectUser}
            />
          )}
        </div>
        <div className="user-profile-container">
          <UserProfile userId={selectedUserId} />
        </div>
      </main>
    </div>
  );
}

export default App;