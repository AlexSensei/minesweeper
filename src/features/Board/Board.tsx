import { Box, Dialog } from "@mui/material";
import { styled } from "@mui/system";

import FieldRow from "./Fields/FieldRow";
import BoardSettings from "./BoardSettings";
import { useAppSelector } from "../../app/hooks";
import { GAME_STATES } from "./constants";

const Board = () => {
  const map = useAppSelector((state) => state.board.map);
  const gameState = useAppSelector((state) => state.board.gameState);

  return (
    <StyledWrapper display="flex" fieldsRowCount={map[0]?.length}>
      {map.length ? (
        <BoardWrapper>
          {map.map((row: Array<string>, index: number) => (
            <FieldRow row={row} index={index} key={index} />
          ))}
        </BoardWrapper>
      ) : (
        <BoardSettings />
      )}
      <Dialog open={gameState !== GAME_STATES.PLAYING} onClose={() => {}}>
        <DialogContentWrapper>
          <BoardSettings />
        </DialogContentWrapper>
      </Dialog>
    </StyledWrapper>
  );
};

const BoardWrapper = styled(Box)``;

const DialogContentWrapper = styled(Box)`
  width: 350px;
  margin-left: 25px;
`;

const StyledWrapper = styled(Box)<{ fieldsRowCount: number }>`
  display: flex;
  justify-content: ${(props) =>
    props.fieldsRowCount * 30 > window.innerWidth ? "flex-start" : "center"};
  > * {
    margin-right: 30px;
  }
`;

export default Board;
