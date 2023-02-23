import type { Games } from "../entities/games";
import {motion} from 'framer-motion';
import { useSelector } from "react-redux";


export type GameListProps = {
    games: Games[];
    getgame: (id: number) => Promise<void>
};




export function GamesList ({ games, getgame }: GameListProps) {

        const bgs = useSelector((state: any) => state.bgsReducer.bgs)
        console.log('oi',bgs.map((item: any)=> item.nome))
    
      
    return (
        <motion.div className="cursor-grab " whileTap={{cursor: 'grabbing'}} >
            <motion.div 
            className="flex"
            drag='x'
            dragConstraints={{ right: 0, left: -1520}}
            >
                {games?.map(({id, title, description, picture})=> 
                <motion.div 
                key={id} 
                className="bg-white m-3 list-none min-h-[200px] min-w-[400px] "
                onClick={() => {
                getgame(id)
                } 
                
                }>
                    <img src={picture} className="w-full pointer-events-none rounded-xl" height='90%'  alt="" />
                </motion.div>
                )}
            </motion.div>
        </motion.div>
    )
}
