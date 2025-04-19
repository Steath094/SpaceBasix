import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userStatusAtom } from '../store/userStatusAtom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { profileAtom } from '../store/profileAtom';

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [userStatus, setUserStatus] = useRecoilState(userStatusAtom);
  const setProfile = useSetRecoilState(profileAtom);
  const authStatus = userStatus.islogin;

  const navItems = [
    {
      name: 'Dashboard',
      slug: userStatus.role === 'admin' ? '/admin-dashboard' : '/student-dashboard',
      active: authStatus,
    },
    {
      name: 'Rooms',
      slug: '/rooms',
      active: authStatus && userStatus.role === 'admin',
    },
    {
      name: 'Students',
      slug: '/students',
      active: authStatus && userStatus.role === 'admin',
    },
    {
      name: 'Complaints',
      slug: '/complaints',
      active: authStatus && userStatus.role === 'admin',
    },
  ];

  const handleLogout = () => {
    const user = { islogin: false, role: null };
    setUserStatus(user);
    setProfile({});
    localStorage.setItem('userStatus', JSON.stringify(user));
    localStorage.setItem('profile', JSON.stringify({}));
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between relative z-10">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 text-[#2489D3] font-bold text-2xl">
        <img src="/Images/logo.png" alt="logo" className="w-10 h-10" />
        <span>SpaceBasix</span>
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 items-center ml-auto">
        {authStatus &&
          navItems.map(
            (item) =>
              item.active && (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="text-black hover:text-[#2489D3] font-medium"
                  >
                    {item.name}
                  </button>
                </li>
              )
          )}
        {authStatus && (
          <li>
            <button
              onClick={handleLogout}
              className="bg-[#2489D3] text-white rounded-full px-6 py-2 hover:bg-[#1d6ea9]"
            >
              Logout
            </button>
          </li>
        )}
        {!authStatus && (
          <>
            <li>
              <button
                onClick={() => navigate('/login')}
                className="border-2 border-[#2489D3] text-[#2489D3] rounded-full px-6 py-2 hover:bg-blue-50"
              >
                Login
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/signup')}
                className="bg-[#2489D3] text-white rounded-full px-6 py-2 hover:bg-[#1d6ea9]"
              >
                Sign Up
              </button>
            </li>
          </>
        )}
      </ul>

      {/* Hamburger Icon */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden text-3xl text-[#2489D3]"
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[100%] left-0 w-full bg-white shadow-md md:hidden">
          <ul className="flex flex-col items-center gap-4 py-4">
            {authStatus &&
              navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => {
                          navigate(item.slug);
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-black hover:text-[#2489D3] font-medium"
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
            {authStatus && (
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-[#2489D3] text-white rounded-full px-6 py-2 hover:bg-[#1d6ea9]"
                >
                  Logout
                </button>
              </li>
            )}
            {!authStatus && (
              <>
                <li>
                  <button
                    onClick={() => {
                      navigate('/login');
                      setIsMobileMenuOpen(false);
                    }}
                    className="border-2 border-[#2489D3] text-[#2489D3] rounded-full px-6 py-2 hover:bg-blue-50"
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      navigate('/signup');
                      setIsMobileMenuOpen(false);
                    }}
                    className="bg-[#2489D3] text-white rounded-full px-6 py-2 hover:bg-[#1d6ea9]"
                  >
                    Sign Up
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
