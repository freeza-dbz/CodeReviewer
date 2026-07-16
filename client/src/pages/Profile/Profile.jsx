import React, { useEffect, useState } from 'react';
import { getProfile } from '../../api/userApi';
import { User, Mail, Calendar, Code, Star } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

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
              <p className="text-gray-400 flex items-center gap-2"><Mail className="w-4 h-4" /> {profile.email}</p>
            </div>
            <div className="flex gap-2">
              <span className="bg-gray-900 border border-gray-700 text-gray-300 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" /> Pro Member
              </span>
            </div>
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
