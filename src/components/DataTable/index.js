import { useMemo, useState, useRef, useEffect } from "react";
import { ROW_COLUMNS, ROW_DATA } from "../../utils/constant";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import Search from "../UI-components/Search";
import MultipleDropDown from "../UI-components/MultipleDropDown";
import { useSearchParams } from "react-router-dom";

function DataTable() {
  const data = useMemo(() => ROW_DATA, []);
  const columns = useMemo(() => ROW_COLUMNS, []);
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [popover, setPopover] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const [search, setSearch] = useState("");
  const [param, setParam] = useSearchParams();
  const newParam = new URLSearchParams(param);
  const pageSize = param.get("pageSize");
  const role = param.get("role");
  const paramStatus = param.get("status");
  const popoverRef = useRef(null);
  const buttonRef = useRef(null);

  const tanTable = useReactTable({
    data,
    columns,
    state: {
      filterRole,
      filterStatus,
      globalFilter: search,
    },
    onFilterRoleChange: setFilterRole,
    onFilterStatusChange: setFilterStatus,
    onGlobalFilterChange: setSearch,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  const handleRoleFilterChange = (value) => {
    const allValues = value === "All" ? null : value;
    setFilterRole(allValues);
    tanTable.getColumn("role")?.setFilterValue(allValues);
    newParam.set("role", allValues);
    setParam(newParam);
  };
  const handleStatusFilterChange = (value) => {
    const allValues = value === "All" ? null : value === "True" ? true : false;
    setFilterStatus(allValues);
    tanTable.getColumn("status")?.setFilterValue(allValues);
    newParam.set("status", allValues);
    setParam(newParam);
  };

  const togglePopOver = () => {
    setPopover((prev) => !prev);

    if (!popover) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setPopoverPosition({
        top: buttonRect.bottom + window.scrollY,
        left: buttonRect.left + window.scrollX,
      });
    }
  };

  const handlePageSizeChange = (e) => {
    tanTable.setPageSize(e);
    newParam.set("pageSize", e);
    setParam(newParam);
  };

  useEffect(() => {
    if (role) {
      setFilterRole(role);
    }
    if (paramStatus) {
      const camelCase =
        paramStatus.charAt(0).toUpperCase() + paramStatus.slice(1);
      setFilterStatus(camelCase);
    }
    if (pageSize) {
      tanTable.setPageSize(pageSize);
    }
  }, []);

  return (
    <>
      <div className="flex space-x-3 justify-center mt-20 mb-5">
        <div className="w-2/5 flex items-end">
          <Search setSearch={setSearch} />
        </div>
        <div className="flex justify-center items-center">
          <MultipleDropDown
            onTogglePopOver={togglePopOver}
            popoverPosition={popoverPosition}
            buttonRef={buttonRef}
            popover={popover}
            popoverRef={popoverRef}
            handleStatusFilterChange={handleStatusFilterChange}
            handleRoleFilterChange={handleRoleFilterChange}
            filterRole={filterRole}
            filterStatus={filterStatus}
            handlePageSizeChange={handlePageSizeChange}
            perPageValue={tanTable.getState().pagination.pageSize}
          />
        </div>
      </div>

      <div className="relative max-h-[600px] overflow-auto w-11/12 mx-auto">
        <table className="min-w-[800px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 w-full mx-auto">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {tanTable.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3"
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
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4">
                    {cell.column.id === "profilePic" ? (
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
