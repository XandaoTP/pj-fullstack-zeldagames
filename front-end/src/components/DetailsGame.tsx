import { FaTrash, FaPen, FaComment} from "react-icons/fa";
import { Link } from "react-router-dom";
import type { Games } from "../entities/games"
import { Loading } from './Loading';
import { useModal } from 'react-hooks-use-modal';
import { AiFillCloseCircle } from "react-icons/ai";
import {  useAxios, axios } from "../services/useAxios";
import { useEffect, useState } from "react";
import styled from "styled-components";


  
export type DetailsGameProps = Partial<Games> & {
    onDelete?: () => void | Promise<void>
    loading: boolean;
  }


export function CurrentGame ({
    id,
    title,
    subtitle,
    picture,
    content,
    onDelete,
    loading
}: DetailsGameProps) {
   

    const [,addComment] = useAxios({
        url: '/games/comments',
        method: 'pos'
        }, {
        manual: true
        })
    

    const [Modal, open, close, isOpen] = useModal('root', {
        preventScroll: true,
        focusTrapOptions: {
          clickOutsideDeactivates: true,
        },
      });

      const [{data: comments}, getComments] = useAxios<{id: number, zelda_id: number, zelda_comments: string} []> ({
        url: `/games/comments/${id}`,
        method: 'get',
      },
      {
        manual: true,
      })
      const [message, setMessage] = useState('')
      
      useEffect(() => {
        if(isOpen) {
            getComments();
        }
      }, [isOpen])
      
    
    return ( 
        <section className="px-7 bg-slate-100 rounded-3xl flex-[2] opacity-90">
            <div className="py-10 justify-center">
                    {!id ? <p>Selecione um Título</p> : ''}
                    {id !== undefined && (
                <>
                    {loading ? <Loading /> :
                    <>
                        <div className="flex justify-end gap-3">
                            <button
                            className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-1 px-2 rounded-md"
                            onClick={onDelete}
                            >
                            <FaTrash />
                            </button>
                            <Link className="bg-blue-500 text-white font-bold p-2 rounded-md" to={`/editgame/${id}`}><FaPen /></Link> <button
                            className="bg-green-500 hover:bg-green-600 text-white text-sm font-bold py-1 px-2 rounded-md mr-4"
                            onClick={open}
                            >
                            <FaComment />
                            </button>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <p>{id}</p>
                            <h2 className="font-bold justify-center" >{title}</h2>
                            <img src={picture} alt={picture} className="w-80 my-6" />
                            <h2>{subtitle}</h2>
                            <p>{content}</p>
                        </div>
                    </>
                    }
                </>
                )}
            </div>
            <Modal>
                            <div className="bg-green-300 rounded-xl flex flex-col shadow-xl p-5 max-h-[80vh] overflow-y-auto">
                                <button onClick={close} className="ml-auto text-zinc-900 "><AiFillCloseCircle /></button>
                                <h3 className="px-4 text-center">Comentários, dicas e opiniões.</h3>
                                <div className="bg-white ">
                                    {comments?.map(({ zelda_comments, id}) => (<p key={id} className="p-2 text border">{zelda_comments}</p>))}
                                </div>
                                <h3 className="px-4 text-center pt-2">Deixe aqui seu comentário, opinão ou dica sobre o jogo.</h3>
                                <form
                                    className="flex flex-col gap-2 my-4"
                                    noValidate
                                    onSubmit={async (event) => {
                                    
                                    const { data } = await axios.post("/games/comments", {
                                        gameId: id,
                                        content: message,
                                    });
                                    if (data.success) {
                                        alert("Comentário enviado com sucesso!");
                                        setMessage("");
                                        await getComments();
                                    } else {
                                        alert("Houve um erro ao enviar o comentário.");
                                    }
                                    }}
                                >
                                    <textarea
                                    placeholder="Digite o comentário"
                                    className="w-full border rounded resize-none p-2 hover:border-green-500 outline-none"
                                    value={message}
                                    onChange={(event) => setMessage( event.target.value)}
                                    autoFocus
                                    
                                    ></textarea>
                                    <BtnSend type='submit'>Enviar comentário</BtnSend>
                                </form>
                            </div>
                        </Modal>
        </section>
    )
}

const BtnSend = styled.button`
    border: 2px solid;
    padding: 0.7em;
    margin-top: 1em;
    border-radius: 25px;
    background-color: #000000;
`