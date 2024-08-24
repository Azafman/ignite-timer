import styled from 'styled-components'

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;
  /* como o container pai é um flex container e direction-column, flex 1 faz com que o componente tente ocupar o máximo de altura disponível */

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }
`
export const HistoryList = styled.div`
  flex: 1;
  overflow: auto; /* o scroll fica na div e não na tabela */
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;
    /* força o scroll para telas menores */

    th {
      background-color: ${(props) => props.theme['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme['gray-100']};
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
      }
      &:last-child {
        border-top-right-radius: 8px;
      }
    }

    td {
      background-color: ${(props) => props.theme['gray-700']};
      border-top: 4px solid ${(props) => props.theme['gray-800']};
      padding: 1rem;
      font-size: 0.875rem;
      //14px
      line-height: 1.6;

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }
      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`

/* const STATUS_COLORS = {
  yellow: 'yellow-500',
  green: 'green-500',
  red: 'red-500',
} */
/* da forma acima, a chave yellow, pode receber qualquer string como valor; */
const STATUS_COLORS = {
  yellow: 'yellow-500',
  green: 'green-500',
  red: 'red-500',
} as const
/* dessa outra maneira, dizemos que os valores de cada chave serão fixos e não poderão ser alterados, possibilitando assim pegar a tipagem dessa constante. */
interface StatusProps {
  statusColor: keyof typeof STATUS_COLORS
  /* status color pode ser yellow|green|red (somente). */
  /* 
  sintaxe para pegar a tipagem das propriedades de um objeto js com ts: keyof typeof objeto (constante). obs: desse modo pego a tipagem das chaves da constante, nada relacionado ao valores das mesmas.
   */
  /* 
  statusColor: keyof typeof STATUS_COLORS é a mesma coisa que: 
  statusColor: 'yellow' | 'green' | 'red';
   */
}
export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    padding: 0.25rem;
    border-radius: 9999px; /* MESMA COISA QUE 50% */
    background-color: ${(props) =>
      props.theme[STATUS_COLORS[props.statusColor]]};
  }
`
