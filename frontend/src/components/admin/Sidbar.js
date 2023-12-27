import React from "react";
import {
  Box,
  Flex,
  Button,
  Text,
} from "@chakra-ui/react";
import MembersTable from "../../pages/Adminpages/Service";

const Sidebar = () => {
  return (
    <>
      <Box className="header bg-blue-gray-500 p-4 fixed-top">
        <Text color="white">haiii</Text>
      </Box>
      <Flex className="h-screen">
        <Box
          className="sidebar h-screen w-4/12 sm:w-2/12 bg-gray-800 text-white fixed z-10 overflow-y-auto"
          flex="1"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box className="px-3 py-6 content-center">
            <nav className="mt-10">
              <Button
                as="a"
                display="block"
                py="3"
                px="5"
                rounded="md"
                fontSize={{ base: "md", sm: "lg" }}
                transition="background 0.2s"
                _hover={{ bg: "light-blue.500" }}
                href="/users"
                variant="link"
                size="md"
              >
                Users
              </Button>
              <Button
                as="a"
                display="block"
                py="3"
                px="5"
                rounded="md"
                fontSize={{ base: "md", sm: "lg" }}
                transition="background 0.2s"
                _hover={{ bg: "light-blue.500" }}
                href="/mechanic"
                variant="link"
                size="md"
              >
                Mechanic
              </Button>
              <Button
                as="a"
                display="block"
                py="3"
                px="5"
                rounded="md"
                fontSize={{ base: "md", sm: "lg" }}
                transition="background 0.2s"
                _hover={{ bg: "light-blue.500" }}
                href="/services"
                variant="link"
                size="md"
              >
                Services
              </Button>
              {/* Add more navigation items here */}
            </nav>
          </Box>
          <Box className="px-4 py-6">
            {/* Footer content like logout button, version info, etc. */}
          </Box>
        </Box>

        {/* Red-colored div for the remaining portion */}
        <Box className="h-screen w-8/12 sm:w-10/12 pt-5 bg-red-500 text-white fixed right-0 z-0">
          <Box  className="p-4">
          <MembersTable />

          </Box>
       
          {/* Content for the red-colored div */}
        </Box>
      </Flex>
    </>
  );
};

export default Sidebar;
