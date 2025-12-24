'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { UserData } from '@stacks/connect';

type Profile = {
  username?: string;
  bio?: string;
  avatarUrl?: string;
  socialLinks?: {
    twitter?: string;
    github?: string;
    website?: string;
  };
  walletAddress?: string;
};

type ProfileContextType = {
  profile: Profile | null;
  isLoading: boolean;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load profile from localStorage on mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
          setProfile(JSON.parse(savedProfile));
        }
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      const updatedProfile = { ...profile, ...updates } as Profile;
      setProfile(updatedProfile);
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      
      // Here you would typically save to your backend
      // await saveProfileToBackend(updatedProfile);
      
      return updatedProfile;
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, isLoading, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
