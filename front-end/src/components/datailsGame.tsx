import type { Games } from "../entities/games"

type games = {
    currentGame: Games;
  }


export function CurrentGame (props : games) {
    return ( 
        <section className="px-7 flex-[2]">
            <div> 
            <h2 >{props.currentGame.title}</h2>
            <img src={props.currentGame.picture} alt='title' />
            <h2 >{props.currentGame.description}</h2>
            
            </div>
        </section>
    )
}