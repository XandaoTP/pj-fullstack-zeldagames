import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAxios } from "../services/useAxios";


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

  const initialCreateGameState = {
    title: "",
    description: "",
    content: "",
    image: ""
  }

  export function AddGame()  {
    const [form, setForm] = useState(initialCreateGameState);
    const [disable, setDisable] = useState(false);
    const navigate = useNavigate()
    const [, addGame] = useAxios(
        {
            url:'/games',
            method: 'post',
            data: form,
        },
        {
            manual: true
        }    
    );

    return  (
    <section className="flex flex-col gap-3 m-3 justify-center w-6/12 md:max-w-screen-lg lg:mx-auto opacity-75">
      <div className="bg-gray-300 rounded-lg shadow-lg p-4 flex flex-col gap-2">
        <h2 className="text-2xl text-center font-bold">{texts.title}</h2>
        <input
          type="text"
          disabled={disable}
          className="border border-black rounded-lg py-1 px-2 w-full text-black opacity-100"
          placeholder={texts.titleFieldPlaceholder}
          value={form.title}
          onChange={(event) => setForm({ ...form, title: event.target.value })}
        />
        <input
          type="text"
          disabled={disable}
          className="border  border-black rounded-lg py-1 px-2 w-full"
          placeholder={texts.descriptionFieldPlaceholder}
          value={form.description}
          onChange={(event) =>
            setForm({ ...form, description: event.target.value })
          }
        />
        <input
          type="text"
          disabled={disable}
          className="border border-black rounded-lg py-1 px-2 w-full"
          placeholder={texts.contentImage}
          value={form.image}
          onChange={(event) =>
            setForm({ ...form, image: event.target.value })
          }
        />
        <textarea
          rows={5}
          disabled={disable}
          className="border border-black rounded-lg py-1 px-2 w-full resize-none"
          placeholder={texts.contentFieldPlaceholder}
          value={form.content}
          onChange={(event) =>
            setForm({ ...form, content: event.target.value })
          }
        />
        <button
        className='text-black rounded-md bg-lime-900'
          disabled={disable}
          onClick={async () => {
            await addGame();
            setDisable(true);
            setForm(initialCreateGameState);
            alert(texts.submitSuccess);
            navigate("/");
          }}
        >
          {texts.submitButton}
        </button>
      </div>
    </section>
  );
};
