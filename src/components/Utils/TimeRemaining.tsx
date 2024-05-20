import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

function TimeRemaining() {
  const { data: session } = useSession();
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    if (session && session.expires) {
      const expirationTime = new Date(session.expires).getTime();
      const now = new Date().getTime();
      const remainingTime = expirationTime - now;

      if (remainingTime > 0) {
        setTimeRemaining(remainingTime);

        const intervalId = setInterval(() => {
          const now = new Date().getTime();
          const remaining = expirationTime - now;
          if (remaining > 0) {
            setTimeRemaining(remaining);
          } else {
            clearInterval(intervalId);
          }
        }, 1000);

        return () => clearInterval(intervalId);
      }
    }
  }, [session]);

  return (
    <div>
      {timeRemaining !== null ? (
        <p>Tiempo restante hasta la expiración de la sesión: {formatTime(timeRemaining)}</p>
      ) : (
        <p>No hay sesión activa.</p>
      )}
    </div>
  );
}

function formatTime(milliseconds: number) {
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export default TimeRemaining;
