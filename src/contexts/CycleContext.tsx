import { ReactNode, createContext, useReducer, useState } from 'react'
import { Cycle } from '../@types/Cycle'
import { setCycles } from '../reducers/CycleReducer'

interface NewCycleForm {
  task: string
  minutesAmount: number
}
interface CyclesContextType {
  cycles: Cycle[]
  /* ao escrever um contexto ou algo de natureza similar, o Diego faz a seguinte recomendação: não é necessário definir toda a tipagem logo de início. Com o decorrer do desenvolvimento, vamos adicionando. Acredito que a lógica pode ser aplicada para outras coisas. */
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  /* ao invés de passarmos a tipagem de um React.dispatch, criamos uma função com tipagem mais simples e dentro dela chamamos o setState */
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondPassed: (seconds: number) => void
  setNewCycle: (newCycle: NewCycleForm) => void
  interruptCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CycleContextProviderProps {
  children: ReactNode
}
export const CycleContextProvider = ({
  children,
}: CycleContextProviderProps) => {
  const [stateCycle, dispatch] = useReducer(setCycles, {
    cycles: [],
    currentCycleId: null,
  }) // o interessante é que o ts gerou a tipagem do stateCycle sem eu mesmo declara-lá aqui.
  const { currentCycleId: activeCycleId, cycles } = stateCycle
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    if (activeCycleId) {
      dispatch({
        type: 'FINISHE_CYCLE',
        payload: { cycleId: activeCycleId, finishedAt: new Date() },
      })
    }
  }

  function interruptCycle() {
    if (activeCycleId) {
      dispatch({ type: 'INTERRUPT_CYCLE', payload: { cycleId: activeCycleId } })
    }
  }
  function setNewCycle(data: NewCycleForm) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setAmountSecondsPassed(0)
    dispatch({ type: 'ADD_CYCLE', payload: { cycle: newCycle } })
  }
  /* 
  - Explicação: o reducer por baixo dos panos, pelo o que eu entendi, utiliza meio que um state. O que muda é que ao invés de usar um state e setState com diferentes aplicações lógicas, utilizamos uma função que contém toda a lógica para alteração e que retorna state alterado de acordo com os parametros passados (lembre-se do switch).
  
  - Ao invés de se usar um setCycles, agora usa-se o dispatch que invoca a função reducer.

  - Inicializamos um estado no contexto e compartilhamos ele com toda a nossa aplicação usando contexto. Exportamos nossas funções de alteração para que a aplicação consiga alterar nosso estado.
  
  */
  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondPassed,
        setNewCycle,
        interruptCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
