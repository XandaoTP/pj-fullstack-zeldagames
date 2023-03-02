import { useAxios } from "../components/useAxios";
import { TopBar } from '../components/topbar';
import { GamesList } from '../components/gamesList';
import { motion } from 'framer-motion';
import { Loading } from '../components/loading';
import { CurrentGame } from '../components/datailsGame';
import { Games } from "../entities/games";
import { useEffect, useState } from 'react';

type games = Games & {
    loading: boolean;

  }

export function Home () {
  const [plataformList, setPlataformList] = useState<games[]>([]);

  const [{data : plataformData, loading: loadingPlat, error }] = useAxios<games[]>({
    url: '/plataform',
    method:'get'

})

const [{ data: zeldaList }] = useAxios<games[]>({
    url: '/games',
    method: 'get'
    
  })

  const [{ data: currentGame, loading }, getgame] = useAxios<games>({
    method: 'get',
  },{
    manual: true
  })

  useEffect(() =>{
    if(plataformData) {
      setPlataformList(plataformData)
    }
  }, [plataformData])

  return (
    <>
      <TopBar />
      <main >
        {plataformList?.map(({id, title, description}) => 
        <li>{title}</li>)}
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