import { TopBar } from './components/topbar';
import { useAxios } from './components/useAxios';
import { GamesList } from './components/gamesList';
import { Games } from './entities/games';
import { CurrentGame } from './components/datailsGame';
import { useEffect, useState, useRef } from 'react';
import { Loading } from './components/loading';
import { motion } from 'framer-motion';


type games = Games & {
  loading: boolean;
  oi: string;
}



function App() {
  const oi = 'oiasdasdasd'

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
      <main >
        <motion.section className='mx-auto my-20 flex flex-col w-full max-w-4xl justify-center overflow-hidden'>
            {zeldaList && ( 
            <GamesList games={zeldaList} getgame={async (id) => {
                getgame({
                  url: `/games/${id}`
                });
              } } />
              )}
        </motion.section>
        <section className='mx-auto my-10 py-6 items-center flex flex-col w-full max-w-4xl justify-center h-full'>      
              {loading ? <Loading />  :
              currentGame && (
              <CurrentGame currentGame={currentGame} />
          )}
        </section >
    </main>          
    </>
  );
}

export default App;
