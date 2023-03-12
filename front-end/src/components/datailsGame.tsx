import { FaTrash, FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { Games } from "../entities/games"

const texts = {
    deleteButton: "Deletar",
    editLink: "Editar",
  };

  
export type DetailsGameProps = Partial<Games> & {
    onDelete?: () => void | Promise<void>
  }


export function CurrentGame ({
    id,
    title,
    description,
    image,
    content,
    onDelete
}: DetailsGameProps) {


    return ( 
        <section className="px-7 bg-slate-100 rounded-3xl flex-[2] opacity-90">
            <div className="py-10 justify-center"> 
             {id !== undefined && (
            <>
                <div className="flex justify-end">
                    <button
                    className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-1 px-2 rounded-md mr-4"
                    onClick={onDelete}
                    >
                    <FaTrash />
                    </button>
                    <Link className="bg-blue-500 text-white font-bold p-2 rounded-md" to={`/editgame/${id}`}><FaPen /></Link>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <h2 className="font-bold justify-center" >{title}</h2>
                    <img src={image} alt='title' className="w-80 my-6" />
                    <h2>{description}</h2>
                </div>
            </>
                )}
            </div>
        </section>
    )
}