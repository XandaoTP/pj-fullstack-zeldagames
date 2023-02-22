import type { Games } from "../entities/games";
import {motion} from 'framer-motion';


export type GameListProps = {
    games: Games[];
    getgame: (id: number) => Promise<void>
    oi: string;
};

type oiProps = {
    oi: string;
}

export function GamesList ({ games, getgame, oi }: GameListProps, props: oiProps) {
    console.log(props.oi)
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
                <p>{oi}</p>
            </motion.div>
        </motion.div>
    )
}

{/* <section className="px-7 flex-[1] m-4">
            {games?.map(({id, title, description, picture})=> 
            <li 
            key={id} 
            className="cursor-pointer border-spacing-44 float-right "
            onClick={() => {
            getgame(id)
            
            } }>
                <h2>{title}</h2>
                <h2>{description}</h2>
                <img src={picture} alt="" />
            </li>
        )}
        </section> */}