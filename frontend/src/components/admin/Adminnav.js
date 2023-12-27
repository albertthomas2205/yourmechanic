import React, { useState, useEffect } from "react";
import {
  IconButton,
  Input,
  Button,
  Flex,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";

const AdminNav = () => {
  const { isOpen, onToggle } = useDisclosure();

  const navList = (
    <Flex
      as="ul"
      mb={4}
      direction={{ base: "column", lg: "row" }}
      gap={{ base: 2, lg: 6 }}
      mt={{ base: 0, lg: 0 }}
    >
      {/* Your list items go here */}
    </Flex>
  );

  return (
    <div className="bg-white p-3 fixed z-10 w-screen">
      <Flex
        className="container mx-auto"
        align="center"
        justify="between"
        color="blueGray.900"
      >
        <div className="mr-4 cursor-pointer py-1.5 font-medium">
          Material Tailwind
        </div>
        <div className="hidden lg:block">{navList}</div>
        <Flex className="hidden items-center gap-x-2 lg:flex">
          <Flex relative w="full" gap={2} maxW={{ md: "max-content", lg: "none" }}>
            <Input
              type="search"
              placeholder="Search"
              minW={{ base: "288px", lg: "auto" }}
              className="!border-t-blue-gray-300 pl-9 placeholder:text-blue-gray-300 focus:!border-blue-gray-300"
              _placeholder={{
                color: "blueGray.300",
              }}
            />
            <Flex absolute left={3} top={3}>
              <svg
                width="13"
                height="14"
                viewBox="0 0 13 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Your search icon path */}
              </svg>
            </Flex>
          </Flex>
          <Button size="md" rounded="lg">
            Search
          </Button>
        </Flex>
        <IconButton
          variant="text"
          h="6"
          w="6"
          color="inherit"
          bg="transparent"
          onClick={onToggle}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {/* Your close icon path */}
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              {/* Your open icon path */}
            </svg>
          )}
        </IconButton>
      </Flex>
      <Flex direction="column" align="center" display={{ base: "flex", lg: "none" }}>
        {navList}
        <Flex w="full" maxW="max-content" gap={2} mt={1}>
          <Flex relative w="full" gap={2}>
            <Input
              type="search"
              placeholder="Search"
              minW="288px"
              className="!border-t-blue-gray-300 pl-9 placeholder:text-blue-gray-300 focus:!border-blue-gray-300"
              _placeholder={{
                color: "blueGray.300",
              }}
            />
            <Flex absolute left={3} top={3}>
              <svg
                width="13"
                height="14"
                viewBox="0 0 13 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Your search icon path */}
              </svg>
            </Flex>
          </Flex>
          <Button size="md" rounded="lg" mt={0}>
            Search
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default AdminNav;
