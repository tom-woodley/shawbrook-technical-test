import { Route, Routes } from 'react-router-dom';
import UserForm from '../components/UserForm/UserForm';
import CardDisplay from '../components/CardDisplay/CardDisplay';

function Router() {
  return (
    <Routes>
      <Route path="/" index element={<UserForm />} />
      <Route path="complete" index element={<CardDisplay />} />
    </Routes>
  );
}

export default Router;
