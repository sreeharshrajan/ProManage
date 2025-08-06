// src/App.tsx
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<div className='bg-amber-500'>Home</div>} />
      <Route path="/login" element={<div>Login</div>} />
    </Routes>
  );
}

export default App;
