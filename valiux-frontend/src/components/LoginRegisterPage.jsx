import React, { useState } from 'react';
import { 
  Moon, 
  Sun, 
  BookOpen, 
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight
} from 'lucide-react';

const LoginRegisterPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    // Handle successful login/register here
  };

  const bookQuotes = [
    "A room without books is like a body without a soul.",
    "So many books, so little time.",
    "The more that you read, the more things you will know.",
    "Books are uniquely portable magic.",
    "A book is a dream that you hold in your hand."
  ];

  const randomQuote = bookQuotes[Math.floor(Math.random() * bookQuotes.length)];

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 transition-colors duration-200">
        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="fixed top-4 right-4 z-10 p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200/50 dark:border-gray-700/50"
        >
          {darkMode ? (
            <Sun className="h-5 w-5 text-amber-600" />
          ) : (
            <Moon className="h-5 w-5 text-gray-700" />
          )}
        </button>

        {/* Main Container */}
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
          {/* Left Panel - Illustration/Welcome */}
          <div className="hidden lg:flex lg:flex-col lg:justify-center lg:items-center lg:p-12 bg-gradient-to-br from-amber-600 to-orange-600 dark:from-amber-700 dark:to-orange-700 rounded-l-2xl">
            <div className="text-center text-white space-y-6">
              <div className="flex items-center justify-center space-x-3 mb-8">
                <BookOpen className="h-12 w-12" />
                <span className="text-3xl font-bold">NovelNest</span>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Welcome to Your Reading Journey</h2>
                <p className="text-xl opacity-90 leading-relaxed max-w-md">
                  Discover thousands of captivating stories and join a community of passionate readers.
                </p>
              </div>

              {/* Book Illustration */}
              <div className="relative mt-12">
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-16 h-20 bg-white/20 rounded-lg transform rotate-12 shadow-lg"></div>
                  <div className="w-16 h-20 bg-white/30 rounded-lg transform -rotate-6 shadow-lg"></div>
                  <div className="w-16 h-20 bg-white/25 rounded-lg transform rotate-3 shadow-lg"></div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <p className="text-sm italic opacity-80">"{randomQuote}"</p>
              </div>
            </div>
          </div>

          {/* Right Panel - Auth Form */}
          <div className="flex flex-col justify-center p-8 lg:p-12 bg-white dark:bg-gray-800 lg:rounded-r-2xl rounded-2xl lg:rounded-l-none shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
              <BookOpen className="h-10 w-10 text-amber-600" />
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">NovelNest</span>
            </div>

            <div className="w-full max-w-md mx-auto">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  {isLogin 
                    ? 'Sign in to continue your reading journey' 
                    : 'Join thousands of readers today'
                  }
                </p>
              </div>

              {/* Form */}
              <div className="space-y-6">
                {/* Name Field (Register only) */}
                {!isLogin && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required={!isLogin}
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:focus:ring-amber-400 dark:focus:border-amber-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                )}

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:focus:ring-amber-400 dark:focus:border-amber-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:focus:ring-amber-400 dark:focus:border-amber-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field (Register only) */}
                {!isLogin && (
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        required={!isLogin}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:focus:ring-amber-400 dark:focus:border-amber-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Forgot Password Link (Login only) */}
                {isLogin && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-medium transition-colors"
                    >
                      Forgot your password?
                    </button>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>

                {/* Terms (Register only) */}
                {!isLogin && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center leading-relaxed">
                    By creating an account, you agree to our{' '}
                    <button className="text-amber-600 dark:text-amber-400 hover:underline font-medium">
                      Terms of Service
                    </button>{' '}
                    and{' '}
                    <button className="text-amber-600 dark:text-amber-400 hover:underline font-medium">
                      Privacy Policy
                    </button>
                  </p>
                )}

                {/* Switch Auth Mode */}
                <div className="text-center pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-300">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                    <button
                      type="button"
                      onClick={toggleAuthMode}
                      className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-medium transition-colors"
                    >
                      {isLogin ? 'Create one here' : 'Sign in here'}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterPage;