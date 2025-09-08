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

// Layout Component
import AdminLayout from '../../../../Project/ITP/src/components/AdminLayout.jsx';
import WelcomePage from '../../../../Project/ITP/src/components/WelcomePage.jsx';

// System & Authentication
import System from '../../../../Project/ITP/src/system/Systemroom.jsx';
import Systemacc from '../../../../Project/ITP/src/system/AdminRegister.jsx';
import EmailVerify from '../../../../Project/ITP/src/system/verfiy.jsx';
import AdminDashboard from '../../../../Project/ITP/src/system/AdminDashboard.jsx';
import PermissionManager from '../../../../Project/ITP/src/system/PermissionManager.jsx';
import PriceManager from '../../../../Project/ITP/src/components/PriceManager.jsx';

// Employee Management
import EmployeeList from '../../../../Project/ITP/src/Employee/EmployeeList.jsx';
import AddEmployee from '../../../../Project/ITP/src/Employee/AddEmployee.jsx';
import EditEmployee from '../../../../Project/ITP/src/Employee/EditEmployee.jsx';
import EmployeeProfile from '../../../../Project/ITP/src/Employee/EmployeeProfile.jsx';
import EmployeeDocuments from '../../../../Project/ITP/src/Employee/EmployeeDocuments.jsx';

// Feedback Management
import FeedbackPage from '../feebback/FeedbackPage.jsx';
import FeedbackHistory from '../feebback/FeedbackHistory.jsx';
import FeedbackManagement from "../feebback/FeedbackManagement.jsx";
import RepliedFeedback from "../feebback/RepliedFeedback.jsx";

// User Authentication
import Signup from '../../../../Project/ITP/src/login/Signup.jsx';
import Login from '../../../../Project/ITP/src/login/Login.jsx';
import Forgetpassword from '../../../../Project/ITP/src/login/ForgotPassword.jsx';
import ResetPassword from "../../../../Project/ITP/src/login/ResetPassword.jsx";
import VerifyReset from "../../../../Project/ITP/src/login/VerifyReset.jsx";

// Booking System
import CustomerDetails from '../../../../Project/ITP/src/booking/CustomerDetails.jsx';
import RoomList from '../../../../Project/ITP/src/booking/RoomList.jsx';
import Cart from '../../../../Project/ITP/src/booking/Cart.jsx';
import RoomRateManager from '../../../../Project/ITP/src/booking/RoomRateManager.jsx';
import BookingsPage from '../../../../Project/ITP/src/system/BookingsPage.jsx';
import PropertyDetails from '../../../../Project/ITP/src/booking/PropertyDetails.jsx';
import CancelBooking from '../../../../Project/ITP/src/booking/CancelBooking.jsx';
import BookingDetails from '../../../../Project/ITP/src/CustomerProfile/BookingDetails.jsx';

// Customer Profile
import CustomerProfile from "../../../../Project/ITP/src/CustomerProfile/CustomerProfile.jsx";
import CustomerProfileEdit from "../../../../Project/ITP/src/CustomerProfile/CustomerProfileedit.jsx";

import Home from "../../../../Project/ITP/src/Home/Homepage.jsx";

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
            <Route path="/admin-register" element={<Systemacc />} />
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