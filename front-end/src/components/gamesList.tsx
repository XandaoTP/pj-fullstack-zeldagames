import zelda1 from "../assets/images/ZeldaNes.png"
import zeldaocarina from "../assets/images/zeldaocarina.png"

export function GamesList () {
    return (
        <section className="px-7">
            <h1>The Legend of Zelda Games</h1>
            <div className="flex justify-around gap-2v flex-wrap"> 
                <div className="bg-stone-500 w-96 justify-center m-0 flex">
                    <img src={zelda1} alt="zelda Nes" className="w-80" />
                </div>
                <div className="bg-stone-500 w-96 justify-center m-0 flex">
                    <img src={zelda1} alt="zelda Nes" className="w-80" />
                </div>
                <div className="bg-stone-500 w-96 justify-center m-0 flex">
                    <img src={zelda1} alt="zelda Nes" className="w-80" />
                </div>
                <div className="bg-stone-500 w-96 justify-center m-0 flex">
                    <img src={zelda1} alt="zelda Nes" className="w-80" />
                </div>
                <div className="bg-stone-500 w-96 justify-center flex">
                    <img src={zeldaocarina} alt="zelda Nes" className="w-80" />
                </div>
            </div>    
        </section>
    )
}