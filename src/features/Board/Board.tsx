import { Box } from "@mui/material";
import { styled } from "@mui/system";

import FieldRow from "./Fields/FieldRow";
import BoardSettings from "./BoardSettings";
import { useAppSelector } from "../../app/hooks";

const Board = () => {
  const map = useAppSelector((state) => state.board.map);

  return (
    <StyledWrapper display="flex">
      <BoardSettings />
      <Box>
        {map.map((row: Array<string>, index: number) => (
          <FieldRow row={row} index={index} key={index} />
        ))}
      </Box>
    </StyledWrapper>
  );
};

const StyledWrapper = styled(Box)`
  display: flex;
  > * {
    margin-right: 30px;
  }
`;

export default Board;
