import Image from "next/image";
import React from "react";

function Table({ columns, rows }) {
  return (
    <table className="app-table w-full max-w-full border-spacing-0 border-gray-50 bg-gray-100 text-black">
      <thead className="app-table-header table-header-group border-inherit bg-gray-400 align-middle">
        <tr className="app-table-row table-row border-inherit align-middle">
          <TableColumns columns={columns} />
        </tr>
      </thead>
      <tbody className="app-table-body table-row-group h-[500px] w-full overflow-auto border-inherit">
        {rows?.map((row, index) => {
          return <TableRow key={index} row={row} />;
        })}
      </tbody>
    </table>
  );
}

function TableColumns({ columns }) {
  return (
    <>
      <th className="app-table-cell">{columns[0]}</th>
      <th className="app-table-cell">{columns[1]}</th>
      <th className="app-table-cell">{columns[2]}</th>
      <th className="app-table-cell">{columns[3]}</th>
      <th className="app-table-cell">{columns[4]}</th>

    </>
  );
}

function TableRow({ row }) {
  const rowCells = Object.keys(row);
  return (
    <tr className="app-table-row table-row border-inherit align-middle">
      {rowCells?.map((item, index) => {
        return (
          <td key={item + "_" + index} className="app-table-cell">

            {item === "avatar" ? <Image width={50} height={50} className="rounded-full" src={row[item]} alt="avatar"/>:row[item]}
            
          </td>
        );
      })}
    </tr>
  );
}

export default Table;
