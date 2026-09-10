import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/filme/:id" element={<DetailsScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
