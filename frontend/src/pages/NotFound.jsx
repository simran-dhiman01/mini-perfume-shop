import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center px-4'>
      <h1 className='text-4xl md:text-6xl font-bold font-poppins text-gray-800 mb-4'>
        404 - Page Not Found
      </h1>
      <p className='text-lg md:text-xl text-gray-600 mb-8'>
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <Link to='/' className='bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300'>
        Go Back to Home Page
      </Link>
    </div>
  );
};

export default NotFound;
