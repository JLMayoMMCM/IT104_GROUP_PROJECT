"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{title: string, content: string}>({title: "", content: ""});

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

  const openJobModal = (job: {id: number, title: string, company: string}) => {
    setModalContent({
      title: job.title,
      content: `${job.title} position at ${job.company}. This is a great opportunity to work with a leading company in the industry.`
    });
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden p-4 flex justify-between items-center bg-white shadow">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md text-gray-700 focus:outline-none"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="text-xl font-bold">GO-JOB</div>
        <Link href="/profile">
          <button className="px-3 py-1 rounded-md bg-gray-200 text-gray-700">VIEW PROFILE</button>
        </Link>
      </div>
      
      {/* Sidebar */}
      <div className="flex">
        <div className={`
          bg-white w-64 fixed h-full shadow
          md:relative md:translate-x-0
          transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          transition-transform duration-300 ease-in-out z-30
        `}>
          <div className="p-6">
            <div className="hidden md:flex justify-center mb-6">
              <div className="text-xl font-bold">GO-JOB</div>
            </div>
            
            <nav className="mt-6">
              <div className="space-y-4">
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
              </div>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6 md:ml-0">
          <div className="hidden md:flex justify-between mb-6">
            <div className="text-xl font-bold">GO-JOB</div>
            <Link href="/profile">
              <button className="px-4 py-2 rounded-md bg-gray-200 text-gray-700">VIEW PROFILE</button>
            </Link>
          </div>

          {/* Featured Jobs */}
          <div className="mb-8">
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
                  onClick={() => openJobModal(job)}
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
                  onClick={() => openJobModal(job)}
                >
                  <h3 className="font-medium">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.company}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal/Popup */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setModalOpen(false)}></div>
          <div className="bg-white rounded-lg p-8 max-w-md w-full z-10 relative">
            <button 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setModalOpen(false)}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-xl font-bold mb-4">{modalContent.title}</h2>
            <p className="text-gray-700 mb-6">{modalContent.content}</p>
            <div className="flex justify-end space-x-4">
              <button 
                className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-600">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
