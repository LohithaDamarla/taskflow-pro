
import React, { useState, useEffect } from 'react';
import { Plus, X, Search, Filter, Moon, Sun, Calendar, User, Tag, Clock, Bell, Settings, Grid, List } from 'lucide-react';

// Enhanced mock data with more features
const initialBoards = [
  {
    id: '1',
    title: 'Backlog',
    color: 'bg-red-500',
    cards: [
      {
        id: '1',
        title: 'Design Homepage',
        description: 'Create wireframes and mockups for the homepage',
        image: 'https://i.pinimg.com/1200x/81/33/50/8133502726256358d6b26c533fc95dc0.jpg',
        dueDate: '2024-08-25',
        assignee: 'John Doe',
        priority: 'high',
        tags: ['Design', 'UI/UX'],
        completed: false
      },
      {
        id: '2',
        title: 'Set up development environment',
        description: 'Configure React, Tailwind, and other tools',
        dueDate: '2024-08-22',
        assignee: 'Jane Smith',
        priority: 'medium',
        tags: ['Development', 'Setup'],
        completed: false
      }
    ]
  },
  {
    id: '2',
    title: 'In Progress',
    color: 'bg-yellow-500',
    cards: [
      {
        id: '3',
        title: 'Implement authentication',
        description: 'Add login and registration functionality',
        image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop',
        dueDate: '2024-08-28',
        assignee: 'Mike Johnson',
        priority: 'high',
        tags: ['Backend', 'Security'],
        completed: false
      }
    ]
  },
  {
    id: '3',
    title: 'Review',
    color: 'bg-blue-500',
    cards: [
      {
        id: '4',
        title: 'Code review for API endpoints',
        description: 'Review and test all API endpoints',
        dueDate: '2024-08-30',
        assignee: 'Sarah Wilson',
        priority: 'medium',
        tags: ['Review', 'API'],
        completed: false
      }
    ]
  },
  {
    id: '4',
    title: 'Done',
    color: 'bg-green-500',
    cards: [
      {
        id: '5',
        title: 'Project setup',
        description: 'Initialize repository and basic structure',
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop',
        assignee: 'Team Lead',
        priority: 'low',
        tags: ['Setup'],
        completed: true
      }
    ]
  }
];

