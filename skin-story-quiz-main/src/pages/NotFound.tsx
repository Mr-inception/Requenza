import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import logo2 from "@/assets/logo2.2f3ded95.svg";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8 relative">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-100/95 backdrop-blur-sm border-b border-gray-300">
        <div className="flex items-center justify-center px-4 py-2">
          <img src={logo2} alt="Logo" className="h-10 w-auto" />
        </div>
      </div>

      <div className="text-center max-w-md w-full pt-16">
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
