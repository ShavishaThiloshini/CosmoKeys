import React from 'react';
import { NavLink } from 'react-router-dom';
import { Music, Piano, BookOpen, Mic2 } from 'lucide-react';

const Navbar = () => {
  const navItems = [
    { name: 'Piano', path: '/piano', icon: <Piano size={18} /> },
    { name: 'Chords', path: '/chords', icon: <BookOpen size={18} /> },
    { name: 'Harmony', path: '/harmony', icon: <Mic2 size={18} /> },
  ];

  return (
    <nav className="w-full border-b border-white/10 bg-space-surface/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Music className="text-cosmic-purple" size={24} />
            <span className="font-bold text-xl tracking-wider text-star-white">
              COSMO KEYS
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex space-x-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive 
                        ? 'bg-cosmic-purple/20 text-cosmic-purple shadow-[0_0_10px_rgba(124,58,237,0.2)] border border-cosmic-purple/30'
                        : 'text-moon-gray hover:bg-white/5 hover:text-star-white'
                    }`
                  }
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Navigation (simplified for now, visible only on small screens below the header) */}
        <div className="md:hidden flex justify-center pb-3 pt-1 space-x-1 overflow-x-auto">
           {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-cosmic-purple/20 text-cosmic-purple border border-cosmic-purple/30'
                      : 'text-moon-gray hover:bg-white/5 hover:text-star-white'
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
