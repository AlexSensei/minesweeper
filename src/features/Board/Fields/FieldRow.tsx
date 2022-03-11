import { memo } from "react";
import { Box } from "@mui/material";

import Field from "./Field";

interface FieldRowType {
  row: Array<string>;
  index: number;
}

const FieldRow = memo(({ row, index }: FieldRowType) => (
  <Box display="flex">
    {row.map((value: any, rowIndex: number) => (
      <Field
        index={index}
        rowIndex={rowIndex}
        value={value}
        key={`${index}-${rowIndex}`}
      />
    ))}
  </Box>
));

export default FieldRow;
