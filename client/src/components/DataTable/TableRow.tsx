import { memo } from "react";

interface Props {
  row: any;
  columns: string[];
}


function TableRow({
  row,
  columns
}: Props) {

  return (
    <div className="
  flex
  w-full
  border-b
  dark:border-slate-600
">

      {columns.map(column => (
        <div
          key={column}
          className="
  flex-1
  border-r
  p-2
  dark:border-slate-600
"
        >
          {row[column]}
        </div>
      ))}

    </div>
  );
}


export default memo(TableRow);