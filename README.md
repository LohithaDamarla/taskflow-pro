# 🚀 TaskFlow Pro

> **Advanced Project Management & Task Tracking Application**

A modern, feature-rich Trello clone built with React.js and Tailwind CSS. TaskFlow Pro provides an intuitive drag-and-drop interface for managing projects, tasks, and team collaboration with advanced features like priority management, filtering, search, and real-time persistence.

# Live Demo https://taskflow-pro-ten.vercel.app/

<img width="1878" height="999" alt="2025-08-19" src="https://github.com/user-attachments/assets/e75b8fe7-b665-42b4-9386-9b20c85447e5" />
<img width="1920" height="1031" alt="2025-08-19 (4)" src="https://github.com/user-attachments/assets/889f20bc-eeb8-4172-a265-60afee9849cf" />
<img width="1915" height="1011" alt="2025-08-19 (3)" src="https://github.com/user-attachments/assets/bf121e66-0dee-4321-aa97-69c231312430" />
<img width="1904" height="1005" alt="2025-08-19 (2)" src="https://github.com/user-attachments/assets/e7fd45a3-9e00-413e-9d3c-501ad86f473d" />



## ✨ Features

### 🎯 **Core Functionality**
- **Drag & Drop Interface** - Move tasks seamlessly between boards
- **Real-time Persistence** - All data automatically saved to local storage
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Professional UI** - Modern glass-morphism design with beautiful backgrounds

### 🔧 **Advanced Task Management**
- **Priority Levels** - High, Medium, Low priority with color coding
- **Due Date Tracking** - Visual indicators for overdue tasks
- **Task Completion** - Mark tasks as complete with visual feedback
- **Image Attachments** - Add visual context to your tasks
- **Tags System** - Organize tasks with custom tags
- **Assignee Management** - Track task ownership

### 🎨 **User Experience**
- **Dark/Light Mode** - Toggle between themes with smooth transitions
- **Search & Filter** - Find tasks quickly with real-time search
- **Multiple View Modes** - Switch between grid and list layouts
- **Statistics Dashboard** - Track project progress at a glance
- **Smart Filtering** - Filter by priority, status, and due dates

### 📊 **Dashboard Features**
- **Live Statistics** - Total, completed, and overdue task counts
- **Progress Tracking** - Visual indicators for project health
- **Quick Actions** - Fast task creation and management
- **Board Management** - Create, edit, and delete project boards

## 🛠️ Technology Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **React.js** | Frontend Framework | ^18.2.0 |
| **Tailwind CSS** | Styling & UI | ^3.3.0 |
| **Lucide React** | Icon Library | Latest |
| **JavaScript ES6+** | Programming Language | ES2022 |
| **HTML5** | Markup | - |
| **CSS3** | Styling | - |

## 🚀 Quick Start

### Prerequisites
- Node.js (v16.0 or higher)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Lohitha-Damarla/taskflow-pro.git
   cd taskflow-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📱 Usage Guide

### Creating Your First Project

1. **Add a Board**: Click "Add another list" to create your first project board
2. **Create Tasks**: Click the "+" icon on any board to add tasks
3. **Set Priorities**: Assign High, Medium, or Low priority to tasks
4. **Add Details**: Include descriptions, due dates, assignees, and images
5. **Organize**: Use drag-and-drop to move tasks between boards

### Advanced Features

#### 🔍 **Search & Filter**
- Use the search bar to find tasks by title, description, or assignee
- Filter tasks by priority, completion status, or due date
- Combine search and filters for precise task finding

#### 🌙 **Theme Management**
- Toggle between light and dark modes using the theme button
- Themes are automatically saved and restored

#### 📊 **Analytics**
- Monitor project progress with the statistics bar
- Track total, completed, and overdue tasks
- Get insights into team productivity

## 🏗️ Project Structure

```
taskflow-pro/
├── public/                 # Static assets
│   ├── index.html         # HTML template
│   └── favicon.ico        # App icon
├── src/                   # Source code
│   ├── components/        # Reusable components (future)
│   ├── TrelloClone.js    # Main application component
│   ├── App.js            # Root component
│   ├── index.js          # Entry point
│   └── index.css         # Global styles
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
└── README.md            # Project documentation
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#2563eb` - Actions and highlights
- **Success Green**: `#16a34a` - Completed tasks
- **Warning Yellow**: `#eab308` - Medium priority
- **Danger Red**: `#dc2626` - High priority/overdue
- **Neutral Gray**: Various shades for text and backgrounds

### Typography
- **Headers**: Inter/System fonts, bold weights
- **Body**: Inter/System fonts, regular weights
- **Code**: Monospace fonts for technical content

## 🔧 Configuration

### Environment Variables
```bash
# Optional: Custom API endpoints (future feature)
REACT_APP_API_URL=https://your-api.com

# Optional: Analytics tracking (future feature)
REACT_APP_ANALYTICS_ID=your-analytics-id
```

### Tailwind Customization
Modify `tailwind.config.js` to customize the design system:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Add your custom colors
        primary: '#2563eb',
        secondary: '#64748b',
      }
    }
  }
}
```

## 📦 Build & Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Deploy to Netlify
```bash
# Build the project
npm run build

# Deploy build folder to Netlify
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make changes** and **commit**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Create Pull Request**

### Development Guidelines
- Follow React best practices and hooks patterns
- Use Tailwind CSS for styling (avoid custom CSS when possible)
- Write descriptive commit messages
- Test features across different screen sizes
- Ensure accessibility compliance

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature idea? Please create an issue:

**Bug Reports**: Include browser, OS, steps to reproduce
**Feature Requests**: Describe the feature and its benefits

## 📈 Roadmap

### Version 2.0 (Planned)
- [ ] **Backend Integration** - REST API with database
- [ ] **User Authentication** - Login/Register functionality
- [ ] **Team Collaboration** - Real-time multi-user editing
- [ ] **Advanced Analytics** - Detailed project insights
- [ ] **File Attachments** - Upload and manage files
- [ ] **Notifications** - Email and in-app notifications
- [ ] **Templates** - Pre-built project templates
- [ ] **Export Features** - PDF and CSV export

### Version 1.5 (Next Release)
- [ ] **Keyboard Shortcuts** - Power user features
- [ ] **Bulk Operations** - Multi-task editing
- [ ] **Advanced Filtering** - Date ranges and custom filters
- [ ] **Board Templates** - Quick project setup

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 TaskFlow Pro

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 👥 Authors & Acknowledgments

**Created by**: Lohitha Damarla(https://github.com/Lohitha-Damarla)

### Acknowledgments
- Design inspiration from Trello and modern web applications
- Icons provided by [Lucide](https://lucide.dev/)
- Background images from [Unsplash](https://unsplash.com/)
- Built with [Create React App](https://create-react-app.dev/)

---

## 👨‍💻 Developer
Built with ❤️ by Lohitha Damarla

💼 LinkedIn Profile - Lohitha Damarla
🌐 Portfolio Website
📧 Email - lohidamarla@gmail.com

---


**⭐ Star this repository if you found it helpful!**

[Live Demo](https://taskflow-pro-ten.vercel.app/) • [Report Bug](https://github.com/Lohitha-Damarla/taskflow-pro/issues) 
Made with ❤️ by Lohitha Damarla (https://github.com/Lohitha-Damarla)
