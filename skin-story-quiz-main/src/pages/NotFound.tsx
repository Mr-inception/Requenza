import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
      <div className="text-center max-w-md w-full">
        <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">404</h1>
        <p className="mb-6 text-lg sm:text-xl md:text-2xl text-gray-600">Oops! Page not found</p>
        <a 
          href="/" 
          className="inline-block px-6 py-3 text-base sm:text-lg font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors duration-200"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
