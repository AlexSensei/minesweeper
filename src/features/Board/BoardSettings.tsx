import styled from "@emotion/styled";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";

import { useAppDispatch } from "../../app/hooks";
import { startSession } from "./actions";
import { BOARD_LEVELS } from "./constants";

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
          <MenuItem value={level.value}>{level.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const BoardSettings = () => {
  const [level, setLevel] = useState<number>(1);

  const dispatch = useAppDispatch();
  return (
    <StyledBoardSettingsWrapper>
      <StyledPlayButton
        onClick={() => dispatch(startSession({ level }))}
        variant="contained"
      >
        PLAY
      </StyledPlayButton>

      <LevelPicker value={level} handleChange={setLevel} />
    </StyledBoardSettingsWrapper>
  );
};

const StyledBoardSettingsWrapper = styled(Box)`
  max-width: 200px;
  > * {
    margin: 10px !important;
  }
`;

const StyledPlayButton = styled(Button)`
  width: 200px;
`;

export default BoardSettings;
