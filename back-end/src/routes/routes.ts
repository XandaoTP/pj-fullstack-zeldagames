import express from 'express';
import { Games } from '../entities/games';

export const gameList = express.Router();

const exampleGame: Games = {
    title: "The legend of Zelda Breath of the Wild",
    description: "The Legend of Zelda: Breath of the Wild (ゼルダの伝説 ブレス オブ ザ ワイルド Zeruda no Densetsu: Buresu obu za Wairudo?) é um jogo eletrônico de ação-aventura desenvolvido pela Nintendo Entertainment Planning & Development e publicado pela Nintendo. É o décimo nono título da série The Legend of Zelda e foi lançado mundialmente para Wii U e Nintendo Switch em 3 de março de 2017. A história segue Link, que acorda em uma Hyrule devastada após cem anos de sono e precisa recuperar suas memórias e derrotar o mal causado por Calamity Ganon. A jogabilidade é apresentada em um mundo aberto e os jogadores podem explorá-lo livremente, completando diferentes tipos de missões e resolvendo quebra-cabeças para a obtenção de recompensas.O desenvolvimento de Breath of the Wild começou pouco depois da estreia de The Legend of Zelda: Skyward Sword e durou cinco anos. A equipe tinha a intenção de reinventar a estrutura da série, assim introduziram elementos inéditos como um motor de física detalhado, visuais em alta definição e dublagem. O mundo de jogo foi projetado para recompensar exploração e experimentação, com a história sendo pensada para poder ser completada de forma não-linear. Breath of the Wild originalmente tinha previsão de lançamento para 2015 como um exclusivo de Wii U, porém foi adiado duas vezes por problemas de desenvolvimento. Ele acabou servindo como um dos títulos de lançamento do Switch e o último jogo publicado pela Nintendo para o Wii U.Breath of the Wild foi aclamado pela crítica ao ser lançado, sendo elogiado pela profundidade de sua jogabilidade de mundo aberto e atenção aos detalhes, com diversas publicações especializadas o considerando como um dos melhores jogos eletrônicos de todos os tempos, com as únicas críticas sendo direcionada para pequenos problemas técnicos na época da estreia. Dois conteúdos para download intitulados The Master Trials e The Champions' Ballad foram lançados alguns meses depois, adicionando novos modos de jogo, itens, quebra-cabeças, desafios e elementos de história. Breath of the Wild venceu vários prêmios, incluindo muitos de jogo do ano. Além disso, foi um grande sucesso comercial, com mais de vinte milhões de cópias vendidas mundialmente.",
    picture: "https://1.bp.blogspot.com/-dWeC85Kg0Mg/WLgNmgUtM1I/AAAAAAAAVcE/kzy3_0QzVRUVAjEc8YWUKxLNrPS83CX7ACLcB/s640/zelda-breath-wild-capa.png",
    createdAt: new Date(),
    content: `
    Jogo mais recente da franquia, lançado para nintendo switch e nintendo wiiU
  `,
};

const exampleGameList: Games[] = new Array(5).fill(exampleGame);

const exampleGamesAppear = exampleGameList.reduce(
    (stack, item, index) => {
      stack[index.toString()] = { id: index, ...item };
      return stack;
    },
    {} as { [key: string]: Games }
  );
  

  gameList.get("/", (req, res) => {
    res.status(200).json(Object.values(exampleGamesAppear));
  });

  gameList.get("/:id", (req, res) => {
    res.status(200).json(exampleGamesAppear[req.params.id]);
  });