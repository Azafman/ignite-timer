import styled from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'sucess'

interface ButtonContainerProps {
  variant: ButtonVariant
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 400px;
  height: 100px;
  color: white;
  border: 0;
  margin: 0 10px;
  border-radius: 6px;

  background-color: ${(props) => props.theme['green-500']};
  /* o styled components possibilita o acesso ao tema setado no ThemeProvider, da forma acima. */
`
