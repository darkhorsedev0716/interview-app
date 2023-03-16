import { createTheme, ThemeProvider } from "@mui/material/styles";

var myTheme = createTheme({
  palette: {
    primary: {
      main: '#2d53fe'
    },
    background: {
      default: '#000000'
    }
  }
})

myTheme = createTheme({
  components: {
    MuiListItem: {
      styleOverrides: {
        root:
          {
            '&.Mui-selected': {
              backgroundColor: '#2d53fe',
              color: myTheme.palette.primary.contrastText
            }
          }
      }
    }
  }
})

export default function AppThemeProvider ({ children }) {
  return (
    <ThemeProvider theme={myTheme}>
      {children}
    </ThemeProvider>
  )
}
