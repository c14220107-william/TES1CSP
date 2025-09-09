import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaThermometerHalf, FaFileAlt } from 'react-icons/fa';
import Spinner from './Spinner';

function UserProfile({ userId }) {
  const [profile, setProfile] = useState({ user: null, posts: [], weather: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchProfileData = async () => {
      setLoading(true);
      setError(null);
      setProfile({ user: null, posts: [], weather: null }); // Reset profile

      try {
        const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!userResponse.ok) throw new Error('Gagal mengambil data pengguna.');
        const userData = await userResponse.json();

        const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        if (!postsResponse.ok) throw new Error('Gagal mengambil data postingan.');
        const postsData = await postsResponse.json();
        
        const { lat, lng } = userData.address.geo;
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`);
        if (!weatherResponse.ok) throw new Error('Gagal mengambil data cuaca.');
        const weatherData = await weatherResponse.json();

        setProfile({ user: userData, posts: postsData, weather: weatherData });

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  if (loading) {
    return (
      <div className="spinner-container">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  if (!profile.user) {
    return (
      <div className="user-profile-panel placeholder">
        <h3>Silakan pilih pengguna dari daftar untuk melihat detail.</h3>
      </div>
    );
  }

  return (
    <div className="user-profile-panel card">
      <div className="card-header">
        <FaUser size={20} />
        <h2>Profil Pengguna</h2>
      </div>
      <div className="card-body">
        <h3>{profile.user.name}</h3>
        <p className="username">@{profile.user.username}</p>
        
        <div className="user-info">
          <p><FaEnvelope /> <span>{profile.user.email}</span></p>
          <p><FaMapMarkerAlt /> <span>{profile.user.address.city}</span></p>
        </div>
        
        <hr />

        <div className="weather-info">
          <h4><FaThermometerHalf /> Cuaca Saat Ini</h4>
          <p className="temperature">
            {profile.weather.current_weather.temperature}
            <span>°C</span>
          </p>
        </div>

        <hr />

        <div className="posts-info">
          <h4><FaFileAlt /> Postingan Pengguna (5 Terbaru)</h4>
          <ul className="post-list">
            {profile.posts.slice(0, 5).map(post => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;