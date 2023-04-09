import type { Games } from "../entities/games";


export type GameListProps = {
    games: Games[];
    getgame: (id: number) => Promise<void>
};




export function GamesList ({ games, getgame }: GameListProps) {

    return (
        <div className="flex-[1]">
            <div>
                {games?.map(({id, title, content, picture})=> 
                <div 
                key={id} 
                className="bg-white m-3 list-none min-h-[200px] min-w-[400px] rounded-xl opacity-70 "
                onClick={() => {
                getgame(id)
                } 
                
                }>  
                    <img src={picture} className="w-full pointer-events-none rounded-xl" height='100%' alt={picture} />
                    <div className="text-center text">{title}</div>
                    <div className='text-center'>{content}</div>
                </div>
                )}
            </div>
        </div>
    )
}
