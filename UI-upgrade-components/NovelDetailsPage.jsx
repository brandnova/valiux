import React, { useState } from 'react';
import { 
  Moon, 
  Sun, 
  BookOpen, 
  Star, 
  Heart, 
  Share2, 
  Bookmark, 
  Clock, 
  Users, 
  Calendar,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';

const NovelDetailsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isInLibrary, setIsInLibrary] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const toggleLibrary = () => {
    setIsInLibrary(!isInLibrary);
  };

  const bookData = {
    title: "The Midnight Library",
    author: "Matt Haig",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=750&fit=crop",
    rating: 4.8,
    totalRatings: 142857,
    genre: ["Fiction", "Philosophy", "Contemporary"],
    publishDate: "August 13, 2020",
    pages: 288,
    readTime: "4h 32m",
    language: "English",
    synopsis: `Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?

A dazzling novel about all the choices that go into a life well lived, from the internationally bestselling author of Reasons to Stay Alive and How To Stop Time. Somewhere out beyond the edge of the universe there is a library that contains an infinite number of books, each one the story of another reality. One tells the story of your life as it is, along with another book for the other life you could have lived if you had made a different choice at any point in your life.

While we all wonder how our lives might have been, what if you had the chance to go to the library and see for yourself? Would any of these other lives truly be better?`,
    publisher: "Canongate Books",
    isbn: "978-0525559474"
  };

  const relatedBooks = [
    {
      id: 1,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop",
      rating: 4.9
    },
    {
      id: 2,
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop",
      rating: 4.8
    },
    {
      id: 3,
      title: "The House in the Cerulean Sea",
      author: "TJ Klune",
      cover: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300&h=450&fit=crop",
      rating: 4.9
    },
    {
      id: 4,
      title: "Klara and the Sun",
      author: "Kazuo Ishiguro",
      cover: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=300&h=450&fit=crop",
      rating: 4.6
    },
    {
      id: 5,
      title: "The Invisible Life of Addie LaRue",
      author: "V.E. Schwab",
      cover: "https://images.unsplash.com/photo-1415604934674-561df9abf539?w=300&h=450&fit=crop",
      rating: 4.7
    },
    {
      id: 6,
      title: "Project Hail Mary",
      author: "Andy Weir",
      cover: "https://images.unsplash.com/photo-1518281361980-b26bfd556770?w=300&h=450&fit=crop",
      rating: 4.7
    }
  ];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="h-5 w-5 text-gray-300" />
          <Star className="h-5 w-5 text-yellow-400 absolute top-0 left-0" fill="currentColor" style={{ clipPath: 'inset(0 50% 0 0)' }} />
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-8 w-8 text-amber-600" />
                  <span className="text-xl font-bold text-gray-900 dark:text-gray-100">NovelNest</span>
                </div>
              </div>
              
              <nav className="hidden md:flex space-x-8">
                <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Browse</a>
                <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Categories</a>
                <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">My Library</a>
                <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Community</a>
              </nav>

              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
                <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Book Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Book Cover */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                  <img 
                    src={bookData.cover} 
                    alt={bookData.title}
                    className="w-full h-96 object-cover rounded-xl mb-6"
                  />
                  
                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                      <BookOpen className="h-5 w-5" />
                      <span>Start Reading</span>
                    </button>
                    
                    <button 
                      onClick={toggleLibrary}
                      className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                        isInLibrary 
                          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-2 border-green-200 dark:border-green-700' 
                          : 'border-2 border-amber-600 text-amber-600 dark:text-amber-400 hover:bg-amber-600 hover:text-white'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${isInLibrary ? 'fill-current' : ''}`} />
                      <span>{isInLibrary ? 'In Library' : 'Add to Library'}</span>
                    </button>
                  </div>
                  
                  {/* Interactive Elements */}
                  <div className="flex justify-center space-x-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button 
                      onClick={toggleBookmark}
                      className={`p-3 rounded-lg transition-colors ${
                        isBookmarked 
                          ? 'bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                    
                    <button className="p-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Book Information */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {/* Title and Author */}
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                    {bookData.title}
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                    by <span className="text-amber-600 dark:text-amber-400 font-medium hover:underline cursor-pointer">{bookData.author}</span>
                  </p>
                </div>

                {/* Rating and Genre Tags */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      {renderStars(bookData.rating)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-semibold">{bookData.rating}</span> ({bookData.totalRatings.toLocaleString()} ratings)
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {bookData.genre.map((genre, index) => (
                      <span key={index} className="px-3 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Book Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-gray-200 dark:border-gray-700">
                  <div className="text-center">
                    <Calendar className="h-5 w-5 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">Published</p>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">{bookData.publishDate}</p>
                  </div>
                  
                  <div className="text-center">
                    <BookOpen className="h-5 w-5 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">Pages</p>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">{bookData.pages}</p>
                  </div>
                  
                  <div className="text-center">
                    <Clock className="h-5 w-5 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">Read Time</p>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">{bookData.readTime}</p>
                  </div>
                  
                  <div className="text-center">
                    <Users className="h-5 w-5 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">Readers</p>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">{Math.floor(bookData.totalRatings / 1000)}k+</p>
                  </div>
                </div>

                {/* Synopsis */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Synopsis</h2>
                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    {bookData.synopsis.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Additional Details */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Book Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">Publisher:</span>
                      <span className="ml-2 text-gray-900 dark:text-gray-100 font-medium">{bookData.publisher}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">Language:</span>
                      <span className="ml-2 text-gray-900 dark:text-gray-100 font-medium">{bookData.language}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">ISBN:</span>
                      <span className="ml-2 text-gray-900 dark:text-gray-100 font-medium">{bookData.isbn}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Books Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">You Might Also Like</h2>
              <button className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-medium flex items-center space-x-1">
                <span>View All</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {relatedBooks.map((book) => (
                <div key={book.id} className="group cursor-pointer">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-4 border border-gray-200 dark:border-gray-700 hover:border-amber-200 dark:hover:border-amber-700">
                    <img 
                      src={book.cover} 
                      alt={book.title}
                      className="w-full h-32 sm:h-40 lg:h-48 object-cover rounded-lg mb-3"
                    />
                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-1">by {book.author}</p>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Star className="h-3 w-3 text-yellow-400 mr-1" fill="currentColor" />
                        {book.rating}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <BookOpen className="h-6 w-6 text-amber-600" />
                  <span className="font-bold text-gray-900 dark:text-gray-100">NovelNest</span>
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

export default NovelDetailsPage;