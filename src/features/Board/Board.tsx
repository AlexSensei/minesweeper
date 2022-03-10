import { useAppSelector } from "../../app/hooks";
import { Box } from "@mui/material";
import BoardSettings from "./BoardSettings";
import styled from "@emotion/styled";

const Board = () => {
  const map = useAppSelector((state) => state.board.map);

  return (
    <StyledWrapper display="flex">
      <BoardSettings />
      <Box>
        {map.map((row, index) => (
          <Box key={index} display="flex">
            {row.map((value, rowIndex) => (
              <StyledBox key={`${index}-${rowIndex}`} value={value} />
            ))}
          </Box>
        ))}
      </Box>
    </StyledWrapper>
  );
};

const StyledWrapper = styled(Box)`
  display: grid;
  grid-column: 1 1;
`;

const StyledBox = styled(Box)<{ value: string }>`
  width: 20px;
  height: 20px;
  margin: 1px;

  border: 2px solid gray;
  background: ${(props) => (props.value !== "1" ? "blue" : "red")};
`;

export default Board;
