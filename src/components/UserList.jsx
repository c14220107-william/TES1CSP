import React from 'react';

function UserList({ users, selectedUserId, onSelectUser }) {
  return (
    <div className="user-list-panel">
      <h2>Daftar Pengguna</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            className={`user-list-item ${user.id === selectedUserId ? 'active' : ''}`}
            onClick={() => onSelectUser(user.id)}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;