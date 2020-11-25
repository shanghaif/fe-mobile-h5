import { useState, useEffect } from 'react';

function useVh() {
  const [vh, setVh] = useState(window.innerHeight);
  useEffect(() => {
    setVh(window.innerHeight);
  }, [window.innerHeight]);

  useEffect(() => {
    function resize() {
      setVh(window.innerHeight);
    }
    window.addEventListener('resize', resize, false);
    return () => window.removeEventListener('resize', resize);
  }, []);
  return vh;
}

export default useVh;
