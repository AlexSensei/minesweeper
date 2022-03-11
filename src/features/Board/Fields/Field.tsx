import { memo, useCallback, useMemo } from "react";
import type { ReactElement } from "react";
import { css } from "@emotion/react";
import { Box, Theme, Typography } from "@mui/material";
import { styled } from "@mui/system";
import FlagIcon from "@mui/icons-material/Flag";
import FlareIcon from "@mui/icons-material/Flare";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { openField } from "../actions";
import { addFlag } from "../slice";
import { FIELD_VALUES } from "../constants";

const Field = memo(({ index, rowIndex, value }: any) => {
  const dispatch = useAppDispatch();

  const isFlagged = useAppSelector(
    (state) => state.board.flags[`${index}-${rowIndex}`]
  );

  const handleFieldClick = useCallback(
    (x, y) => {
      dispatch(openField({ x, y }));
    },
    [dispatch]
  );

  const handleFieldFlag = useCallback(
    (x, y) => {
      dispatch(addFlag({ x, y }));
    },
    [dispatch]
  );

  const boxValue = useMemo((): string | ReactElement => {
    if (isFlagged) {
      return <FlagIcon color="warning" />;
    }

    if (value === FIELD_VALUES.BOMB) {
      return <FlareIcon />;
    }

    return (
      <Typography fontWeight="bold">
        {isNaN(parseInt(value)) || value === FIELD_VALUES.EMPTY ? "" : value}
      </Typography>
    );
  }, [value, isFlagged]);

  return (
    <StyledBox
      key={`${index}-${rowIndex}-${value}`}
      value={value}
      onClick={() => handleFieldClick(rowIndex, index)}
      onContextMenu={(e) => {
        e.preventDefault();
        handleFieldFlag(index, rowIndex);
      }}
    >
      {boxValue}
    </StyledBox>
  );
});

export default Field;

const parseFieldColor = (fieldValue: string, theme: Theme) => {
  switch (fieldValue) {
    case FIELD_VALUES.BOMB:
      return css`
        background: ${theme.palette.error.main};
      `;
    case FIELD_VALUES.EMPTY:
      return css`
        background: ${theme.palette.secondary.main};
      `;
    case "1":
    case "2":
      return css`
        background: #a4a4a4;
        color: ${theme.palette.success.main};
      `;
    case "3":
    case "4":
    case "5":
      return css`
        background: #6f6f6f;
        color: ${theme.palette.warning.main};
      `;
    case "6":
    case "7":
    case "8":
      return css`
        background: #6f6f6f;
        color: ${theme.palette.error.main};
      `;
  }
};

const StyledBox = styled(Box)<{ value: string }>`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  margin: 1px;
  text-align: center;
  border: 2px solid ${(props) => props.theme.palette.secondary.main};
  ${(props) => parseFieldColor(props.value, props.theme as Theme)};
`;
