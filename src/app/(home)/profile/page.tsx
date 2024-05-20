'use client';

import { UserInterface } from '@/types/user-profile';
import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';

import ErrorCustom from '@/components/Errors/ErrorCustom';
import ProfilePagePrincipal from '@/components/Profile/ProfilePage';

import useAxiosAuth from '@/lib/hooks/useAxiosAuth';

const ProfilePage = () => {
  const [, setUser] = useState<UserInterface | null>(null);
  const [error, setError] = useState<string | null>(null);
  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosAuth.get('/users/me');
        setUser(res.data);
        setError(null);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<{ error: string }>;
          if (axiosError.response) {
            throw axiosError.response.data;
          }
        }
        throw new Error('Profile. Unexpected error');
      }
    };

    fetchUser();
  }, [axiosAuth]);

  if (error) {
    return <ErrorCustom {...{ error }} />;
  }

  return (
    <div>
      <ProfilePagePrincipal />
    </div>
  );
};

export default ProfilePage;
