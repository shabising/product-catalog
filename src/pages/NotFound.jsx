import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: '#FAF7F2' }}>
      <p className="text-6xl font-bold text-[#DB7F8E] mb-4">404</p>
      <p className="text-lg font-medium text-gray-700 mb-2">Page Not Found</p>
      <p className="text-sm text-gray-400 mb-8">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="px-5 py-2 rounded-lg text-sm text-white font-medium"
        style={{ backgroundColor: '#DB7F8E' }}
      >
        ← Back to Home
      </Link>
    </div>
  );
}