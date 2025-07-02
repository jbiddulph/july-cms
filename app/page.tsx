'use client';

import Link from 'next/link';
import { useAuth } from './contexts/AuthContext';

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">J</span>
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  July CMS
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-gray-700 bg-gray-100 px-3 py-1 rounded-full text-sm">
                    👋 Welcome, {user.name}
                  </span>
                  <Link
                    href="/dashboard"
                    className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-br from-pink-400 to-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-indigo-100 text-indigo-800 mb-8">
                🚀 Modern Authentication System
              </span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 sm:text-6xl md:text-7xl leading-tight">
              <span className="block">July CMS</span>
              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent">
                Authentication Demo
              </span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
              Experience a comprehensive Next.js authentication system with secure login, registration, 
              and user management features. Built with modern web technologies and security best practices.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link
                  href="/dashboard"
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 hover:shadow-xl transform hover:-translate-y-1"
                >
                  Go to Dashboard
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
                </Link>
              ) : (
                <>
                  <Link
                    href="/register"
                    className="group inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Get Started
                    <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </Link>
                  <Link
                    href="/login"
                    className="group inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-xl text-gray-700 bg-white/80 backdrop-blur-md hover:bg-white border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1"
                  >
                    Sign In
                    <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-indigo-100 text-indigo-800 mb-4">
              ✨ Features
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Complete Authentication System
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with modern web technologies and security best practices for a seamless user experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                🔐
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Secure Authentication</h3>
              <p className="text-gray-600 leading-relaxed">
                Password hashing with bcrypt and JWT token-based authentication for maximum security and data protection.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                👤
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">User Registration</h3>
              <p className="text-gray-600 leading-relaxed">
                Streamlined registration process with email validation and password confirmation for new users.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                🛡️
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Protected Routes</h3>
              <p className="text-gray-600 leading-relaxed">
                Automatic redirection and route protection for authenticated content with seamless user experience.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                📱
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Responsive Design</h3>
              <p className="text-gray-600 leading-relaxed">
                Beautiful, mobile-first design built with Tailwind CSS that looks great on any device.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                ⚡
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Fast & Modern</h3>
              <p className="text-gray-600 leading-relaxed">
                Built with Next.js 15, React 19, and TypeScript for optimal performance and developer experience.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                🍪
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Persistent Sessions</h3>
              <p className="text-gray-600 leading-relaxed">
                Cookie-based session management with automatic token renewal for uninterrupted user sessions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div className="py-20 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-indigo-100 text-indigo-800 mb-8">
              🎯 Try it out
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to test drive?</h2>
            <p className="text-xl text-gray-600 mb-12">
              Use our demo credentials to experience the authentication system in action.
            </p>
            
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 max-w-md mx-auto border border-gray-100">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                  🎮
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Demo Credentials</h3>
                <p className="text-gray-600 text-sm">Test the system with these credentials</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="font-mono text-gray-900 font-medium">admin@example.com</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-1">Password</p>
                  <p className="font-mono text-gray-900 font-medium">admin123</p>
                </div>
              </div>
              
              <Link
                href="/login"
                className="group w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center"
              >
                Try Demo Login
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-sm py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">J</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                July CMS
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              A modern authentication demo built with Next.js, TypeScript, and Tailwind CSS.
            </p>
            <p className="text-sm text-gray-500">
              © 2024 July CMS. Built with ❤️ for developers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
