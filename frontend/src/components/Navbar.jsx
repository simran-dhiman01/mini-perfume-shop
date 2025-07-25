import { useState } from 'react';
import { NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const location = useLocation();

  const isCategoryActive = (name) => {
    return location.pathname === "/products" && category === name;
  };

  const getCategoryClass = (name) =>
    isCategoryActive(name)
      ? 'text-cyan-300 font-semibold text-2xl transition-colors duration-300 cursor-pointer'
      : 'text-gray-300 hover:text-white text-xl transition-colors duration-300 cursor-pointer';

  return (
    <nav className='font-comic bg-gray-900 shadow-md sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex-shrink-0'>
            <h1 className='font-bold text-3xl bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent animate-gradient-x hover:from-blue-300 hover:via-cyan-200 hover:to-blue-300 transition-all duration-300'>
              Scentique
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className='hidden md:block'>
            <ul className='font-bold flex items-center space-x-8'>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-cyan-300 font-semibold text-2xl transition-colors duration-300'
                      : 'text-gray-300 hover:text-white text-xl transition-colors duration-300'
                  }>
                  Home
                </NavLink>
              </li>
              {['sale', 'men', 'women', 'unisex'].map((cat) => (
                <li
                  key={cat}
                  onClick={() => navigate(`/products?category=${cat}`)}
                  className={getCategoryClass(cat)}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </li>
              ))}
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-cyan-300 font-semibold text-2xl transition-colors duration-300'
                      : 'text-gray-300 hover:text-white text-xl transition-colors duration-300'
                  }>
                  About Us
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='text-gray-300 hover:text-white focus:outline-none'>
              <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className='md:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 rounded-lg shadow-lg mt-2'>
              <div>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? 'block text-cyan-300 font-semibold text-2xl py-2 px-3 transition-colors duration-300'
                      : 'block text-gray-300 hover:text-white text-xl py-2 px-3 transition-colors duration-300'
                  }>
                  Home
                </NavLink>
              </div>
              {['sale', 'men', 'women', 'unisex'].map((cat) => (
                <div
                  key={cat}
                  onClick={() => {
                    setIsOpen(false);
                    navigate(`/products?category=${cat}`);
                  }}
                  className={`${getCategoryClass(cat)} block py-2 px-3`}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </div>
              ))}
              <div>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? 'block text-cyan-300 font-semibold text-2xl py-2 px-3 transition-colors duration-300'
                      : 'block text-gray-300 hover:text-white text-xl py-2 px-3 transition-colors duration-300'
                  }>
                  About Us
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
