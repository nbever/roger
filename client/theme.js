import { createMuiTheme } from '@material-ui/core/styles';

export const PRIMARY = '#53845C';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: PRIMARY
    },
    secondary: {
      main: '#70A9A1'
    },
    background: {
      paper: '#11343F',
      default: '#0B2027'
    },
    text: {
      primary: "rgba(255, 255, 255, 0.87)"
    }
  },
  typography: {
    fontFamily: 'Copperplate'
  }
});

export default theme;
