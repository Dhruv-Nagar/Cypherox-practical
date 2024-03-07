import { useState } from 'react';
import './App.css';
import { CssBaseline, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import "./assets/css/custom.css"
import Board from './pages/Board';

function App() {
  const [themeColor, setThemeColor] = useState("dark");
  const darkTheme = (color) => createTheme({
    palette: {
      mode: color || 'dark',
    },
  });
  const changeTheme = (mode) => {
    setThemeColor(mode)
  }
  return (
    <ThemeProvider theme={darkTheme(themeColor)}>
      <CssBaseline />
      <Board themeColor={themeColor} changeTheme={changeTheme} />
    </ThemeProvider>
  );
}

export default App;
