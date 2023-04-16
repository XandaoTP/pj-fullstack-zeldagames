import { useAxios } from "../services/useAxios";
import type { Games } from "../entities/games";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import styled from "styled-components";


type games = Games & {
    bg: string;

  }

const texts = {
    nextGames: 'Proximo',
    prevGames: 'Anterior'
}  

export type GameListProps = {
    games: Games[];
    getgame: (id: number) => Promise<void>;
    nextGames?: boolean;
    PrevGames?: boolean;
    onNextGames?: () => Promise<void>
    onPrevGames?: () => Promise<void>
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

  const limitGames = 4;


export function GamesList ({ getgame  }: GameListProps, nextGames = false) {
    const [gamesParams, setGamesParams] = useState({
        ...gamesOrderBy.createdAtAsc,
        limit : limitGames,
        offset: 0,
        search: undefined as string | undefined,
    })

    const onNextGames = async () => {
        const nextGames = gamesParams.offset + gamesParams.limit
        const params = {
            ...gamesParams,
            offset: nextGames, 
        }; 
        setGamesParams(params)
        getGames({
            params,
        })
    }
    const onPrevGames = async () => {
        const nextGames = gamesParams.offset - gamesParams.limit
        const params = {
            ...gamesParams,
            offset: nextGames, 
        }; 
        setGamesParams(params)
        getGames({
            params,
        })
    }

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

    const debouncedSearchGames = useCallback(debounce((params: typeof gamesParams) =>  getGames({
        params: gamesParams,
        }) , 200), [zeldaList]);
   
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
            onChange={
                (event) => {
                    const search = event.target.value;
                        const params = {
                            ...gamesParams,
                            offset: 0,
                            search,
                        };
                        setGamesParams(params);
                        debouncedSearchGames(params);
                }} />
            <select className="p-2 m-3 rounded-lg" onChange={(event) => {
                const params = {...gamesParams, 
                    offset: 0,
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
                className="bg-white m-3 list-none rounded-xl opacity-70 flex flex-col justify-center items-center"
                onClick={() => {
                getgame(id)
                } 
                
                }>  
                    <img src={picture} className="pointer-events-none rounded-xl " height='200px' width='200px'  alt={picture} />
                    <div className="text-center text">{title}</div>
                    <div className='text-center'>{content}</div>
                </div>
                )}
            </div>
            
            {nextGames && 
            <div className="flex justify-around">
                <BtnNext disabled={gamesParams.offset <= 0} onClick={onPrevGames}>{texts.prevGames}</BtnNext>
                <BtnNext disabled={gamesParams.limit + gamesParams.offset >= gamesCount} onClick={onNextGames}>{texts.nextGames}</BtnNext>
            </div>
            }
        </div> 
    )
}


const BtnNext = styled.button`
    color: #fefefe;
    border: solid;
    background-color: #0c7575;
    border-radius: 1rem;
    width: 100%;
    margin-bottom: 0.7rem;
    font-size: 1rem;
    padding: 0.3em ;
    margin: 1rem;
    :disabled{
        opacity: 80%;
        background-color: #303232;
    }
    `