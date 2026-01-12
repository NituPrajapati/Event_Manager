import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">🚫 Access Denied</h1>
        <p className="text-gray-700 mb-6">You do not have permission to view this page.</p>
        <Link
            to="/"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
            Go Home
        </Link>
    </div>
  )
}

export default Unauthorized