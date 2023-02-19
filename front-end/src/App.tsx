import { TopBar } from './components/topbar';
import { useAxios } from './components/useAxios';
import { GamesList } from './components/gamesList';
import { Games } from './entities/games';
import { CurrentGame } from './components/datailsGame';
import { useEffect } from 'react';
import { Loading } from './components/loading';


type games = Games & {
  loading: boolean;
}

function App() {

  const [{ data: zeldaList }] = useAxios<games[]>({
    url: '/games',
    method: 'get'
    
  })

  const [{ data: currentGame, loading }, getgame] = useAxios<games>({
    method: 'get',
  },{
    manual: true
  })


  return (
    <>
      <TopBar />
      <main className='flex flex-row mx-80'>
        {loading ? <Loading/>  :
        currentGame && (
        <CurrentGame currentGame={currentGame} />
        )}
        
      {zeldaList && ( 
      <GamesList games={zeldaList}  getgame={async (id) => {
              getgame({
                url: `/games/${id}`
              });
            } } />
            )}
      </main>
    </>
  );
}

export default App;
