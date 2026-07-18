import React, { useEffect, useState } from 'react';
import { getProfile, updateSettings } from '../../api/userApi';
import { User, Mail, Calendar, Code, Star } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({ username: '', name: '', email: '', password: '', avatar: '' });
  const { updateUser } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSettings(editData);
      const res = await getProfile();
      setProfile(res.data);
      updateUser(res.data);
      setEditMode(false);
      toast.success('Profile updated');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update profile');
    }
  };

  if (loading) return <div className="text-gray-400">Loading profile...</div>;
  if (!profile) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
        <p className="text-gray-400">Manage your personal information.</p>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        <div className="px-8 pb-8 relative">
          <div className="absolute -top-12 border-4 border-gray-800 rounded-full bg-gray-900">
            <img src={profile.avatar} alt="Avatar" className="w-24 h-24 rounded-full" />
          </div>
          
          <div className="pt-16 flex justify-between items-start">
            <div>
                <h2 className="text-2xl font-bold text-white mb-1">{profile.name}</h2>
                <h3 className="text-xl text-gray-300 mb-1">Username: {profile.username}</h3>
                <p className="text-gray-400 flex items-center gap-2"><Mail className="w-4 h-4" /> {profile.email}</p>
                <button onClick={() => {
                  setEditMode(true);
                  setEditData({
                    username: profile.username || '',
                    name: profile.name,
                    email: profile.email,
                    password: '',
                    avatar: profile.avatar || ''
                  });
                }} className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded">Edit</button>
            </div>
                <div className="flex gap-2">
                  <span className="bg-gray-900 border border-gray-700 text-gray-300 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" /> Pro Member
                  </span>
                </div>
                {editMode && (
                  <form onSubmit={handleEditSubmit} className="space-y-4 mt-4 w-full max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                      <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={editData.username}
                        onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={editData.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                      <input
                        type="password"
                        name="password"
                        placeholder="New Password"
                        value={editData.password}
                        onChange={(e) => setEditData({ ...editData, password: e.target.value })}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Profile Photo (Upload from Local Storage)</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">or Profile Photo URL</label>
                      <input
                        type="text"
                        name="avatar"
                        placeholder="Profile Photo URL"
                        value={editData.avatar}
                        onChange={(e) => setEditData({ ...editData, avatar: e.target.value })}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded">Save</button>
                  </form>
                )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center text-center">
          <Calendar className="w-8 h-8 text-blue-500 mb-3" />
          <div className="text-gray-400 text-sm mb-1">Joined Date</div>
          <div className="text-white font-medium">{formatDate(profile.joinedDate)}</div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center text-center">
          <Code className="w-8 h-8 text-purple-500 mb-3" />
          <div className="text-gray-400 text-sm mb-1">Total Reviews</div>
          <div className="text-white font-medium">{profile.totalReviews}</div>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center text-center">
          <Star className="w-8 h-8 text-yellow-500 mb-3" />
          <div className="text-gray-400 text-sm mb-1">Preferred Language</div>
          <div className="text-white font-medium">{profile.preferredLanguage}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
