import z from 'zod';

const title = z
  .string()
  .min(5, {
    message: 'O Title precisa ter pelo menos 5 caracteres',
  })
  const content = z
  .string()
  .min(5, {
    message: 'O conteudo precisa ter pelo menos 5 caracteres',
  })
  const picture = z
  .string()
  .min(5, {
    message: 'O conteudo precisa ter pelo menos 5 caracteres',
  })
  const subtitle = z
  .string()
  .min(5, {
    message: 'O conteudo precisa ter pelo menos 5 caracteres',
  })
  

export const gameSchema = z.object({
    title,
    content,
    picture,
    subtitle
    })
