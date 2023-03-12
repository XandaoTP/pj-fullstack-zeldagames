import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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

  const initialEditGameState = {
    title: "",
    description: "",
    content: "",
    image: ""
  }
  
  export function EditGame() {
    const navigate = useNavigate();
    const [form, setForm] = useState(initialEditGameState);
    const [disable, setDisable] = useState(false);
    const { id } = useParams();
    const [{ data: gameData }, getGame] = useAxios(
      {
        url: `/games/${id}`,
        method: "get",
      },
      {
        manual: true,
      }
    );
  
    const [, editGame] = useAxios(
      {
        url: `/games/${id}`,
        method: "patch",
        data: form,
      },
      {
        manual: true,
      }
    );
  
    useEffect(() => {
        getGame();
    }, []);
  
    useEffect(() => {
      if (gameData) {
        setForm(gameData);
      }
    }, [gameData]);
  
    return (
        <section className="flex flex-col gap-4 m-4 md:max-w-screen-lg lg:mx-auto bg">
        <div className="bg-black rounded-lg shadow-lg p-4 flex flex-col gap-2">
          <h2 className="text-2xl text-center font-bold">{texts.title}</h2>
          <input
            type="text"
            disabled={disable}
            className="border border-gray-300 rounded-lg py-1 px-2 w-full"
            placeholder={texts.titleFieldPlaceholder}
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
          />
          <input
            type="text"
            disabled={disable}
            className="border border-gray-300 rounded-lg py-1 px-2 w-full"
            placeholder={texts.descriptionFieldPlaceholder}
            value={form.description}
            onChange={(event) =>
              setForm({ ...form, description: event.target.value })
            }
          />
          <input
            type="text"
            disabled={disable}
            className="border border-gray-300 rounded-lg py-1 px-2 w-full"
            placeholder={texts.contentImage}
            value={form.image}
            onChange={(event) =>
              setForm({ ...form, image: event.target.value })
            }
          />
          <textarea
            rows={5}
            disabled={disable}
            className="border border-gray-300 rounded-lg py-1 px-2 w-full resize-none"
            placeholder={texts.contentFieldPlaceholder}
            value={form.content}
            onChange={(event) =>
              setForm({ ...form, content: event.target.value })
            }
          />
          <button
            disabled={disable}
            onClick={async () => {
              await editGame();
              setDisable(true);
              setForm(initialEditGameState);
              alert(texts.submitSuccess);
              navigate("/");
            }}
          >
            {texts.submitButton}
          </button>
        </div>
      </section>
    );
  }
  