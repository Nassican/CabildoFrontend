"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function ButtonAuth() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  console.log('session', session);


  if (session) {
    return (
      <>
        Signed in as {session.user?.num_documento} <br />
        <button
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  );
}