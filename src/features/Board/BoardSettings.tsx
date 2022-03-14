import { styled } from "@mui/system";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { startSession } from "./actions";
import { BOARD_LEVELS, GAME_STATES } from "./constants";

interface LevelPickerType {
  value: number;
  handleChange: (value: number) => void;
}

const LevelPicker = ({ value, handleChange }: LevelPickerType) => {
  return (
    <FormControl fullWidth>
      <InputLabel>Level</InputLabel>
      <Select
        value={value}
        onChange={(event) => handleChange(event.target.value as number)}
      >
        {BOARD_LEVELS.map((level) => (
          <MenuItem value={level.value} key={level.value}>
            {level.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const BoardSettings = () => {
  const dispatch = useAppDispatch();

  const [level, setLevel] = useState<number>(1);

  const gameState = useAppSelector((state) => state.board.gameState);

  return (
    <StyledBoardSettingsWrapper>
      {gameState !== GAME_STATES.PLAYING && (
        <Typography
          variant="h3"
          fontWeight="bold"
          color={gameState === GAME_STATES.WIN ? "success" : "error"}
        >
          {gameState}
        </Typography>
      )}
      <StyledPlayButton
        onClick={() => dispatch(startSession({ level }))}
        variant="contained"
      >
        PLAY
      </StyledPlayButton>
      <Typography>Game Settings</Typography>
      <LevelPicker value={level} handleChange={setLevel} />
    </StyledBoardSettingsWrapper>
  );
};

const StyledBoardSettingsWrapper = styled(Box)`
  width: 300px;
  text-align: center;
  > * {
    margin: 10px !important;
  }
`;

const StyledPlayButton = styled(Button)`
  width: 100%;
`;

export default BoardSettings;
