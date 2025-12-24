'use client';

import { useRouter } from 'next/navigation';
import { useProfile } from '@/contexts/ProfileContext';
import { useAccount } from 'wagmi';
import { isAuthenticated } from '../user-session';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const { address } = useAccount();
  const { profile, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: profile?.username || '',
    bio: profile?.bio || '',
    avatarUrl: profile?.avatarUrl || '',
    twitter: profile?.socialLinks?.twitter || '',
    github: profile?.socialLinks?.github || '',
    website: profile?.socialLinks?.website || '',
  });
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/');
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      username: formData.username,
      bio: formData.bio,
      avatarUrl: formData.avatarUrl,
      socialLinks: {
        twitter: formData.twitter,
        github: formData.github,
        website: formData.website,
      },
      walletAddress: address,
    });
    setIsEditing(false);
  };

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-card rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar Section */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-full bg-muted overflow-hidden">
              {profile?.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.username || 'User avatar'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/10 text-4xl">
                  {profile?.username?.charAt(0).toUpperCase() || '?'}
                </div>
              )}
            </div>
            {isEditing && (
              <input
                type="text"
                name="avatarUrl"
                value={formData.avatarUrl}
                onChange={handleInputChange}
                placeholder="Paste image URL"
                className="mt-2 w-full text-sm p-2 border rounded"
              />
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Twitter
                    </label>
                    <input
                      type="text"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleInputChange}
                      placeholder="@username"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      GitHub
                    </label>
                    <input
                      type="text"
                      name="github"
                      value={formData.github}
                      onChange={handleInputChange}
                      placeholder="username"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://example.com"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        username: profile?.username || '',
                        bio: profile?.bio || '',
                        avatarUrl: profile?.avatarUrl || '',
                        twitter: profile?.socialLinks?.twitter || '',
                        github: profile?.socialLinks?.github || '',
                        website: profile?.socialLinks?.website || '',
                      });
                    }}
                    className="px-4 py-2 border rounded hover:bg-muted"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl font-bold">{profile?.username || 'Anonymous User'}</h1>
                  <p className="text-muted-foreground">{address?.slice(0, 6)}...{address?.slice(-4)}</p>
                </div>

                {profile?.bio && (
                  <div className="prose max-w-none">
                    <p>{profile.bio}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-4 pt-2">
                  {profile?.socialLinks?.twitter && (
                    <a
                      href={`https://twitter.com/${profile.socialLinks.twitter.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-500 hover:underline"
                    >
                      <span className="i-mdi-twitter text-xl mr-1"></span>
                      {profile.socialLinks.twitter}
                    </a>
                  )}
                  {profile?.socialLinks?.github && (
                    <a
                      href={`https://github.com/${profile.socialLinks.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-foreground hover:underline"
                    >
                      <span className="i-mdi-github text-xl mr-1"></span>
                      {profile.socialLinks.github}
                    </a>
                  )}
                  {profile?.socialLinks?.website && (
                    <a
                      href={profile.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-foreground hover:underline"
                    >
                      <span className="i-mdi-web text-xl mr-1"></span>
                      {new URL(profile.socialLinks.website).hostname.replace('www.', '')}
                    </a>
                  )}
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setFormData({
                        username: profile?.username || '',
                        bio: profile?.bio || '',
                        avatarUrl: profile?.avatarUrl || '',
                        twitter: profile?.socialLinks?.twitter || '',
                        github: profile?.socialLinks?.github || '',
                        website: profile?.socialLinks?.website || '',
                      });
                      setIsEditing(true);
                    }}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
