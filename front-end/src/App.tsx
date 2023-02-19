import { METHODS } from 'http';
import React from 'react';
import { TopBar } from './components/topbar';
import { useAxios } from './components/useAxios';
import { GamesList } from './components/gamesList';
import { Games } from './entities/games';
import { CurrentGame } from './components/datailsGame';

type games = Games

function App() {

  const [{ data: zeldaList }] = useAxios<games[]>({
    url: '/games',
    method: 'get'
    
  })

  const [{ data: currentGame }, getgame] = useAxios<games>({
    method: 'get',
  },{
    manual: true
  })

  console.log(currentGame)
  return (
    <>
      <TopBar />
      <main className='flex flex-row mx-60'>
        {currentGame && (
      <CurrentGame currentGame={currentGame} />
      )}
      {zeldaList && ( 
      <GamesList games={zeldaList} getgame={async (id) => {
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
