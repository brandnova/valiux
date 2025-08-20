import React, { useState } from 'react';
import { BookOpen, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import logoImage from "../assets/logo.webp";

const NovelPlatform = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const featuredBook = {
    title: "The Midnight Library",
    author: "Matt Haig",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    blurb: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
    rating: 4.8,
    genre: "Fiction"
  };

  const trendingBooks = [
    {
      id: 1,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop",
      genre: "Romance",
      rating: 4.9
    },
    {
      id: 2,
      title: "Project Hail Mary",
      author: "Andy Weir",
      cover: "https://images.unsplash.com/photo-1518281361980-b26bfd556770?w=300&h=450&fit=crop",
      genre: "Sci-Fi",
      rating: 4.7
    },
    {
      id: 3,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=450&fit=crop",
      genre: "Thriller",
      rating: 4.6
    },
    {
      id: 4,
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop",
      genre: "Literary",
      rating: 4.8
    },
    {
      id: 5,
      title: "The House in the Cerulean Sea",
      author: "TJ Klune",
      cover: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300&h=450&fit=crop",
      genre: "Fantasy",
      rating: 4.9
    },
    {
      id: 6,
      title: "Educated",
      author: "Tara Westover",
      cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=450&fit=crop",
      genre: "Memoir",
      rating: 4.5
    }
  ];

  const categories = [
    { name: "Fiction", count: 2847, color: "bg-amber-100 text-amber-800" },
    { name: "Romance", count: 1923, color: "bg-rose-100 text-rose-800" },
    { name: "Mystery", count: 1456, color: "bg-purple-100 text-purple-800" },
    { name: "Sci-Fi", count: 1234, color: "bg-blue-100 text-blue-800" },
    { name: "Fantasy", count: 1876, color: "bg-emerald-100 text-emerald-800" },
    { name: "Biography", count: 892, color: "bg-gray-100 text-gray-800" },
    { name: "Thriller", count: 1345, color: "bg-red-100 text-red-800" },
    { name: "Literary", count: 756, color: "bg-indigo-100 text-indigo-800" }
  ];

  const newReleases = [
    {
      title: "The Atlas Six",
      author: "Olivie Blake",
      cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=250&h=375&fit=crop"
    },
    {
      title: "The Invisible Life of Addie LaRue",
      author: "V.E. Schwab",
      cover: "https://images.unsplash.com/photo-1415604934674-561df9abf539?w=250&h=375&fit=crop"
    },
    {
      title: "Klara and the Sun",
      author: "Kazuo Ishiguro",
      cover: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=250&h=375&fit=crop"
    },
    {
      title: "The Vanishing Half",
      author: "Brit Bennett",
      cover: "https://images.unsplash.com/photo-1491841573337-6e7c9f48b942?w=250&h=375&fit=crop"
    },
    {
      title: "Anxious People",
      author: "Fredrik Backman",
      cover: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=250&h=375&fit=crop"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, newReleases.length - 2));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.max(1, newReleases.length - 2)) % Math.max(1, newReleases.length - 2));
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <img
                  src={logoImage}
                  alt="Valiux Logo"
                  className="w-6 h-6"
                />
                <span className="text-xl font-bold text-gray-900">Valiux</span>
              </div>
              
              <nav className="hidden md:flex space-x-8">
                <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Browse</a>
                <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Categories</a>
                <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">My Library</a>
                <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Community</a>
              </nav>

            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-12 lg:py-20 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Discover Your Next
                  <span className="text-amber-600 dark:text-amber-400"> Great Read</span>
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  Immerse yourself in thousands of captivating stories. From bestsellers to hidden gems, 
                  find your perfect book and join a community of passionate readers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                    Browse Library
                  </button>
                  <button className="border-2 border-amber-600 text-amber-600 dark:text-amber-400 hover:bg-amber-600 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors">
                    Start Free Trial
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-sm mx-auto">
                  <img 
                    src={featuredBook.cover} 
                    alt={featuredBook.title}
                    className="w-full h-80 object-cover rounded-xl mb-4"
                  />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 text-xs rounded-full ${categories.find(c => c.name === featuredBook.genre)?.color || 'bg-gray-100 text-gray-800'}`}>
                        {featuredBook.genre}
                      </span>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
                        {featuredBook.rating}
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{featuredBook.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">by {featuredBook.author}</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{featuredBook.blurb}</p>
                    <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg font-medium transition-colors">
                      Start Reading
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Trending Books */}
              <section className="mb-12">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Trending Now</h2>
                  <a href="#" className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-medium">
                    View All
                  </a>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {trendingBooks.map((book) => (
                    <div key={book.id} className="group cursor-pointer">
                      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 border border-gray-200 dark:border-gray-700">
                        <img 
                          src={book.cover} 
                          alt={book.title}
                          className="w-full h-48 object-cover rounded-lg mb-3"
                        />
                        <div className="space-y-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${categories.find(c => c.name === book.genre)?.color || 'bg-gray-100 text-gray-800'}`}>
                            {book.genre}
                          </span>
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                            {book.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">by {book.author}</p>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Star className="h-3 w-3 text-yellow-400 mr-1" fill="currentColor" />
                            {book.rating}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* New Releases Carousel */}
              <section className="mb-12">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">New Releases</h2>
                  <div className="flex space-x-2">
                    <button 
                      onClick={prevSlide}
                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={nextSlide}
                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="overflow-hidden">
                  <div 
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * (100 / 3)}%)` }}
                  >
                    {newReleases.map((book, index) => (
                      <div key={index} className="w-1/3 flex-shrink-0 px-2">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 border border-gray-200 dark:border-gray-700 cursor-pointer group">
                          <img 
                            src={book.cover} 
                            alt={book.title}
                            className="w-full h-40 object-cover rounded-lg mb-3"
                          />
                          <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
                            {book.title}
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">by {book.author}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Categories */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Browse Categories</h2>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category.name} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-sm transition-shadow cursor-pointer group">
                      <div>
                        <span className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          {category.name}
                        </span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{category.count.toLocaleString()} books</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${category.color}`}>
                        {category.name}
                      </span>
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-6 border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-amber-600 hover:text-amber-600 dark:hover:text-amber-400 py-3 rounded-lg font-medium transition-colors">
                  View All Categories
                </button>

                {/* Reading Challenge */}
                <div className="mt-8 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">Reading Challenge</h3>
                  <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full mb-3">
                    <div className="h-2 bg-amber-600 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    You've read 9 of 20 books this year (45%)
                  </p>
                  <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg font-medium transition-colors text-sm">
                    Update Challenge
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <img
                    src={logoImage}
                    alt="Valiux Logo"
                    className="w-6 h-6"
                  />
                  <span className="font-bold text-gray-900 dark:text-gray-100">Valiux</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Your digital sanctuary for discovering and enjoying great literature.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Discover</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li><a href="#" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">New Releases</a></li>
                  <li><a href="#" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Bestsellers</a></li>
                  <li><a href="#" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Award Winners</a></li>
                  <li><a href="#" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Editor's Choice</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Community</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li><a href="#" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Book Clubs</a></li>
                  <li><a href="#" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Reviews</a></li>
                  <li><a href="#" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Discussion Forums</a></li>
                  <li><a href="#" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Author Events</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Support</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li><a href="#" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                © 2025 NovelNest. All rights reserved. Made with ❤️ for book lovers everywhere.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default NovelPlatform;