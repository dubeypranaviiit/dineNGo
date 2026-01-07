'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  FiUsers,
  FiCalendar,
  FiPlusCircle,
  FiEdit,
  FiSearch,
  FiMenu,
  FiX,
  FiLogOut,
} from 'react-icons/fi';
import { LucideSofa } from 'lucide-react';

interface MenuItem {
  title: string;
  icon: React.ReactNode; 
  submenu?: string[];
  link?: string;
}

const menuItems: MenuItem[] = [
  {
    title: 'Staff Management',
    icon: <FiUsers className="w-5 h-5" />,
    submenu: ['View Staff List', 'Add New Staff'],
  },
  {
    title: 'Booking Approval',
    icon: <FiCalendar className="w-5 h-5" />,
    submenu: [
      'Pending Reservations',
      'Approved Bookings',
      'Reservation Management',
      'Quick Approval Interface',
    ],
  },
  { title: 'Add Item', icon: <FiPlusCircle className="w-5 h-5" />, link: '/admin/add-item' },
  { title: 'Update Item', icon: <FiEdit className="w-5 h-5" />, link: '/admin/update-item' },
  { title: 'Table Management', icon: <LucideSofa className="w-5 h-5" />, link: '/admin/add-table' },
];

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('');
  const [expandedSubmenu, setExpandedSubmenu] = useState('');

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleSubmenu = (title: string) => {
    setExpandedSubmenu(expandedSubmenu === title ? '' : title);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white"
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
      </button>
      <aside
        className={`fixed top-0 left-0 h-screen bg-gray-900 text-white transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64 shadow-xl z-40 lg:translate-x-0`}
      >
        <div className="p-4 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-md hover:bg-gray-800"
              aria-label="Close Sidebar"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <div key={item.title} className="space-y-1">
                {item.link ? (
                  <Link href={item.link} className="w-full">
                    <div
                      className={`cursor-pointer w-full flex items-center justify-between p-3 rounded-md transition-colors
                        ${activeMenu === item.title ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
                      onClick={() => setActiveMenu(item.title)}
                    >
                      <div className="flex items-center space-x-3">
                        {item.icon}
                        <span>{item.title}</span>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      setActiveMenu(item.title);
                      if (item.submenu && item.submenu.length > 0) toggleSubmenu(item.title);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-md transition-colors
                        ${activeMenu === item.title ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
                    aria-expanded={expandedSubmenu === item.title}
                  >
                    <div className="flex items-center space-x-3">
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                    {item.submenu && item.submenu.length > 0 && (
                      <span
                        className={`transform transition-transform duration-200 ${
                          expandedSubmenu === item.title ? 'rotate-180' : ''
                        }`}
                      >
                        ▼
                      </span>
                    )}
                  </button>
                )}
                {item.submenu && item.submenu.length > 0 && expandedSubmenu === item.title && (
                  <div className="pl-10 space-y-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        href={`/admin/${subItem.toLowerCase().replace(/ /g, '-')}`}
                        key={subItem}
                        className="block cursor-pointer w-full text-left p-2 rounded-md hover:bg-gray-800 transition-colors"
                      >
                        {subItem}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-800">
            <button className="flex items-center space-x-2 text-red-400 hover:text-red-500 transition-colors">
              <FiLogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
