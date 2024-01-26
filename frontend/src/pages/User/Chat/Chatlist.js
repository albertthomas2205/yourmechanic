import React from "react";
import { Flex,Box,Stack, Container,Center,Spacer } from "@chakra-ui/react";
import ChatUsers from "../../../components/user/Chat/ChatUsers";
import ChatPage from "../../../components/user/Chat/ChatBox";
// import { useLocation } from "react-router-dom";
const ChatList = () => {

//   const location = useLocation();
// const mechanicId = location.state?.mechanicId;

  return (
    <Center backgroundColor={'black'} color={'white'} >
         

<Flex width={'90%'} >


<Stack  w={'30%'} padding={'10px'} >

<ChatUsers />

</Stack>
<Spacer />
<Box  w={'68%'} paddingRight={'27px'}  height={'840px'} >
<ChatPage/>


</Box>


</Flex>




    </Center>




  )
};

export default ChatList;
