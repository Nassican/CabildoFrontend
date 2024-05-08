"use client";

import LoginPage from "./login/page";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      router.push("/dashboard");
    }
  }, [session?.user, router]);

  //
  return (
    <div>
      {session?.user ? (
        <div className="flex justify-center items-center h-screen">
          <div
            className="inline-block h-8 w-8 mr-4 text-[#481500] dark:text-slate-200 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          ></div>
        </div>
      ) : (
        <div>
          <LoginPage />
        </div>
      )}
    </div>
  );
}

export default HomePage;
