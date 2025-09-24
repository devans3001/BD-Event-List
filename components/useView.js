import { useEffect, useState } from "react";


export function useViewport() {
const [width, setWidth] = useState(0);

useEffect(() => {
  if (typeof window !== 'undefined') {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    handleResize(); // initialize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }
}, []);

return {
  width,
  sm: width >= 640,
  md: width >= 768,
  lg: width >= 1024,
};
}
