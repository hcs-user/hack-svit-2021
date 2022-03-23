import { Flex, Img } from '@chakra-ui/react'
import React from 'react'

export default function Organization() {
    return (
        <Flex gap='20' py='10' flexWrap='wrap' justifyContent={["center", null, "start"]}>
            <Img src='hcs.png' h='150' w='auto' />
            <Img src='codingclub.png' h='150' w='auto' />
            <Img src='svit.png' h='150' w='auto' />
        </Flex>
    )
}