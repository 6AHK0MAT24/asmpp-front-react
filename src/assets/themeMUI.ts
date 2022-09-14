import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(105, 65, 198)',
    },
    secondary: {
      main: '#fff',
    },
    info: {
      main: 'rgb(52, 64, 84)',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
})

export default theme
