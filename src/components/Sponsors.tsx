import { Box, Flex, HStack, Image, Link } from '@chakra-ui/react'
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import SPONSORS from "../data/sponsors.json";

const MotionBox = motion(Box);

export default function Sponsors() {
    return (
        <Marquee gradient={false} speed={100}>
            <HStack>
                {SPONSORS.map((el) => (                    
                    <MotionBox>
                        <Link
                            target="_blank"
                            href={el.siteUrl}
                            as={Flex}
                            m="3"
                            p="2"
                            bg={el.bg}
                            rounded="lg"
                            userSelect="none"
                            _hover={{ transform: "scale(1.1)" }}
                        >
                            <Image
                                h="16"
                                rounded="lg"
                                src={el.iconPath}
                            />
                        </Link>
                    </MotionBox>
                ))}
            </HStack>
        </Marquee>
    )
}