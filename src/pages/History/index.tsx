import { useContext } from 'react'
import { HistoryContainer, HistoryList, Status } from './styles'
import { CyclesContext } from '../../contexts/CycleContext'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

export const History = () => {
  const { cycles } = useContext(CyclesContext)
  console.log(cycles)
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>
      {/* Para podermos dar scroll na tabela quando a tela diminuir, usaremos uma div em volta da tabela. Porque nativamente a tabela não permite scroll */}
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Duração</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map(
              ({
                id,
                minutesAmount,
                task,
                startDate,
                finishedDate,
                interruptedDate,
              }) => {
                return (
                  <tr key={id}>
                    <td>{task}</td>
                    <td>{minutesAmount} min</td>
                    <td>
                      {formatDistanceToNow(startDate, {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                      {/* https://date-fns.org/v3.6.0/docs/formatDistanceToNow */}
                    </td>
                    <td>
                      {finishedDate && (
                        <Status statusColor="green">Concluído</Status>
                      )}
                      {interruptedDate && (
                        <Status statusColor="red">Interrompido</Status>
                      )}
                      {!finishedDate && !interruptedDate && (
                        <Status statusColor="yellow">Em andamento</Status>
                      )}
                    </td>
                  </tr>
                )
              },
            )}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
