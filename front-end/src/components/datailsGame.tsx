import type { Games } from "../entities/games"
import { GameListProps } from "./gamesList";
import { useAxios } from "./useAxios";


interface ChildProps {
    currentGame: Games;
  }


export function CurrentGame (props : ChildProps) {
    return ( 
        <section className="px-7 flex-[2]">
            <div> 
            <h2 >{props.currentGame.id}</h2>
            <img src={props.currentGame.picture} />
            <h2 >{props.currentGame.description}</h2>
            
            </div>
        </section>
    )
}