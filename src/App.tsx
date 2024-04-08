import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './screens/Dashboard';
import BookingDetails from './screens/BookingDetails';
function App(): JSX.Element {
  // Add the routes for the Dashboard and BookingDetails components
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/details' element={<BookingDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
