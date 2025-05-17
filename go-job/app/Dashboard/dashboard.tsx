"use client";

import { useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sample job data
  const featuredJobs = [
    { id: 1, title: "Software Developer", company: "Tech Inc." },
    { id: 2, title: "UX Designer", company: "Design Co." },
    { id: 3, title: "Data Analyst", company: "Data Corp." },
    { id: 4, title: "Project Manager", company: "Manage Ltd." },
    { id: 5, title: "Marketing Specialist", company: "Market Plus" }
  ];

  const availableJobs = [
    { id: 6, title: "Web Developer", company: "Web Solutions" },
    { id: 7, title: "Mobile App Developer", company: "App Makers" },
    { id: 8, title: "System Administrator", company: "IT Services" },
    { id: 9, title: "Content Writer", company: "Content Hub" },
    { id: 10, title: "Sales Representative", company: "Sales Pro" }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top navbar - always visible */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md text-gray-700 focus:outline-none"
            aria-label="Toggle sidebar"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="text-xl font-bold ml-4">GO-JOB</div>
        </div>
        <Link href="/profile">
          <button className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300">
            VIEW PROFILE
          </button>
        </Link>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className={`
          fixed top-0 left-0 z-40 h-screen pt-20 transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          w-64 bg-white shadow-lg
        `}>
          <div className="p-6">
            <nav className="space-y-4">
              <Link href="/Dashboard" className="block p-3 bg-gray-200 rounded-md text-gray-700 font-medium">
                DASHBOARD
              </Link>
              <Link href="/Notifications" className="block p-3 hover:bg-gray-100 rounded-md text-gray-700 font-medium">
                NOTIFICATIONS
              </Link>
              <Link href="/Bookmarks" className="block p-3 hover:bg-gray-100 rounded-md text-gray-700 font-medium">
                BOOKMARKS
              </Link>
              <Link href="/Contacts" className="block p-3 hover:bg-gray-100 rounded-md text-gray-700 font-medium">
                CONTACTS
              </Link>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6 ml-0">
          {/* Featured Jobs */}
          <div className="mb-8 mt-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Featured Jobs</h2>
              <button className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 text-sm">
                VIEW ALL FEATURED
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {featuredJobs.map(job => (
                <div 
                  key={job.id} 
                  className="bg-white p-4 rounded-md shadow cursor-pointer hover:shadow-md transition-shadow"
                >
                  <h3 className="font-medium">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.company}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Available Jobs */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Available Jobs</h2>
              <button className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 text-sm">
                VIEW AVAILABLE JOBS
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {availableJobs.map(job => (
                <div 
                  key={job.id} 
                  className="bg-white p-4 rounded-md shadow cursor-pointer hover:shadow-md transition-shadow"
                >
                  <h3 className="font-medium">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.company}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
