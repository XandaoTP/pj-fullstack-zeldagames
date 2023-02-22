import type { Games } from "../entities/games"

type games = {
    currentGame: Games;
  }


export function CurrentGame (props: games) {
    return ( 
        <section className="px-7 bg-slate-100 rounded-3xl">
            <div className="py-10"> 
                <h2 className="font-bold" >{props.currentGame.title}</h2>
                <img src={props.currentGame.picture} alt='title' className="w-80 my-6" />
                <h2 >{props.currentGame.description}</h2>
            </div>
        </section>
    )
}