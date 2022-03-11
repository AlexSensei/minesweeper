import { Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import Board from "./features/Board/Board";

function App() {
  return (
    <MainWrapper>
      <Typography fontWeight="bold" variant="h2" align="center">
        Minesweeper
      </Typography>
      <Board />
    </MainWrapper>
  );
}

const MainWrapper = styled(Box)``;

export default App;
