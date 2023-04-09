import { useAxios } from "../services/useAxios";
import { TopBar } from '../components/topbar';
import { GamesList } from '../components/gamesList';
import { CurrentGame } from '../components/datailsGame';
import { Games } from "../entities/games";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../components/loading';



type games = Games & {
    bg: string;

  }

export function Home () {
  const [plataformList, setPlataformList] = useState<games[]>([]);

  const [{data : plataformData, loading: loadingPlat, error }] = useAxios<games[]>({
    url: '/plataform',
    method:'get'

})

const [, deleteGame] = useAxios(
  {
    method: "delete",
  },
  {
    manual: true,
  }
);


  const [{ data: currentGame, loading }, getgame] = useAxios<games>({
    method: 'get',
  },{
    manual: true
  })
  
  
  const navigate = useNavigate()


  return (
    <>
      <TopBar />
      <main className="m-0 p-0 flex flex-row"> 
            <CurrentGame
            loading={loading}
            {...currentGame}
            onDelete={async () => {
              await deleteGame({
                url: `/games/${currentGame?.id}`
              });
              alert("Jogo deletado")
              navigate('/')
            }} /> 
             
            <GamesList 
          getgame={async (id) => {
            getgame({
              url: `/games/${id}`
            });
          } } games={[]} />        
    </main>          
    </>
  );
}