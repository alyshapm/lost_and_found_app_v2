import React from "react";
import { Typography } from "@material-tailwind/react";

const BaseTable = ({ columns, data, onRowClick, actions }) => (
  <div className="overflow-x-auto">
    <table className="w-full min-w-full table-auto text-left">
      <thead>
        <tr>
          {columns.map((col, colIndex) => (
            <th
              key={`col-${colIndex}`} // Use colIndex with a unique prefix
              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                {col.header}
              </Typography>
            </th>
          ))}
          {actions && (
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Actions
              </Typography>
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={row._id || `row-${rowIndex}`}
            className="even:bg-blue-gray-50/50 cursor-pointer"
            onClick={() => onRowClick && onRowClick(row)}
          >
            {columns.map((col, colIndex) => (
              <td key={`cell-${rowIndex}-${colIndex}`} className="p-4">
                {col.render ? col.render(row[col.field], row) : row[col.field]}
              </td>
            ))}
            {actions && (
              <td className="p-4 flex space-x-2">
                {actions.map((ActionComponent, actionIndex) => (
                  <ActionComponent
                    key={`action-${rowIndex}-${actionIndex}`}
                    row={row}
                  />
                ))}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default BaseTable;
