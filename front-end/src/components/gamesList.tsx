import { useAxios } from "../services/useAxios";
import type { Games } from "../entities/games";
import { useEffect, useState } from "react";
import { TypeOf } from "zod";


type games = Games & {
    bg: string;

  }

export type GameListProps = {
    games: Games[];
    getgame: (id: number) => Promise<void>
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



export function GamesList ({ getgame }: GameListProps) {
    const [gamesParams, setGamesParams] = useState(gamesOrderBy.createdAtAsc)

    const [{ data: zeldaList }, getGames] = useAxios<games[]>({
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
            <select className="p-2 m-3 justify-center" onChange={(event) => {
                const params = gamesOrderBy[event.target.value as keyof typeof gamesOrderBy]
                setGamesParams(params)
                getGames({
                    params,
                })
            }}>
                <option value='createdAtAsc' defaultChecked>Mais Antigos</option>
                <option value='createdAtDesc' >Mais recentes</option>
            </select>
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
