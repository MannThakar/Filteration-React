import { useEffect, useRef } from "react";
import CustomSelect from "../UI-components/CustomSelect";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  GENDER_OPETIONS,
  PAGE_SIZE_OPTIONS,
  ROLE_OPTIONS,
  STATUS_OPTIONS,
} from "../../utils/constant";
const MultipleDropDown = ({
  onTogglePopOver,
  popoverPosition,
  buttonRef,
  popoverRef,
  popover,
  handleStatusFilterChange,
  handleRoleFilterChange,
  filterRole,
  filterStatus,
  handlePageSizeChange,
  perPageValue,
}) => {
  const popoverContainerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverContainerRef.current &&
        !popoverContainerRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        onTogglePopOver();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [buttonRef, onTogglePopOver]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
        onClick={onTogglePopOver}
      >
        <BsThreeDotsVertical className="h-5 w-5" />
      </button>

      {popover && (
        <div
          ref={(node) => {
            popoverRef.current = node;
            popoverContainerRef.current = node;
          }}
          role="tooltip"
          className="absolute z-10 w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-lg dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
          style={{
            top: `${popoverPosition.top}px`,
            left: `${popoverPosition.left}px`,
            opacity: 1,
          }}
        >
          <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
            <h3 className="font-semibold text-gray-700 dark:text-white">
              View Options
            </h3>
          </div>

          <div className="px-4 py-3 space-y-3">
            <CustomSelect
              onChange={(e) => handleRoleFilterChange(e.target.value)}
              options={ROLE_OPTIONS}
              value={filterRole}
              label="Role"
            />
            <CustomSelect
              options={STATUS_OPTIONS}
              label="Status"
              value={filterStatus}
              onChange={(e) => handleStatusFilterChange(e.target.value)}
            />
            <CustomSelect
              options={PAGE_SIZE_OPTIONS}
              label="Per Page"
              onChange={(e) => handlePageSizeChange(e.target.value)}
              value={perPageValue}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MultipleDropDown;
