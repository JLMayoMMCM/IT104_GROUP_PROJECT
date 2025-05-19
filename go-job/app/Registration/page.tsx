"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Registration() {
  const router = useRouter();
  const [userType, setUserType] = useState<'employee' | 'employer'>('employee');
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    password: "",
    confirmPassword: "",
    streetAddress: "",
    barangay: "",
    city: "",
    province: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const validateStep1 = () => {
    if (!userData.firstName || !userData.lastName || !userData.email) {
      setErrorMessage("Please fill all required fields.");
      return false;
    }
    if (userData.password !== userData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return false;
    }
    if (userData.password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const validateStep2 = () => {
    if (!userData.streetAddress || !userData.barangay || !userData.city || !userData.province) {
      setErrorMessage("Please fill all required address fields.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      sendVerificationCode();
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
    setErrorMessage("");
  };

  /* CODE GENERATION */
  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendVerificationCode = async () => {
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      const code = generateVerificationCode();
      setVerificationCode(code);
      
      console.log(`Verification code for ${userData.email}: ${code}`);

      setTimeout(() => {
        setIsCodeSent(true);
        setStep(3);
        setIsLoading(false);
      }, 1500);
      
    } catch (error) {
      console.error("Error sending verification:", error);
      setErrorMessage("Failed to send verification code. Please try again.");
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (enteredCode !== verificationCode) {
      setErrorMessage("Invalid verification code. Please try again.");
      return;
    }
    
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      setTimeout(() => {
        router.push('/Login?registered=true');
      }, 1500);
      
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-gray-900 mb-2">GO-JOB</h1>
          <h2 className="text-center text-2xl font-bold text-gray-800">Sign Up</h2>
        </div>

        {/* User Type Selection */}
        <div className="flex rounded-md shadow-sm mb-4">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium w-1/2 rounded-l-md ${
              userType === 'employee' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setUserType('employee')}
          >
            Employee
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium w-1/2 rounded-r-md ${
              userType === 'employer' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setUserType('employer')}
          >
            Employer
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-6">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-2 ${
            step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300'
          }`}>1</div>
          <div className={`h-1 w-12 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-2 ${
            step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300'
          }`}>2</div>
          <div className={`h-1 w-12 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ml-2 ${
            step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-300'
          }`}>3</div>
        </div>

        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        )}

        {/* Step 1: Account Details */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={userData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={userData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="middleName" className="block text-sm font-medium text-gray-700">Middle Name</label>
              <input
                type="text"
                id="middleName"
                name="middleName"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={userData.middleName}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={userData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password *</label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={userData.password}
                onChange={handleChange}
                required
              />
              <p className="mt-1 text-xs text-gray-500">Password must be at least 8 characters long</p>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={userData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Address Information */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">Street Address *</label>
              <input
                type="text"
                id="streetAddress"
                name="streetAddress"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={userData.streetAddress}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="barangay" className="block text-sm font-medium text-gray-700">Barangay *</label>
              <input
                type="text"
                id="barangay"
                name="barangay"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={userData.barangay}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City *</label>
              <input
                type="text"
                id="city"
                name="city"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={userData.city}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="province" className="block text-sm font-medium text-gray-700">Province *</label>
              <input
                type="text"
                id="province"
                name="province"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={userData.province}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePrevStep}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                disabled={isLoading}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? 'Sending...' : 'Send Verification Code'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Verification */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3 text-sm text-blue-700">
                  <p>
                    We've sent a verification code to <strong>{userData.email}</strong>. 
                    <br/><br/>
                    <strong>For development purposes:</strong> Check the console log to see the code.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">Verification Code</label>
              <input
                type="text"
                id="verificationCode"
                name="verificationCode"
                placeholder="Enter the 6-digit code"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={enteredCode}
                onChange={(e) => setEnteredCode(e.target.value)}
                required
              />
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePrevStep}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Back
              </button>
              <div>
                <button
                  type="button"
                  onClick={sendVerificationCode}
                  disabled={isLoading}
                  className="inline-flex justify-center px-4 py-2 mr-2 text-sm font-medium text-blue-700 bg-blue-100 border border-blue-300 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isLoading ? 'Sending...' : 'Resend Code'}
                </button>
                <button
                  type="button"
                  onClick={handleRegister}
                  disabled={isLoading || enteredCode.length < 5}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isLoading ? 'Processing...' : 'Complete Registration'}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="text-center pt-4 border-t border-gray-200">
          <span className="text-sm text-gray-600">Already have an account? </span>
          <Link href="/Login" className="font-medium text-blue-600 hover:text-blue-500">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
