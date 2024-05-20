'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { axiosAuth } from '../axios';

const useAxiosAuth = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    const requestInterceptor = axiosAuth.interceptors.request.use((config) => {
      if (!config.headers.Authorization && session?.user?.token) {
        config.headers['Authorization'] = `Bearer ${session?.user.token}`;
      }

      return config;
    });

    return () => {
      axiosAuth.interceptors.request.eject(requestInterceptor);
    };
  }, [session, status]);

  return axiosAuth;
};

export default useAxiosAuth;
