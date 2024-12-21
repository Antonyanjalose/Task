// src/components/UserList.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');

  
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  
  const handleUpdate = async (userId) => {
    if (!name || !email || !age) {
      setError('All fields are required');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/users/edit/${userId}`, { name, email, age });
      setName('');
      setEmail('');
      setAge('');
      setError('');
      setEditingUser(null); 
      fetchUsers(); 
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

 
  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/users/delete/${userId}`);
        fetchUsers(); 
      } catch (err) {
        console.error('Error deleting user:', err);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>All Users</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
     
      {editingUser && (
        <div>
          <h3>Edit User</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleUpdate(editingUser._id); }}>
            <div>
              <label>Name:</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>
            <div>
              <label>Email:</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div>
              <label>Age:</label>
              <input 
                type="number" 
                value={age} 
                onChange={(e) => setAge(e.target.value)} 
                required 
              />
            </div>
            <button type="submit">Update User</button>
            <button type="button" onClick={() => setEditingUser(null)}>Cancel</button>
          </form>
        </div>
      )}

      {/* User list */}
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} ({user.email}) - Age: {user.age}
            <button onClick={() => { 
              setEditingUser(user); 
              setName(user.name); 
              setEmail(user.email); 
              setAge(user.age); 
            }}>
              Edit
            </button>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
