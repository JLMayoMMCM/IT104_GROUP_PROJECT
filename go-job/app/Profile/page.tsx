"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
  // Sample user data
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    birthday: "1990-01-15",
    address: "123 Main St, City, Country",
    contact: "+1 (555) 123-4567"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSave = () => {
    // Here you would typically save to a database
    setEditMode(false);
    // Show success message or handle errors
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top navbar */}
      <div className="p-4 flex justify-between items-center bg-white shadow">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md text-gray-700 focus:outline-none"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="text-xl font-bold ml-4">GO-JOB</div>
        </div>
        <button 
          onClick={() => setEditMode(!editMode)} 
          className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          {editMode ? "CANCEL" : "EDIT PROFILE"}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`
          bg-white w-64 fixed h-full shadow
          md:relative md:translate-x-0
          transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          transition-transform duration-300 ease-in-out z-30
        `}>
          <div className="p-6">
            <nav className="mt-6">
              <div className="space-y-4">
                <Link href="/dashboard" className="block p-3 hover:bg-gray-100 rounded-md text-gray-700 font-medium flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  DASHBOARD
                </Link>
                <Link href="/notifications" className="block p-3 hover:bg-gray-100 rounded-md text-gray-700 font-medium flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  NOTIFICATIONS
                </Link>
                <Link href="/bookmarks" className="block p-3 hover:bg-gray-100 rounded-md text-gray-700 font-medium flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  BOOKMARKS
                </Link>
                <Link href="/contacts" className="block p-3 hover:bg-gray-100 rounded-md text-gray-700 font-medium flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  CONTACTS
                </Link>
              </div>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6 md:ml-0">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-4">
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {/* Placeholder for profile image */}
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                {editMode && (
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md hover:bg-gray-100">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                )}
              </div>
              <h1 className="text-2xl font-bold">{userData.name}</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">EMAIL</label>
                {editMode ? (
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="p-3 bg-gray-100 rounded-md">{userData.email}</div>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">BIRTHDAY</label>
                {editMode ? (
                  <input
                    type="date"
                    name="birthday"
                    value={userData.birthday}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="p-3 bg-gray-100 rounded-md">{new Date(userData.birthday).toLocaleDateString()}</div>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">CONTACT</label>
                {editMode ? (
                  <input
                    type="tel"
                    name="contact"
                    value={userData.contact}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="p-3 bg-gray-100 rounded-md">{userData.contact}</div>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">ADDRESS</label>
                {editMode ? (
                  <input
                    type="text"
                    name="address"
                    value={userData.address}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="p-3 bg-gray-100 rounded-md">{userData.address}</div>
                )}
              </div>
            </div>

            {editMode && (
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for sidebar */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
