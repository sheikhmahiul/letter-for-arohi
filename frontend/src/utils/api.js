// Utility helper to safely get API URL without triggering Chrome's Private Network Access popup on public hosts
export const getApiUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // Only allow localhost fetch when the website itself is hosted on localhost/127.0.0.1
  if (
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ) {
    return 'http://localhost:8000/api';
  }

  // On public domains like vercel.app, return null if VITE_API_URL is not set to avoid browser permission popups
  return null;
};
