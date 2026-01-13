🎨 GigFlow Frontend

🎯 About
GigFlow Frontend is a modern, responsive React application that provides an intuitive interface for the GigFlow freelance marketplace. Built with React 18, Vite, and Tailwind CSS, it offers a seamless user experience with real-time notifications.
Key Highlights

🎨 Modern UI/UX with Tailwind CSS
⚡ Lightning fast with Vite build tool
🔔 Real-time notifications using Socket.IO
📱 Fully responsive design
🔐 Secure authentication flow
🎭 Dual role support (Client & Freelancer)


✨ Features
Core Features

✅ Authentication System

User registration with validation
Secure login/logout
Protected routes
Persistent auth with cookies


✅ Gig Marketplace

Browse all available gigs
Real-time search and filtering
Create new gig posts
View gig status (Open/Assigned)


✅ Bidding System

Submit bids with proposals and prices
View all received bids (for clients)
Smart role-based UI (hide bid button on own gigs)


✅ Hiring Workflow

One-click hiring process
Confirmation dialogs
Loading states and feedback
Automatic status updates



UI/UX Features

🎨 Beautiful gradient backgrounds
💫 Smooth animations and transitions
🎯 Intuitive modal dialogs
📊 Status badges and icons
🔄 Loading indicators
✅ Success/error alerts

Real-time Features

🔔 Instant hire notifications

Toast notifications with project details
Auto-dismiss after 8 seconds
Slide-in animation
No refresh required

## Quick start
# Clone the repository
```
git clone https://github.com/Dev-ayansharma/GigFlow.git
cd GigFlow
```
# Install dependencies
```      
npm install
npm i @tailwindcss/vite tailwindcss
npm i lucide-react socket.io-client

```

# Set up environment variables
```
VITE_API_BASE_URL=
VITE_SOCKET_URL=
```
example
```
# Backend API URL
VITE_API_BASE_URL=http://localhost:5000/api

# Socket.IO Server URL
VITE_SOCKET_URL=http://localhost:5000

# Optional: For production
# VITE_API_BASE_URL=https://your-backend-api.railway.app/api
# VITE_SOCKET_URL=https://your-backend-api.railway.app
```
# Start development server
npm run dev

## Notification Flow

User logs in → Socket connects automatically
User ID registered → Server maps socket to user
Client hires freelancer → Server emits hired event
Freelancer receives notification → Toast appears instantly
Auto-dismiss → Toast closes after 8 seconds

📧 Contact
Your Name - Ayan Sharma - ayansharma2006@gmail.com
Project Links:

Frontend: https://github.com/Dev-ayansharma/GigFlow
Backend: https://github.com/Dev-ayansharma/gigflowback
Live Demo: (https://gigflow-bay.vercel.app/)
