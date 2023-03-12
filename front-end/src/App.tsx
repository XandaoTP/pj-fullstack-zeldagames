
import { Routes } from 'react-router-dom';
import { Route } from 'react-router';
import { Home } from './views/home';
import { AddGame } from './views/createGame';
import { EditGame } from './views/EditGame';



function App() {
  

  return (
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/addGame' element={<AddGame />} />
        <Route path='/editgame/:id' element={<EditGame />} />
      </Routes>
    )
}

export default App;
