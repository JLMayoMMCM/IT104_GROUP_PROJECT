"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Notifications() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{title: string, content: string}>({title: "", content: ""});

  // Sample job data
  const notifications = [
    { id: 1, title: "New Job Alert", content: "A new job matching your profile has been posted." },
    { id: 2, title: "Application Update", content: "Your application for the Software Developer position has been reviewed." },
    { id: 3, title: "Interview Scheduled", content: "You have an interview scheduled for the Data Analyst position." },
    { id: 4, title: "Profile Update", content: "Your profile has been successfully updated." },
    { id: 5, title: "Job Recommendation", content: "We recommend you check out the UX Designer position at Design Co." }
  ];
    const openNotificationModal = (notification: {id: number, title: string, content: string}) => {
        setModalContent({
        title: notification.title,
        content: notification.content
        });
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
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
    
        {/* Sidebar - hidden on mobile unless toggled */}
        <div className={`bg-white w-64 fixed h-full shadow md:relative md:translate-x-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
            <div className="p-6">
            <nav className="space-y-4">
                <Link href="/Dashboard" className="block p-3 hover:bg-gray-100 rounded-md text-gray-700 font-medium">
                DASHBOARD
                </Link>
                <Link href="/Notifications" className="block p-3 bg-gray-200 rounded-md text-gray-700 font-medium">
                NOTIFICATIONS
                </Link>
                <Link href="/Messages" className="block p-3 hover:bg-gray-100 rounded-md text-gray-700 font-medium">
                MESSAGES
                </Link>
                <Link href="/SavedJobs" className="block p-3 hover:bg-gray-100 rounded-md text-gray-700 font-medium">
                SAVED JOBS
                </Link>
            </nav>
            </div>
        </div>
    
        {/* Main content */}
        <div className={`flex-grow p-6 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-[256px]' : 'ml-[64px]'}`}>
            <h1 className="text-xl font-bold mb-4">Notifications</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {notifications.map(notification => (
                <div 
                key={notification.id} 
                className="bg-white p-4 rounded-md shadow cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => openNotificationModal(notification)}
                >
                <h3 className="font-medium">{notification.title}</h3>
                <p className="text-gray-600">{notification.content}</p>
                </div>
            ))}
            </div>
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-md shadow-lg">
                    <h2 className="text-xl font-bold mb-4">{modalContent.title}</h2>
                    <p>{modalContent.content}</p>
                    <button 
                    onClick={closeModal} 
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                    Close
                    </button>
                </div>
                </div>
            )}
        </div>
    </div>
    );
}
//

