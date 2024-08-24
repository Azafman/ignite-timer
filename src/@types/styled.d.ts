import 'styled-components' // sem importar o styled components eu estaria reescrevendo toda a tipagem do styled components, porém com ela estamos sobrescrevendo uma propriedade
import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme // ThemeType recebe a tipagem de defaultTheme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {} // sobrescrevendo somente DefaultTheme
  // a interface DefaultTheme, é acesssível nos arquivos .ts (styled-components (props) => props.theme)
  // desse modo estou sobrescrevendo a interface e agora consigo acessa-lá em qualquer arquivo styled component com a tipagem de defaultTheme
  // (({theme}) => theme.primary)
}

// a extensão .d.ts é somente para definir tipos em typescript
