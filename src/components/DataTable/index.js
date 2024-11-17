import { useMemo, useState } from "react";
import { ROW_COLUMNS, ROW_DATA } from "../../utils/constant";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import Search from "../UI-components/Search";
import CustomSelect from "../UI-components/CustomSelect";

function DataTable() {
  const data = useMemo(() => ROW_DATA, []);
  const columns = useMemo(() => ROW_COLUMNS, []);
  const [filterRole, setFilterRole] = useState([]);

  const customFilterRole = (row, columnId, value) => {
    return row.getValue(columnId) === value;
  };
  const tanTable = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    state: {
      filterRole,
    },
    onCustomFilterRoleChange: setFilterRole,
    filterFns: {
      role: customFilterRole,
    },
  });

  return (
    <>
      <div class="flex justify-center">
        <div class="w-2/5 flex items-end">
          <Search />
        </div>
        <div class="w-2/5">
          <CustomSelect
            onChange={(e) => tanTable.setFilterRole()}
            options={["admin", "user", "guest"]}
            value={filterRole}
            label="Role"
          />
        </div>
        <div class="w-20">
          <CustomSelect
            options={[5, 10, 20]}
            value={tanTable.getState().pagination.pageSize}
            label="Per Page"
            onChange={(e) => tanTable.setPageSize(Number(e.target.value))}
          />
        </div>
      </div>
      <div class="relative overflow-x-auto sm:rounded-lg">
        <table class="w-11/12 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mx-auto mt-10">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {tanTable.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    class="px-6 py-3"
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {tanTable.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4">
                    {cell.column.id === "profile" ? (
                      <img
                        src={cell.getValue()} // Render the profile image
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext()) // Render other cells normally
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DataTable;
