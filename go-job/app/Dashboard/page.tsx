"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Job {
  job_id: number;
  job_name: string;
  job_description: string;
  company_name: string;
  job_salary?: string;
  job_type_name: string;
  categories: string[];
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{title: string, content: string}>({title: "", content: ""});
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [availableJobs, setAvailableJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/jobs');
        const result = await response.json();
        
        if (result.success) {
          setFeaturedJobs(result.data.featuredJobs);
          setAvailableJobs(result.data.availableJobs);
        } else {
          setError('Failed to load jobs');
        }
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Error loading jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const openJobModal = (job: Job) => {
    setModalContent({
      title: job.job_name,
      content: `${job.job_description || 'No description available.'} 
      
Company: ${job.company_name}
Type: ${job.job_type_name}
${job.job_salary ? `Salary: $${job.job_salary}` : ''}
Categories: ${job.categories.filter(cat => cat).join(', ')}`
    });
    setModalOpen(true);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Mobile sidebar toggle */}
      <div className={`md:hidden p-4 flex justify-between items-center ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`p-2 rounded-md ${darkMode ? 'text-gray-300' : 'text-gray-700'} focus:outline-none`}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>GO-JOB</div>
        <Link href="/profile">
          <button className={`px-3 py-1 rounded-md ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>VIEW PROFILE</button>
        </Link>
      </div>
      
      {/* Sidebar */}
      <div className="flex">
        <div className={`
          ${darkMode ? 'bg-gray-800' : 'bg-white'} w-64 fixed h-full shadow
          md:relative md:translate-x-0
          transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          transition-transform duration-300 ease-in-out z-30
        `}>
          <div className="p-6 h-full flex flex-col">
            <div className="hidden md:flex justify-center mb-6">
              <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>GO-JOB</div>
            </div>
            
            <nav className="mt-6 flex-1">
              <div className="space-y-4">
                <Link href="/Dashboard" className={`block p-3 ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} rounded-md font-medium`}>
                  DASHBOARD
                </Link>
                <Link href="/Notifications" className={`block p-3 ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'} rounded-md font-medium`}>
                  NOTIFICATIONS
                </Link>
                <Link href="/Bookmarks" className={`block p-3 ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'} rounded-md font-medium`}>
                  BOOKMARKS
                </Link>
                <Link href="/Contacts" className={`block p-3 ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'} rounded-md font-medium`}>
                  CONTACTS
                </Link>
              </div>
            </nav>

            {/* Dark Mode Toggle - Bottom of Sidebar */}
            <div className="mt-auto mb-4">
              <button
                onClick={toggleDarkMode}
                className={`w-full p-3 rounded-md transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  {darkMode ? (
                    <>
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                      </svg>
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                      <span>Dark Mode</span>
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6 md:ml-0">
          <div className="hidden md:flex justify-between mb-6">
            <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>GO-JOB</div>
            <Link href="/profile">
              <button className={`px-4 py-2 rounded-md ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>VIEW PROFILE</button>
            </Link>
          </div>

          {/* Featured Jobs */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Featured Jobs</h2>
              <button className={`px-3 py-1 rounded-md ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} text-sm`}>
                VIEW ALL FEATURED
              </button>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {featuredJobs.map(job => (
                  <div 
                    key={job.job_id} 
                    className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-4 rounded-md shadow cursor-pointer hover:shadow-md transition-shadow min-h-[200px]`}
                    onClick={() => openJobModal(job)}
                  >
                    <h3 className="font-bold text-lg mb-2">{job.job_name}</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>{job.company_name}</p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-3 line-clamp-2`}>
                      {job.job_description || 'No description available'}
                    </p>
                    <div className="mb-2">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {job.job_type_name}
                      </span>
                    </div>
                    {job.job_salary && (
                      <p className="text-sm text-green-600 font-bold mb-2">${job.job_salary}</p>
                    )}
                    <div className="flex flex-wrap gap-1">
                      {job.categories.filter(cat => cat).slice(0, 2).map((category, index) => (
                        <span 
                          key={index}
                          className={`inline-block ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} text-xs px-2 py-1 rounded`}
                        >
                          {category}
                        </span>
                      ))}
                      {job.categories.filter(cat => cat).length > 2 && (
                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>+{job.categories.filter(cat => cat).length - 2} more</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Available Jobs */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Available Jobs</h2>
              <button className={`px-3 py-1 rounded-md ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} text-sm`}>
                VIEW AVAILABLE JOBS
              </button>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {availableJobs.map(job => (
                  <div 
                    key={job.job_id} 
                    className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-4 rounded-md shadow cursor-pointer hover:shadow-md transition-shadow min-h-[200px]`}
                    onClick={() => openJobModal(job)}
                  >
                    <h3 className="font-bold text-lg mb-2">{job.job_name}</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>{job.company_name}</p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-3 line-clamp-2`}>
                      {job.job_description || 'No description available'}
                    </p>
                    <div className="mb-2">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {job.job_type_name}
                      </span>
                    </div>
                    {job.job_salary && (
                      <p className="text-sm text-green-600 font-bold mb-2">${job.job_salary}</p>
                    )}
                    <div className="flex flex-wrap gap-1">
                      {job.categories.filter(cat => cat).slice(0, 2).map((category, index) => (
                        <span 
                          key={index}
                          className={`inline-block ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} text-xs px-2 py-1 rounded`}
                        >
                          {category}
                        </span>
                      ))}
                      {job.categories.filter(cat => cat).length > 2 && (
                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>+{job.categories.filter(cat => cat).length - 2} more</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal/Popup */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setModalOpen(false)}></div>
          <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg p-8 max-w-lg w-full z-10 relative mx-4`}>
            <button 
              className={`absolute top-4 right-4 ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setModalOpen(false)}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-xl font-bold mb-4">{modalContent.title}</h2>
            <div className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-6 whitespace-pre-line`}>{modalContent.content}</div>
            <div className="flex justify-end space-x-4">
              <button 
                className={`px-4 py-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'} rounded-md`}
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
