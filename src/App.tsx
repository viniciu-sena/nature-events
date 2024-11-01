import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/layout/Layout';
import Main from './pages/main/Main';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Main />} />
      </Route>
    </Routes>
  );
}

export default App;
