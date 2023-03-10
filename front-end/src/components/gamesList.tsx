import type { Games } from "../entities/games";
import {motion} from 'framer-motion';


export type GameListProps = {
    games: Games[];
    getgame: (id: number) => Promise<void>
};




export function GamesList ({ games, getgame }: GameListProps) {

    return (
        <div className="flex-[1]">
            <div>
                {games?.map(({id, title, description, image})=> 
                <div 
                key={id} 
                className="bg-white m-3 list-none min-h-[200px] min-w-[400px] rounded-xl opacity-70 "
                onClick={() => {
                getgame(id)
                } 
                
                }>  
                    <img src={image} className="w-full pointer-events-none rounded-xl" height='100%' alt={image} />
                    <div className="text-center text">{title}</div>
                    <div className='text-center'>{description}</div>
                </div>
                )}
            </div>
        </div>
    )
}
