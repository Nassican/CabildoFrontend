'use client';

import LoginForm from '../../components/Login/LoginForm';

const LoginPage = () => {
  return (
    <div className="flex h-screen min-h-screen items-center justify-center overflow-auto bg-gradient-to-b from-[#FF9505] to-[#BB4802] dark:from-slate-800 dark:to-slate-900">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
