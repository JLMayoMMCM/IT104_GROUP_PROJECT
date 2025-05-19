"use client";

import { useState } from "react";
import Link from "next/link";

export default function Bookmarks() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{title: string, content: string}>({title: "", content: ""});


  const bookmarkedJobs = [
    { id: 1, title: "Frontend Developer", company: "Web Solutions", date: "Bookmarked on May 15, 2023" },
    { id: 2, title: "UI/UX Designer", company: "Design Studio", date: "Bookmarked on May 12, 2023" },
    { id: 3, title: "Backend Engineer", company: "Tech Innovators", date: "Bookmarked on May 10, 2023" },
    { id: 4, title: "Product Manager", company: "Product Labs", date: "Bookmarked on May 8, 2023" },
    { id: 5, title: "DevOps Engineer", company: "Cloud Systems", date: "Bookmarked on May 5, 2023" }
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
        <Link href="/profile">
          <button className="px-3 py-1 rounded-md bg-gray-200 text-gray-700">VIEW PROFILE</button>
        </Link>
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
                <Link href="/dashboard" className="block p-3 hover:bg-gray-100 rounded-md text-gray-700 font-medium">
                  DASHBOARD
                </Link>
                <Link href="/notifications" className="block p-3 hover:bg-gray-100 rounded-md text-gray-700 font-medium">
                  NOTIFICATIONS
                </Link>
                <Link href="/bookmarks" className="block p-3 bg-gray-200 rounded-md text-gray-700 font-medium">
                  BOOKMARKS
                </Link>
                <Link href="/contacts" className="block p-3 hover:bg-gray-100 rounded-md text-gray-700 font-medium">
                  CONTACTS
                </Link>
              </div>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6 md:ml-0">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Bookmarked Jobs</h2>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {bookmarkedJobs.map((job, index) => (
                <div 
                  key={job.id} 
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${
                    index !== bookmarkedJobs.length - 1 ? 'border-b border-gray-200' : ''
                  }`}
                  onClick={() => openJobModal(job)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{job.title}</h3>
                      <p className="text-gray-600">{job.company}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-500 hover:text-blue-700">
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 3H9v18l3-3 3 3V3z" />
                        </svg>
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{job.date}</p>
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
