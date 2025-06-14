"use client";

import { useState } from "react";
import Link from "next/link";

export default function Notifications() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{title: string, content: string, date: string}>({
    title: "", 
    content: "", 
    date: ""
  });

  // Sample notifications data
  const notifications = [
    { 
      id: 1, 
      title: "New Job Match", 
      content: "We've found a new job matching your skills: Software Developer at TechCorp.", 
      date: "Today, 10:30 AM", 
      read: false 
    },
    { 
      id: 2, 
      title: "Application Status Update", 
      content: "Your application for UX Designer at DesignHub has moved to the interview stage.", 
      date: "Yesterday, 3:45 PM", 
      read: false 
    },
    { 
      id: 3, 
      title: "Profile Viewed", 
      content: "A recruiter from InnovateInc viewed your profile.", 
      date: "Jun 10, 2023", 
      read: true 
    },
    { 
      id: 4, 
      title: "Message Received", 
      content: "You have a new message from Sarah Johnson regarding the Product Manager position.", 
      date: "Jun 8, 2023", 
      read: true 
    },
    { 
      id: 5, 
      title: "Skill Assessment Available", 
      content: "A new JavaScript skill assessment is available. Showcase your abilities to potential employers.", 
      date: "Jun 5, 2023", 
      read: true 
    }
  ];

  const openNotificationModal = (notification: {title: string, content: string, date: string}) => {
    setModalContent({
      title: notification.title,
      content: notification.content,
      date: notification.date
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
                <Link href="/notifications" className="block p-3 bg-gray-200 rounded-md text-gray-700 font-medium">
                  NOTIFICATIONS
                </Link>
                <Link href="/bookmarks" className="block p-3 hover:bg-gray-100 rounded-md text-gray-700 font-medium">
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
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Notifications</h2>
              <button className="px-4 py-2 text-blue-500 hover:text-blue-700">
                Mark All as Read
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {notifications.map((notification, index) => (
                <div 
                  key={notification.id} 
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${
                    index !== notifications.length - 1 ? 'border-b border-gray-200' : ''
                  } ${!notification.read ? 'bg-blue-50' : ''}`}
                  onClick={() => openNotificationModal(notification)}
                >
                  <div className="flex justify-between items-start">
                    <div className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                      {notification.title}
                    </div>
                    <div className="text-sm text-gray-500">{notification.date}</div>
                  </div>
                  <p className={`mt-1 text-gray-600 ${!notification.read ? 'text-gray-800' : ''}`}>
                    {notification.content.length > 100 
                      ? `${notification.content.substring(0, 100)}...` 
                      : notification.content
                    }
                  </p>
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
            <h2 className="text-xl font-bold mb-2">{modalContent.title}</h2>
            <p className="text-gray-500 text-sm mb-4">{modalContent.date}</p>
            <p className="text-gray-700 mb-6">{modalContent.content}</p>
            <div className="flex justify-end">
              <button 
                className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
                onClick={() => setModalOpen(false)}
              >
                Close
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

