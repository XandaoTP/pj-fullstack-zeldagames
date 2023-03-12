import { useAxios } from "../services/useAxios";
import { TopBar } from '../components/topbar';
import { GamesList } from '../components/gamesList';
import { CurrentGame } from '../components/datailsGame';
import { Games } from "../entities/games";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



type games = Games & {
    loading: boolean;
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

const [{ data: zeldaList }] = useAxios<games[]>({
    url: '/games',
    method: 'get'
    
  })
  const [{ data: currentGame, loading = {} as Partial<Games> }, getgame] = useAxios<games>({
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
            {...currentGame}
            onDelete={async () => {
              await deleteGame({
                url: `/games/${currentGame?.id}`
              });
              alert("Jogo deletado")
              navigate('/')
            }} />   
            {zeldaList && ( 
            <GamesList 
                games={zeldaList} 
                getgame={async (id) => {
                getgame({
                  url: `/games/${id}`
                });
              } } />
              )}  
                   
    </main>          
    </>
  );
}