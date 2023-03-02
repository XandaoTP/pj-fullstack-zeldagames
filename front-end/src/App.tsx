
import { Routes } from 'react-router-dom';
import { Route } from 'react-router';
import { Home } from './views/home';



function App() {
  

  return (
      <Routes>
        <Route path='/' element={<Home />}/>
      </Routes>
    )
}

export default App;
