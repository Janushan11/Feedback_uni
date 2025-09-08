import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

// Add Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css';

// Import responsive utilities
import '../../../../Project/ITP/src/CSS/responsive-utilities.css';

// Import Responsive Provider
import { ResponsiveProvider } from '../../../../Project/ITP/src/components/ResponsiveWrapper.jsx';

import Navigation from '../../../../Project/ITP/src/Navigation/Navigation.jsx';
import Footer from '../../../../Project/ITP/src/Footer/Footer.jsx';






// Feedback Management
import FeedbackPage from '../feebback/FeedbackPage.jsx';
import FeedbackHistory from '../feebback/FeedbackHistory.jsx';
import FeedbackManagement from "../feebback/FeedbackManagement.jsx";
import RepliedFeedback from "../feebback/RepliedFeedback.jsx";




function App() { 
  return (
    <ResponsiveProvider>
      <Router>
        <Navigation />
        <Routes>
          {/* Public & Customer Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/feedbackHistory" element={<FeedbackHistory />} />

          
          {/* Welcome Page - First page after login */}
          <Route path="/welcome" element={<WelcomePage />} />
          
          {/* Admin Routes with Shared Layout */}
          <Route element={<AdminLayout />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/verify-email" element={<EmailVerify />} />
            <Route path="/feedback-management" element={<FeedbackManagement />} />
            <Route path="/replied-feedback" element={<RepliedFeedback />} />
            <Route path="/rate-manager" element={<RoomRateManager />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </ResponsiveProvider>
  );
}

export default App;