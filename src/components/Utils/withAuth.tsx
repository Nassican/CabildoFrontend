import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const AuthComponent: React.FC<P> = (props) => {
    const { data: session, status } = useSession();
    const navigate = useRouter();

    useEffect(() => {
      const handleRedirect = () => {
        if (status === 'authenticated') {
          if (window.location.pathname === '/login') {
            navigate.push('/');
          }
        } else {
          navigate.push('/login');
        }
      };

      handleRedirect();
    }, [status, navigate]);

    if (status === 'loading') {
      return <div>Cargando...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
