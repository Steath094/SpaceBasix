import React from 'react';
import { FaFacebookF, FaGithub, FaTwitter, FaDribbble } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className=" text-[#2489D3] py-10 px-6 h-fit">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        
        {/* Logo */}
        <a className='flex text-center justify-center items-center gap-4 text-[#2489D3] font-sans font-bold text-xl' href="/">
            <div className='w-12 h-12'><img className='w-full h-full' src="Images/logo.png" alt="logo" /></div><span className='hover:border-b-2'>SpaceBasix</span></a>

        {/* Links */}
        <div className="flex gap-6 text-sm">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Security</a>
          <a href="#">Sitemap</a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-lg">
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaGithub /></a>
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaDribbble /></a>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#2489D3]">
        <div className="mb-2 md:mb-0">© {new Date().getFullYear()} Daisy. All rights reserved.</div>
        <div>
          <select className="bg-transparent text-[#2489D3] border-none outline-none">
            <option>English</option>
            {/* Add more languages if needed */}
          </select>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
