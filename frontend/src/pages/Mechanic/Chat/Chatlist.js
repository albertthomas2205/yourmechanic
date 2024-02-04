import React from "react";
import { Flex,Box,Stack, Container,Center,Spacer } from "@chakra-ui/react";
import ChatUsers from "../../../components/mechanic/Chat/ChatUsers";
import ChatPage from "../../../components/mechanic/Chat/ChatBox";
// import { useLocation } from "react-router-dom";
const ChatList = () => {

//   const location = useLocation();
// const mechanicId = location.state?.mechanicId;

  return (
    <Center backgroundColor={'#37397f'} color={'white'} >
         

<Flex width={'90%'} >


<Stack  w={'30%'} padding={'10px'} >

<ChatUsers />

</Stack>
<Spacer />
<Box  w={'68%'} padding={'30px'} height={'840px'} >
<ChatPage/>


</Box>


</Flex>




    </Center>




  )
};

export default ChatList;
