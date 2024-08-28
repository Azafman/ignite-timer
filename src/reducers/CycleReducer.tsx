import { produce } from 'immer'
import { Cycle } from '../@types/Cycle'

type NewCycle = {
  type: 'ADD_CYCLE'
  payload: {
    cycle: Cycle
  }
}
type InterruptCycle = {
  type: 'INTERRUPT_CYCLE'
  payload: {
    cycleId: string
  }
}
type FinisheCycle = {
  type: 'FINISHE_CYCLE'
  payload: {
    cycleId: string
    finishedAt: Date
  }
}
type ListAction = NewCycle | InterruptCycle | FinisheCycle
/* Eu poderia também usar uma abordagem similar à esta. A que é usada no redux, na definição de tipos das actions, etc. Com funções fabricas (factory), que retornam a action e type. */

export interface StateCycleType {
  cycles: Cycle[]
  currentCycleId: string | null
}

export const setCycles = produce(
  (draft: StateCycleType, action: ListAction) => {
    switch (action.type) {
      case 'ADD_CYCLE':
        draft.cycles.push(action.payload.cycle)
        draft.currentCycleId = action.payload.cycle.id
        break
      case 'INTERRUPT_CYCLE':
        draft.cycles.forEach((cycle) => {
          if (cycle.id === action.payload.cycleId) {
            cycle.interruptedDate = new Date()
            draft.currentCycleId = null
          }
        })
        break
      case 'FINISHE_CYCLE':
        draft.cycles.forEach((cycle) => {
          if (cycle.id === action.payload.cycleId) {
            cycle.finishedDate = new Date()
            draft.currentCycleId = null
          }
        })
        break
      default:
        break
    }
  },
)
/* ao chamar produce(), passamos uma função como referência, a qual contém a lógica do reducer. Sendo seu primeiro parametro o state e o segundo a action. Ao usar o dispatch do reducer, invocaremos ela. */
/* em tese:
- chame produce com uma função anônima a qual contém a lógica do reducer. Dentro dela altere os valores de estado
não mais usando o conceito de imutabilidade.
- Quanto ao demais, continue usando o dispatch (etc) de igual modo.

- Deduzo que uma boa explica seria que: produce retorna uma callback com toda a lógica de imutabilidade (convertida já), com base na callback passada como parametro na invocação (produce).
*/
