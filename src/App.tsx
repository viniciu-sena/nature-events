import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/layout/Layout';
import Event from './pages/event/Event';
import Main from './pages/main/Main';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="/:id" element={<Event />} />
      </Route>
    </Routes>
  );
}

export default App;
