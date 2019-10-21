import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#53845C'
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
  }
});

export default theme;
