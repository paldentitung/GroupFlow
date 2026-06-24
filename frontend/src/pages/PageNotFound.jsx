import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <h1 className="text-9xl font-medium tracking-tighter text-gray-900">
        404
      </h1>
      <div className="w-10 h-0.5 bg-gray-200 my-4 rounded-full" />
      <p className="text-xl font-medium text-gray-900 mb-1">Page not found</p>
      <p className="text-sm text-gray-500 mb-8 max-w-xs leading-relaxed">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="inline-flex items-center gap-1.5 px-5 py-2 text-sm font-medium border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors"
      >
        ← Go home
      </button>
    </div>
  );
};

export default PageNotFound;
