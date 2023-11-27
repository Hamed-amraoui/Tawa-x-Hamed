import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import { Provider } from 'react-redux';
import store from './redux/store';
import SignupPage from './pages/Signup';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
