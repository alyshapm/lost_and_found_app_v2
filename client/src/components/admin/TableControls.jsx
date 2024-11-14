import React, { useState, useRef } from "react";
import {
  Input,
  Button,
  Select,
  Option,
  Card,
  CardBody,
} from "@material-tailwind/react";
import {
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";

const TableControls = ({ onSearch, onFilterChange, onDownload, filters }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilterChange = (filterName, value) => {
    onFilterChange(filterName, value);
  };

  return (
    <Card className="mb-4">
      <CardBody className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="w-52">
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:ring-gray-900/10"
              labelProps={{
                className: "hidden",
              }}
              icon={
                <MagnifyingGlassIcon className="h-5 w-5 text-blue-gray-300" />
              }
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <Button
              className="!shadow flex items-center gap-2 bg-blue-500 hover:bg-blue-600"
              onClick={onDownload}
            >
              <ArrowDownTrayIcon strokeWidth={2} className="h-5 w-5" />
              <span className="hidden sm:inline">Download</span>
            </Button>

            <Popover
              placement="bottom-end"
              open={isFilterOpen}
              handler={() => setIsFilterOpen(!isFilterOpen)}
            >
              <PopoverHandler>
                <Button
                  className="!shadow flex items-center gap-2 bg-gray-200 text-gray-700 hover:bg-gray-300"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <AdjustmentsHorizontalIcon
                    strokeWidth={2}
                    className="h-5 w-5"
                  />
                  <span className="sr-only">Toggle Filters</span>
                </Button>
              </PopoverHandler>

              <PopoverContent className="p-4 shadow-lg border rounded-lg">
                {filters.map((filter) => (
                  <div
                    key={filter.name}
                    className="w-full sm:w-auto min-w-[140px] mb-4"
                  >
                    <Select
                      label={filter.label}
                      onChange={(value) =>
                        handleFilterChange(filter.name, value)
                      }
                    >
                      {filter.options.map((option) => (
                        <Option key={option.value} value={option.value}>
                          {option.label}
                        </Option>
                      ))}
                    </Select>
                  </div>
                ))}
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default TableControls;
