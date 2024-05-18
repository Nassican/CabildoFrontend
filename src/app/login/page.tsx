"use client";

import React, { useEffect } from "react";
import LoginForm from "./components/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center overflow-auto h-screen bg-gradient-to-b from-[#FF9505] to-[#BB4802] min-h-screen dark:from-slate-800 dark:to-slate-900">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
