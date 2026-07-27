import { useState, useEffect } from 'react';

export function usePathRoute() {
  const [route, setRoute] = useState(window.location.pathname || '/');

  useEffect(() => {
    const handlePopState = () => {
      setRoute(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (newRoute) => {
    window.history.pushState(null, '', newRoute);
    setRoute(newRoute);
  };

  return { route, navigate };
}
