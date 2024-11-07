import React from "react";
import { Typography } from "@material-tailwind/react";

const BaseTable = ({ columns, data, onRowClick, actions }) => (
  <table className="w-full min-w-max table-auto text-left">
    <thead>
      <tr>
        {columns.map((col) => (
          <th
            key={col.field}
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
      {data.map((item) => (
        <tr
          key={item.id}
          className="even:bg-blue-gray-50/50 cursor-pointer"
          onClick={() => onRowClick && onRowClick(item)}
        >
          {columns.map((col) => (
            <td key={col.field} className="p-4">
              {col.render ? col.render(item[col.field], item) : item[col.field]}
            </td>
          ))}
          {actions && (
            <td className="p-4 flex space-x-2">
              {actions.map((ActionComponent, index) => (
                <ActionComponent key={index} item={item} />
              ))}
            </td>
          )}
        </tr>
      ))}
    </tbody>
  </table>
);

export default BaseTable;
