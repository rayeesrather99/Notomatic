import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import SyllabusUpload from './pages/SyllabusUpload';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import ChangePasword from './pages/ChangePassword';
import { Upload } from 'lucide-react';


function App() {
  return (
    <AuthProvider> 
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/change-password' element={<ChangePasword/>} />
          <Route path="/dashboard" element={ <ProtectedRoute>   <Dashboard /> </ProtectedRoute>} />
          <Route path="/syllabus-upload" element={ <ProtectedRoute>   <SyllabusUpload /> </ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
    </AuthProvider> 
  );
}

export default App;

















// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import Dashboard from './pages/Dashboard';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import SyllabusUpload from './pages/SyllabusUpload';
// import Login from './pages/Login';
// import './index.css';

// function App() {
//   return (
//     <Router>
//       <div className="flex flex-col min-h-screen">
//         <Navbar />
//         <main className="flex-grow">
//           <Switch>
//             <Route exact path="/" component={Home} />
//             <Route path="/dashboard" component={Dashboard} />
//             <Route path="/about" component={About} />
//             <Route path="/contact" component={Contact} />
//             <Route path="/syllabus-upload" component={SyllabusUpload} />
//             <Route path="/login" component={Login} />
//           </Switch>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;

