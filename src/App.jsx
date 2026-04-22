import { useState, useEffect } from "react";
import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./context/useAuth";
import AuthPage from "./components/auth/AuthPage";
import Dashboard from "./components/dashboard/Dashboard";
import NotificationToast from "./components/NotificationToast";
import socketService from "./services/socket";
import ClientDashboard from "./components/dashboard/ClientDashboard";
const AppContent = () => {
  const { user, loading } = useAuth();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (!user?._id) return;

    const handleHired = (data) => {
      console.log("✅ HIRED EVENT RECEIVED:", data);
      setNotification(data);
    };

    socketService.on("hired", handleHired);

    return () => {
      socketService.off("hired", handleHired);
    };
  }, [user?._id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
     {user ? (
  user.role === "client" ? <ClientDashboard /> : <Dashboard />
) : (
  <AuthPage />
)}
      {notification && (
        <NotificationToast
          notification={notification}
          onClose={() => setNotification(null)}
        />
      )}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
