import React, { useState, useEffect } from 'react';
import { 
  Moon, 
  Sun, 
  BookOpen, 
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Settings,
  ArrowLeft,
  Bookmark
} from 'lucide-react';

const NovelReader = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [readingProgress, setReadingProgress] = useState(23);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const adjustFontSize = (increase) => {
    if (increase && fontSize < 24) {
      setFontSize(fontSize + 2);
    } else if (!increase && fontSize > 14) {
      setFontSize(fontSize - 2);
    }
  };

  const bookData = {
    title: "The Midnight Library",
    author: "Matt Haig",
    totalChapters: 23
  };

  const chapters = [
    { id: 0, title: "The Library", pages: 8 },
    { id: 1, title: "Nineteen Years Before She Decided Not to Die", pages: 12 },
    { id: 2, title: "The Midnight Library", pages: 15 },
    { id: 3, title: "The Librarian", pages: 10 },
    { id: 4, title: "Between Life and Death", pages: 9 },
    { id: 5, title: "The Book of Regrets", pages: 14 },
    { id: 6, title: "Regrets", pages: 7 },
    { id: 7, title: "The Other Life", pages: 13 },
    { id: 8, title: "The Swimmer", pages: 11 },
    { id: 9, title: "A Life Without Music", pages: 16 },
    { id: 10, title: "The Philosophy of Life", pages: 8 },
    { id: 11, title: "Hugo", pages: 12 },
    { id: 12, title: "Izzy", pages: 14 },
    { id: 13, title: "The Many Lives of Nora Seed", pages: 10 },
    { id: 14, title: "Life as a Mother", pages: 13 },
    { id: 15, title: "The Arctic", pages: 15 },
    { id: 16, title: "Nora's Last Day on Earth", pages: 9 },
    { id: 17, title: "The Successful Life", pages: 11 },
    { id: 18, title: "Trees", pages: 8 },
    { id: 19, title: "The Disappearing Library", pages: 12 },
    { id: 20, title: "Life, Actual", pages: 10 },
    { id: 21, title: "The Only Way to Learn Is to Live", pages: 14 },
    { id: 22, title: "Beyond the Midnight Library", pages: 9 }
  ];

  const currentChapterContent = `The first thing Nora noticed about the library was that it was bigger than any library she had ever been in. In fact, it was bigger than most libraries combined. The shelves seemed to go on forever, stretching up to dizzying heights and extending in every direction as far as the eye could see.

Each book on these infinite shelves represented a different version of Nora's life - a life she could have lived if she had made different choices. The books were identical in appearance: green hardcovers with the same gold lettering. But each one contained a completely different story of who she might have become.

"Welcome to the Midnight Library," said a familiar voice behind her.

Nora turned around to see someone she recognized instantly, though she hadn't seen her in over twenty years. It was Mrs. Elm, her old school librarian. She looked exactly as Nora remembered her: kind eyes behind wire-rimmed glasses, silver hair pulled back in a practical bun, and that warm smile that had made the school library feel like a sanctuary.

"Mrs. Elm?" Nora whispered, hardly believing what she was seeing.

"Hello, dear," Mrs. Elm replied, her voice carrying the same gentle authority that had once helped Nora find the perfect book for any mood. "I've been expecting you."

The library around them hummed with a strange energy. Books occasionally flickered and glowed, and Nora could swear she heard whispers coming from the shelves - stories trying to tell themselves, lives waiting to be lived.

"What is this place?" Nora asked, though part of her already knew the answer.

"This," Mrs. Elm said, gesturing to the infinite expanse of books, "is the place between life and death. It's a library of all the lives you could have lived. Every regret, every choice not made, every path not taken - they all exist here as books."

Nora felt overwhelmed by the magnitude of it all. How many books were there? How many different versions of herself existed in this impossible space?

"The question," Mrs. Elm continued, "is what you want to do about it. You can explore these lives, experience what might have been. But remember - this is still your choice to make."

As if responding to her thoughts, one of the books began to glow more brightly than the others. Nora found herself drawn toward it, her hand reaching out almost involuntarily. The moment her fingers touched the spine, she felt a pull unlike anything she had ever experienced.

"Are you ready?" Mrs. Elm asked softly.

Nora took a deep breath. For the first time in years, she felt a spark of something she had almost forgotten - curiosity about what life might hold.

"I think so," she said, and opened the book.`;

  const nextChapter = () => {
    if (currentChapter < chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
      setReadingProgress(Math.min(100, readingProgress + 4.3));
    }
  };

  const prevChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
      setReadingProgress(Math.max(0, readingProgress - 4.3));
    }
  };

  const selectChapter = (chapterId) => {
    setCurrentChapter(chapterId);
    setReadingProgress((chapterId / chapters.length) * 100);
    setSidebarOpen(false);
  };

  // Close sidebar when clicking outside on desktop
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarOpen && !event.target.closest('.sidebar') && !event.target.closest('.menu-button')) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen]);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        {/* Progress Bar */}
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200 dark:bg-gray-700">
          <div 
            className="h-full bg-amber-600 dark:bg-amber-500 transition-all duration-300"
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        {/* Header */}
        <header className="fixed top-1 left-0 right-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center h-14">
              {/* Left Section */}
              <div className="flex items-center space-x-3">
                <button 
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button 
                  onClick={toggleSidebar}
                  className="menu-button p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </div>

              {/* Center - Book Info (hidden on mobile) */}
              <div className="hidden md:flex flex-col items-center">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{bookData.title}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Chapter {currentChapter + 1} of {bookData.totalChapters} • {Math.round(readingProgress)}%
                </span>
              </div>

              {/* Right Section */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-2 rounded-lg transition-colors ${
                    isBookmarked 
                      ? 'bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>
                
                {/* Font Size Controls */}
                <div className="hidden sm:flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                  <button
                    onClick={() => adjustFontSize(false)}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                    disabled={fontSize <= 14}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-sm px-2 min-w-[2rem] text-center">{fontSize}</span>
                  <button
                    onClick={() => adjustFontSize(true)}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                    disabled={fontSize >= 24}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-30 bg-black/50 md:bg-transparent" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <div className={`sidebar fixed top-0 left-0 z-40 h-full w-80 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } border-r border-gray-200 dark:border-gray-700`}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Contents</h2>
              <button
                onClick={toggleSidebar}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <div className="font-medium">{bookData.title}</div>
              <div>by {bookData.author}</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {chapters.map((chapter) => (
                <button
                  key={chapter.id}
                  onClick={() => selectChapter(chapter.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    currentChapter === chapter.id
                      ? 'bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="font-medium text-sm mb-1">
                    Chapter {chapter.id + 1}
                  </div>
                  <div className="text-xs opacity-75 line-clamp-2">
                    {chapter.title}
                  </div>
                  <div className="text-xs opacity-50 mt-1">
                    {chapter.pages} pages
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Font Controls */}
          <div className="sm:hidden p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">Font Size</span>
              <div className="flex items-center space-x-3 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => adjustFontSize(false)}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                  disabled={fontSize <= 14}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-sm px-3 min-w-[3rem] text-center">{fontSize}px</span>
                <button
                  onClick={() => adjustFontSize(true)}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                  disabled={fontSize >= 24}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="pt-16 min-h-screen">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Chapter Header */}
            <div className="mb-8 text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {chapters[currentChapter].title}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Chapter {currentChapter + 1} • {chapters[currentChapter].pages} pages
              </p>
            </div>

            {/* Reading Content */}
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <div 
                className="text-gray-800 dark:text-gray-200 leading-relaxed"
                style={{ fontSize: `${fontSize}px`, lineHeight: '1.7' }}
              >
                {currentChapterContent.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Chapter Navigation */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={prevChapter}
                disabled={currentChapter === 0}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  currentChapter === 0
                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20'
                }`}
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="hidden sm:inline">Previous Chapter</span>
                <span className="sm:hidden">Previous</span>
              </button>

              <div className="text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {currentChapter + 1} of {bookData.totalChapters}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {Math.round(readingProgress)}% complete
                </div>
              </div>

              <button
                onClick={nextChapter}
                disabled={currentChapter === chapters.length - 1}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  currentChapter === chapters.length - 1
                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20'
                }`}
              >
                <span className="hidden sm:inline">Next Chapter</span>
                <span className="sm:hidden">Next</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NovelReader;