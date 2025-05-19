"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const [userType, setUserType] = useState<'employee' | 'employer'>('employee');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Check for error query params (from SSO redirects)
  useEffect(() => {
    const url = new URL(window.location.href);
    const error = url.searchParams.get('error');
    const registered = url.searchParams.get('registered');
    
    if (error) {
      const errorMessages: {[key: string]: string} = {
        'configuration_error': 'OAuth configuration error. Please try again later.',
        'oauth_error': 'Error during Google sign-in. Please try again.',
        'invalid_state': 'Invalid OAuth state. Please try again.',
        'no_code': 'No authorization code received from Google.',
        'token_exchange': 'Error exchanging token with Google.',
        'user_info': 'Error fetching user information from Google.',
        'user_creation': 'Error creating user account.',
        'server_error': 'Server error during authentication. Please try again later.'
      };
      
      setErrorMessage(errorMessages[error] || 'Authentication error. Please try again.');
      
      // Clean up the URL
      window.history.replaceState({}, document.title, '/Login');
    }
    
    if (registered === 'true') {
      setSuccessMessage('Account successfully created! Please log in.');
      window.history.replaceState({}, document.title, '/Login');
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role: userType }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Redirect to dashboard on successful login
        router.push('/Dashboard');
      } else {
        setErrorMessage(data.error || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: forgotEmail }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccessMessage("Password reset instructions sent to your email.");
        setTimeout(() => {
          setShowForgotPassword(false);
          setForgotEmail("");
        }, 3000);
      } else {
        setErrorMessage(data.error || "Failed to process request. Please try again.");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    window.location.href = '/api/auth/google';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-gray-900 mb-2">GO-JOB</h1>
          <h2 className="text-center text-2xl font-bold text-gray-800">Login</h2>
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

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}
          
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{successMessage}</span>
            </div>
          )}
          
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <button
                type="button"
                className="font-medium text-blue-600 hover:text-blue-500"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot password?
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isLoading ? 'Loading...' : 'Login'}
            </button>
          </div>
        </form>

        {/* Google Sign-In Button */}
        <div>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
              </svg>
            </span>
            {isLoading ? 'Loading...' : 'Sign in with Google'}
          </button>
        </div>

        <div className="text-center">
          <span className="text-sm text-gray-600">New to GO-JOB? </span>
          <Link href="/Registration" className="font-medium text-blue-600 hover:text-blue-500">
            Sign up
          </Link>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Reset Password</h3>
            
            {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{successMessage}</span>
              </div>
            )}
            
            {errorMessage && !successMessage && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{errorMessage}</span>
              </div>
            )}
            
            <form onSubmit={handleForgotPassword}>
              <div className="mb-4">
                <label htmlFor="forgot-email" className="block text-sm font-medium text-gray-700">Email address</label>
                <input
                  type="email"
                  id="forgot-email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setForgotEmail("");
                    setErrorMessage("");
                    setSuccessMessage("");
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
