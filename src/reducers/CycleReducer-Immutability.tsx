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
export const setCycles = (
  stateCycle: StateCycleType,
  action: ListAction,
): StateCycleType => {
  const prevState = { ...stateCycle }
  switch (action.type) {
    case 'ADD_CYCLE':
      return {
        cycles: [...prevState.cycles, action.payload.cycle],
        currentCycleId: action.payload.cycle.id,
      }

    case 'INTERRUPT_CYCLE':
      return {
        cycles: prevState.cycles.map((cycle) => {
          if (cycle.id === action.payload.cycleId) {
            return { ...cycle, interruptedDate: new Date() }
          } else {
            return cycle
          }
        }),
        currentCycleId: null,
      }

    case 'FINISHE_CYCLE':
      return {
        cycles: prevState.cycles.map((cycle) => {
          if (cycle.id === action.payload.cycleId) {
            return { ...cycle, finishedDate: new Date() }
          } else {
            return cycle
          }
        }),
        currentCycleId: null,
      }
    default:
      return { ...stateCycle }
  }
}
