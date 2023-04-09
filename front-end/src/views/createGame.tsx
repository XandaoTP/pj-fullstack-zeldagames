import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAxios } from "../services/useAxios";
import { useZorm } from 'react-zorm';
import { gameSchema } from '../GamesSchema';
import { ErrorMsg } from '../components/errormsg';



const texts = {
    title: "Adicionar Jogo",
    titleFieldPlaceholder: "Título",
    descriptionFieldPlaceholder: "Descrição",
    contentFieldPlaceholder: "Conteúdo",
    contentImage: "Url da Imagem",
    submitButton: "Adicionar",
    submitSuccess: "O Jogo foi adicionado com sucesso!",
    submitFailure: "Houve um erro ao adicionar jogo",
  };



  export function AddGame()  {
    const gameForm = useZorm('add-game', gameSchema, {
      async onValidSubmit(event){
        event.preventDefault()
      await addGame({
        data: event.data
      });
      setDisable(true);
      alert(texts.submitSuccess);
      navigate("/");
      }
    })
    const [disable, setDisable] = useState(false);
    const navigate = useNavigate()
    const [, addGame] = useAxios(
        {
            url:'/games',
            method: 'post',
        },
        {
            manual: true
        }    
    );

    return  (
    <section className="flex flex-col gap-3 m-3 justify-center w-6/12 md:max-w-screen-lg lg:mx-auto opacity-75">
      <form ref={gameForm.ref} className="bg-gray-300 rounded-lg shadow-lg p-4 flex flex-col gap-2">
        <h2 className="text-2xl text-center font-bold">{texts.title}</h2>
        <input
          type="text"
          disabled={disable}
          className="border border-black rounded-lg py-1 px-2 w-full text-black opacity-100"
          placeholder={texts.titleFieldPlaceholder}
          name={gameForm.fields.title()}
        />
        {gameForm.errors.title((event) => <ErrorMsg message={event.message} />)}
        <input
          type="text"
          disabled={disable}
          className="border  border-black rounded-lg py-1 px-2 w-full"
          placeholder={texts.descriptionFieldPlaceholder}
          
        />
        <input
          type="text"
          disabled={disable}
          className="border border-black rounded-lg py-1 px-2 w-full"
          placeholder={texts.contentImage}
        />
        <textarea
          rows={5}
          disabled={disable}
          className="border border-black rounded-lg py-1 px-2 w-full resize-none"
          placeholder={texts.contentFieldPlaceholder}
        />
        <button
          className='text-black rounded-md bg-lime-900'
          disabled={disable}
          type='submit'
        >
          {texts.submitButton}
        </button>
      </form>
    </section>
  );
};
