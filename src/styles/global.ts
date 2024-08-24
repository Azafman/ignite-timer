import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :focus {
        outline: 0;
        box-shadow: 0 0 0 2px ${(props) => props.theme['gray-500']};
    }

    body {
        background-color: ${(props) => props.theme['gray-900']};
        color: ${(props) => props.theme['gray-300']};
        -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 1rem;
    }
`

// estilos globais no styled components (aqui é possível setar estilos que abrangerão toda aplicação)
// agora é necessário somente importar <GlobalStyle /> em algum lugar dentro da aplicação
// normalmente iremos usar as variáveis do tema setado, então para isso importe o componente GlobalStyle dentro do themeProvider
