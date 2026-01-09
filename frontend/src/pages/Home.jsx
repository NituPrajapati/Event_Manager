import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-4">

        {/* Register Box */}
        <Link
          to="/register"
          className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-bold mb-4">Register</h2>
          <p className="text-gray-600">
            Create a new account
          </p>
        </Link>

        {/* Login Box */}
        <Link
          to="/login"
          className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <p className="text-gray-600">
            Access your account
          </p>
        </Link>
      </div>
      </div>
     )
    }
export default Home