"use client";

import { useState } from "react";
import Link from "next/link";

export default function Contacts() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{name: string, title: string, email: string, phone: string}>({
    name: "", 
    title: "", 
    email: "", 
    phone: ""
  });

  const contacts = [
    { id: 1, name: "John Smith", title: "Recruiter", company: "TechHire Inc.", email: "john@techhire.com", phone: "555-123-4567" },
    { id: 2, name: "Sarah Johnson", title: "HR Manager", company: "Global Solutions", email: "sarah@globalsolutions.com", phone: "555-234-5678" },
    { id: 3, name: "Michael Brown", title: "Talent Acquisition", company: "Innovate Corp", email: "michael@innovate.com", phone: "555-345-6789" },
    { id: 4, name: "Emily Davis", title: "Hiring Manager", company: "Future Tech", email: "emily@futuretech.com", phone: "555-456-7890" },
    { id: 5, name: "David Wilson", title: "CEO", company: "Startup Ventures", email: "david@startup.com", phone: "555-567-8901" }
  ];

  const openContactModal = (contact: {name: string, title: string, company: string, email: string, phone: string}) => {
    setModalContent({
      name: contact.name,
      title: `${contact.title} at ${contact.company}`,
      email: contact.email,
      phone: contact.phone
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
                <Link href="/bookmarks" className="block p-3 hover:bg-gray-100 rounded-md text-gray-700 font-medium">
                  BOOKMARKS
                </Link>
                <Link href="/contacts" className="block p-3 bg-gray-200 rounded-md text-gray-700 font-medium">
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
              <h2 className="text-2xl font-semibold">Professional Contacts</h2>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                + Add Contact
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200 flex font-medium">
                <div className="w-1/3">Name</div>
                <div className="w-1/3">Title / Company</div>
                <div className="w-1/3">Contact</div>
              </div>
              
              {contacts.map((contact, index) => (
                <div 
                  key={contact.id} 
                  className={`p-4 hover:bg-gray-50 cursor-pointer flex ${
                    index !== contacts.length - 1 ? 'border-b border-gray-200' : ''
                  }`}
                  onClick={() => openContactModal(contact)}
                >
                  <div className="w-1/3">{contact.name}</div>
                  <div className="w-1/3">
                    <div>{contact.title}</div>
                    <div className="text-sm text-gray-500">{contact.company}</div>
                  </div>
                  <div className="w-1/3">
                    <div className="text-sm">{contact.email}</div>
                    <div className="text-sm text-gray-500">{contact.phone}</div>
                  </div>
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
            <h2 className="text-xl font-bold mb-2">{modalContent.name}</h2>
            <p className="text-gray-600 mb-4">{modalContent.title}</p>
            
            <div className="mb-2">
              <div className="text-gray-500 text-sm">Email</div>
              <div>{modalContent.email}</div>
            </div>
            
            <div className="mb-4">
              <div className="text-gray-500 text-sm">Phone</div>
              <div>{modalContent.phone}</div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button 
                className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-600">
                Message
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
