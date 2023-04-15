import { useAxios } from "../services/useAxios";
import type { Games } from "../entities/games";
import { useEffect, useState } from "react";



type games = Games & {
    bg: string;

  }

const texts = {
    nextGames: 'Ver mais'
}  

export type GameListProps = {
    games: Games[];
    getgame: (id: number) => Promise<void>;
    nextGames?: boolean
};

const gamesOrderBy = {
    createdAtAsc: {
      direction: "asc",
      orderBy: "created_at",
    },
    createdAtDesc: {
      direction: "desc",
      orderBy: "created_at",
    },
  };

  const limitGames = 5;


export function GamesList ({ getgame }: GameListProps, nextGames = false) {
    const [gamesParams, setGamesParams] = useState({
        ...gamesOrderBy.createdAtAsc,
        limit : limitGames,
        offset: 0,
        search: undefined as string | undefined,
    })

    const [{ data: {count : gamesCount, games: zeldaList } = 
        {
            count: 0,
            games: [],
            
        }
        }, 
            getGames] = useAxios<{count: number, games:games[]}>({
        url: '/games',
        method: 'get'
        }, {
        manual: true
        })

    
    useEffect(()=> {
        getGames({
            params: gamesParams
        });
    }, [])    
    return (
        <div className="flex-[1]">
            <div className="flex justify-between">
            <input className="m-3 bg-white text-center rounded-lg border border-black w-full text-black shadow-sm shadow-black" 
            type="text" 
            placeholder="Pesquisar"
            value={gamesParams.search}  
            onChange={event => {
                const search = event.target.value;
                    const params = {
                        ...gamesParams,
                        search,
                        offset: 0
                    };
                    setGamesParams(params)
                    
                    getGames({
                    params,
                    })

            }} />
            <select className="p-2 m-3 rounded-lg" onChange={(event) => {
                const params = {...gamesParams, 
                    offset: 0,
                    search: '',
                    ...gamesOrderBy[event.target.value as keyof typeof gamesOrderBy]}
                setGamesParams(params)
                getGames({
                    params,
                })
            }}>
                <option value='createdAtAsc' defaultChecked>Mais Antigos</option>
                <option value='createdAtDesc' >Mais recentes</option>
            </select>
            
            </div>
            <div>
                {zeldaList?.map(({id, title, content, picture})=> 
                <div 
                key={id} 
                className="bg-white m-3 list-none rounded-xl opacity-70 "
                onClick={() => {
                getgame(id)
                } 
                
                }>  
                    <img src={picture} className="min-h-[150px] min-w-[300px] pointer-events-none rounded-xl"  alt={picture} />
                    <div className="text-center text">{title}</div>
                    <div className='text-center'>{content}</div>
                </div>
                )}
            </div>
        </div>
    )
}