const TrelloClone = () => {
  const [boards, setBoards] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showSettings, setShowSettings] = useState(false);
  const [draggedCard, setDraggedCard] = useState(null);
  const [draggedOver, setDraggedOver] = useState(null);

  // Form states
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const [showAddBoard, setShowAddBoard] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [editingCard, setEditingCard] = useState(null);
  const [newCard, setNewCard] = useState({
    title: '',
    description: '',
    image: '',
    dueDate: '',
    assignee: '',
    priority: 'medium',
    tags: []
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedBoards = localStorage.getItem('trello-boards');
    const savedDarkMode = localStorage.getItem('trello-darkMode');
    
    if (savedBoards) {
      setBoards(JSON.parse(savedBoards));
    } else {
      setBoards(initialBoards);
    }
    
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Save to localStorage whenever boards or darkMode changes
  useEffect(() => {
    localStorage.setItem('trello-boards', JSON.stringify(boards));
  }, [boards]);

  useEffect(() => {
    localStorage.setItem('trello-darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Filter and search cards
  const getFilteredCards = (cards) => {
    return cards.filter(card => {
      const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           card.assignee.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterBy === 'all' || 
                           (filterBy === 'high' && card.priority === 'high') ||
                           (filterBy === 'overdue' && new Date(card.dueDate) < new Date()) ||
                           (filterBy === 'completed' && card.completed) ||
                           (filterBy === 'pending' && !card.completed);
      
      return matchesSearch && matchesFilter;
    });
  };

  // Drag and drop handlers
  const handleDragStart = (e, card, boardId) => {
    setDraggedCard({ card, boardId });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, boardId) => {
    e.preventDefault();
    setDraggedOver(boardId);
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragLeave = () => {
    setDraggedOver(null);
  };

  const handleDrop = (e, targetBoardId) => {
    e.preventDefault();
    if (draggedCard && draggedCard.boardId !== targetBoardId) {
      // Remove card from source board
      const updatedBoards = boards.map(board => {
        if (board.id === draggedCard.boardId) {
          return {
            ...board,
            cards: board.cards.filter(card => card.id !== draggedCard.card.id)
          };
        }
        if (board.id === targetBoardId) {
          return {
            ...board,
            cards: [...board.cards, draggedCard.card]
          };
        }
        return board;
      });
      setBoards(updatedBoards);
    }
    setDraggedCard(null);
    setDraggedOver(null);
  };

  // Add new board
  const addBoard = () => {
    if (newBoardTitle.trim()) {
      const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
      const newBoard = {
        id: Date.now().toString(),
        title: newBoardTitle,
        color: colors[Math.floor(Math.random() * colors.length)],
        cards: []
      };
      setBoards([...boards, newBoard]);
      setNewBoardTitle('');
      setShowAddBoard(false);
    }
  };

  // Add or edit card
  const saveCard = () => {
    if (newCard.title.trim() && selectedBoard) {
      const card = {
        id: editingCard ? editingCard.id : Date.now().toString(),
        ...newCard,
        tags: typeof newCard.tags === 'string' ? newCard.tags.split(',').map(tag => tag.trim()) : newCard.tags,
        completed: editingCard ? editingCard.completed : false
      };
      
      setBoards(boards.map(board => 
        board.id === selectedBoard.id 
          ? { 
              ...board, 
              cards: editingCard 
                ? board.cards.map(c => c.id === editingCard.id ? card : c)
                : [...board.cards, card]
            }
          : board
      ));
      
      resetCardForm();
    }
  };

  const resetCardForm = () => {
    setNewCard({ title: '', description: '', image: '', dueDate: '', assignee: '', priority: 'medium', tags: [] });
    setShowCardModal(false);
    setSelectedBoard(null);
    setEditingCard(null);
  };

  // Edit card
  const editCard = (card, board) => {
    setNewCard({
      ...card,
      tags: card.tags.join(', ')
    });
    setSelectedBoard(board);
    setEditingCard(card);
    setShowCardModal(true);
  };

  // Toggle card completion
  const toggleCardCompletion = (boardId, cardId) => {
    setBoards(boards.map(board => 
      board.id === boardId 
        ? { 
            ...board, 
            cards: board.cards.map(card => 
              card.id === cardId ? { ...card, completed: !card.completed } : card
            )
          }
        : board
    ));
  };

  // Delete card
  const deleteCard = (boardId, cardId) => {
    setBoards(boards.map(board => 
      board.id === boardId 
        ? { ...board, cards: board.cards.filter(card => card.id !== cardId) }
        : board
    ));
  };

  // Delete board
  const deleteBoard = (boardId) => {
    setBoards(boards.filter(board => board.id !== boardId));
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Check if card is overdue
  const isOverdue = (dueDate) => {
    return dueDate && new Date(dueDate) < new Date();
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-cover bg-center bg-fixed'
    }`} 
    style={!darkMode ? {
      backgroundImage: 'url("https://i.pinimg.com/736x/14/90/25/149025685b870f7a320044681ca04d5d.jpg")',
      backgroundAttachment: 'fixed'
    } : {}}>
      
      {/* Overlay for better readability */}
      {!darkMode && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-[1px]" style={{ zIndex: -1 }}></div>
      )}

      {/* Header */}
      <header className={`backdrop-blur-md border-b transition-colors duration-300 ${
        darkMode 
          ? 'bg-gray-800/90 border-gray-700' 
          : 'bg-white/95 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                TaskFlow Pro
              </h1>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Advanced project management
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search size={18} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2 rounded-lg border transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              {/* Filters */}
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className={`px-3 py-2 rounded-lg border transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-800'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="all">All Tasks</option>
                <option value="high">High Priority</option>
                <option value="overdue">Overdue</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>

              {/* View Mode */}
              <div className={`flex rounded-lg p-1 ${
                darkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid' 
                      ? (darkMode ? 'bg-gray-600' : 'bg-white shadow-sm') 
                      : (darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200')
                  }`}
                >
                  <Grid size={18} className={darkMode ? 'text-white' : 'text-gray-700'} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list' 
                      ? (darkMode ? 'bg-gray-600' : 'bg-white shadow-sm') 
                      : (darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200')
                  }`}
                >
                  <List size={18} className={darkMode ? 'text-white' : 'text-gray-700'} />
                </button>
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {darkMode ? (
                  <Sun size={18} className="text-yellow-400" />
                ) : (
                  <Moon size={18} className="text-gray-700" />
                )}
              </button>

              {/* Settings */}
              <button
                onClick={() => setShowSettings(true)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <Settings size={18} className={darkMode ? 'text-white' : 'text-gray-700'} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className={`backdrop-blur-md border-b transition-colors duration-300 ${
        darkMode 
          ? 'bg-gray-800/50 border-gray-700' 
          : 'bg-white/90 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex gap-6 text-sm">
            <div className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
              <span className="font-medium">
                {boards.reduce((acc, board) => acc + board.cards.length, 0)} Total Tasks
              </span>
            </div>
            <div className={darkMode ? 'text-green-400' : 'text-green-600'}>
              <span className="font-medium">
                {boards.reduce((acc, board) => acc + board.cards.filter(card => card.completed).length, 0)} Completed
              </span>
            </div>
            <div className={darkMode ? 'text-red-400' : 'text-red-600'}>
              <span className="font-medium">
                {boards.reduce((acc, board) => acc + board.cards.filter(card => isOverdue(card.dueDate) && !card.completed).length, 0)} Overdue
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className={viewMode === 'grid' ? 'flex gap-6 overflow-x-auto pb-4' : 'space-y-6'}>
          {boards.map((board) => {
            const filteredCards = getFilteredCards(board.cards);
            
            return (
              <div 
                key={board.id} 
                className={viewMode === 'grid' ? 'flex-shrink-0 w-80' : 'w-full'}
                onDragOver={(e) => handleDragOver(e, board.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, board.id)}
              >
                <div className={`backdrop-blur-sm rounded-xl shadow-xl border transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gray-800/90 border-gray-700' 
                    : 'bg-white/95 border-white/20'
                } ${draggedOver === board.id ? 'ring-2 ring-blue-400' : ''}`}>
                  
                  {/* Board Header */}
                  <div className={`p-4 border-b flex items-center justify-between ${
                    darkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${board.color}`}></div>
                      <h2 className={`font-semibold text-lg ${
                        darkMode ? 'text-white' : 'text-gray-800'
                      }`}>
                        {board.title}
                      </h2>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {filteredCards.length}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedBoard(board);
                          setShowCardModal(true);
                        }}
                        className={`p-1 rounded transition-colors ${
                          darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                        }`}
                      >
                        <Plus size={16} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
                      </button>
                      <button
                        onClick={() => deleteBoard(board.id)}
                        className={`p-1 rounded transition-colors ${
                          darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                        }`}
                      >
                        <X size={16} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
                      </button>
                    </div>
                  </div>

                  {/* Cards */}
                  <div className={`p-4 space-y-3 ${viewMode === 'grid' ? 'max-h-96 overflow-y-auto' : ''}`}>
                    {filteredCards.map((card) => (
                      <div 
                        key={card.id} 
                        draggable
                        onDragStart={(e) => handleDragStart(e, card, board.id)}
                        className={`rounded-lg shadow-sm border hover:shadow-md transition-all group cursor-move ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 hover:bg-gray-650' 
                            : 'bg-white border-gray-200 hover:border-gray-300'
                        } ${card.completed ? 'opacity-75' : ''}`}
                      >
                        {/* Card Image */}
                        {card.image && (
                          <img 
                            src={card.image} 
                            alt={card.title}
                            className="w-full h-32 object-cover rounded-t-lg"
                          />
                        )}
                        
                        <div className="p-3">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className={`font-medium text-sm line-clamp-2 ${
                              darkMode ? 'text-white' : 'text-gray-800'
                            } ${card.completed ? 'line-through' : ''}`}>
                              {card.title}
                            </h3>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => editCard(card, board)}
                                className={`p-1 rounded transition-colors ${
                                  darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
                                }`}
                              >
                                <Settings size={12} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                              </button>
                              <button
                                onClick={() => toggleCardCompletion(board.id, card.id)}
                                className={`p-1 rounded transition-colors ${
                                  darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
                                }`}
                              >
                                <Clock size={12} className={card.completed ? 'text-green-500' : (darkMode ? 'text-gray-400' : 'text-gray-500')} />
                              </button>
                              <button
                                onClick={() => deleteCard(board.id, card.id)}
                                className={`p-1 rounded transition-colors ${
                                  darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
                                }`}
                              >
                                <X size={12} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                              </button>
                            </div>
                          </div>
                          
                          {card.description && (
                            <p className={`text-xs mb-3 line-clamp-2 ${
                              darkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                              {card.description}
                            </p>
                          )}

                          {/* Tags */}
                          {card.tags && card.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {card.tags.map((tag, index) => (
                                <span key={index} className={`text-xs px-2 py-1 rounded-full ${
                                  darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                                }`}>
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          {/* Priority Badge */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(card.priority)}`}>
                                {card.priority}
                              </span>
                              
                              {card.dueDate && (
                                <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
                                  isOverdue(card.dueDate) && !card.completed
                                    ? 'bg-red-100 text-red-800'
                                    : darkMode ? 'bg-gray-600 text-gray-200' : 'bg-yellow-50 text-yellow-800'
                                }`}>
                                  <Calendar size={10} />
                                  <span>{new Date(card.dueDate).toLocaleDateString()}</span>
                                  {isOverdue(card.dueDate) && !card.completed && (
                                    <Bell size={10} className="text-red-600" />
                                  )}
                                </div>
                              )}
                            </div>
                            
                            {card.assignee && (
                              <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
                                darkMode ? 'bg-gray-600 text-gray-200' : 'bg-blue-50 text-blue-800'
                              }`}>
                                <User size={10} />
                                <span>{card.assignee}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Add Board */}
          <div className={viewMode === 'grid' ? 'flex-shrink-0 w-80' : 'w-full'}>
            {!showAddBoard ? (
              <button
                onClick={() => setShowAddBoard(true)}
                className={`w-full border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                  darkMode 
                    ? 'border-gray-600 hover:border-gray-500 text-gray-400 hover:text-gray-300 hover:bg-gray-800/50' 
                    : 'border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-700 hover:bg-white/70'
                } flex items-center justify-center gap-2`}
              >
                <Plus size={20} />
                Add another list
              </button>
            ) : (
              <div className={`backdrop-blur-sm rounded-xl shadow-xl border p-4 ${
                darkMode 
                  ? 'bg-gray-800/90 border-gray-700' 
                  : 'bg-white/95 border-white/20'
              }`}>
                <input
                  type="text"
                  placeholder="Enter list title..."
                  value={newBoardTitle}
                  onChange={(e) => setNewBoardTitle(e.target.value)}
                  className={`w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300'
                  }`}
                  autoFocus
                />
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={addBoard}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm transition-colors"
                  >
                    Add List
                  </button>
                  <button
                    onClick={() => {
                      setShowAddBoard(false);
                      setNewBoardTitle('');
                    }}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      darkMode 
                        ? 'text-gray-300 hover:bg-gray-700' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Card Modal */}
      {showCardModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {editingCard ? 'Edit Card' : 'Add New Card'}
                </h3>
                <button
                  onClick={resetCardForm}
                  className={`p-1 rounded transition-colors ${
                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <X size={20} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Title</label>
                  <input
                    type="text"
                    placeholder="Enter card title..."
                    value={newCard.title}
                    onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Description</label>
                  <textarea
                    placeholder="Enter description..."
                    value={newCard.description}
                    onChange={(e) => setNewCard({ ...newCard, description: e.target.value })}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Image URL</label>
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={newCard.image}
                    onChange={(e) => setNewCard({ ...newCard, image: e.target.value })}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Tags (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="Design, Frontend, Urgent"
                    value={newCard.tags}
                    onChange={(e) => setNewCard({ ...newCard, tags: e.target.value })}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>Due Date</label>
                    <input
                      type="date"
                      value={newCard.dueDate}
                      onChange={(e) => setNewCard({ ...newCard, dueDate: e.target.value })}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>Priority</label>
                    <select
                      value={newCard.priority}
                      onChange={(e) => setNewCard({ ...newCard, priority: e.target.value })}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Assignee</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={newCard.assignee}
                    onChange={(e) => setNewCard({ ...newCard, assignee: e.target.value })}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300'
                    }`}
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={saveCard}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  {editingCard ? 'Update Card' : 'Add Card'}
                </button>
                <button
                  onClick={resetCardForm}
                  className={`px-6 py-3 rounded-lg transition-colors ${
                    darkMode 
                      ? 'text-gray-300 hover:bg-gray-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`rounded-xl shadow-2xl max-w-md w-full ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}>Settings</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className={`p-1 rounded transition-colors ${
                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <X size={20} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Dark Mode</span>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      darkMode ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        darkMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => {
                      localStorage.removeItem('trello-boards');
                      setBoards(initialBoards);
                      setShowSettings(false);
                    }}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Reset All Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrelloClone;