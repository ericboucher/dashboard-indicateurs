import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Dashboard } from './components/Dashboard';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2E7D32', // Green color for ecological theme
    },
    secondary: {
      main: '#00796B',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
