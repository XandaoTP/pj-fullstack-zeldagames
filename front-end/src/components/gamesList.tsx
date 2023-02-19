import type { Games } from "../entities/games"

export type GameListProps = {
    games: Games[];
    getgame: (id: number) => Promise<void>;
};


export function GamesList ({ games, getgame }: GameListProps) {
    return (
        <section className="px-7 flex-[1] m-4">
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
        </section>
    )
}