import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './screens/Dashboard';
import BookingDetails from './screens/BookingDetails';
import Error404 from './screens/Error404';
function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/details' element={<BookingDetails />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
