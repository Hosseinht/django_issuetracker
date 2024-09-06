import React, { useEffect, useState } from "react";

import { FiSearch } from "react-icons/fi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Box, Flex } from "@radix-ui/themes";
import { useDebounce } from "use-debounce";

const IssueSearch = () => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? "",
  );
  const [debouncedSearchValue] = useDebounce(searchValue, 500); // Debounce delay of 300ms

  useEffect(() => {
    handleSearch(debouncedSearchValue);
  }, [debouncedSearchValue]);

  const handleSearch = (searchValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchValue) {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }

    const queryString = params.toString() ? `?${params.toString()}` : "";
    router.push(`/issues${queryString}`);
  };

  return (
    <Flex className="relative" align="center">
      <input
        type="text"
        placeholder="Search..."
        defaultValue={searchParams.get("search") ?? ""}
        onChange={(e) => setSearchValue(e.target.value)}
        className="pl-10 pr-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-100 w-full h-[33px]"
      />
      <Flex
        align="center"
        className="absolute inset-y-0 left-0 pl-3  pointer-events-none"
      >
        <FiSearch className="text-gray-400" />
      </Flex>
    </Flex>
  );
};

export default IssueSearch;
