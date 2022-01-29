import {
	Link as ChakraLink,
	Text,
	Code,
	List,
	ListIcon,
	ListItem,
	Stack,
	Heading,
	Image,
	HStack,
	Container,
	Box,
	Center,
	Button,
	Flex,
	VStack,
	AccordionPanel,
	AccordionButton,
	AccordionItem,
	AccordionIcon,
	Accordion,
	Icon,
	LinkBox,
} from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";

import Hero from "../components/Hero";
import Nav from "@components/Nav";
import { motion, useViewportScroll } from "framer-motion";
import Domains from "@components/Domains";
import BackgroundAnimation from "@components/BackgroundAnimation";
import React, {
	ReactChild,
	ReactElement,
	useEffect,
	useRef,
	useState,
} from "react";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";

const DISCORD_LINK = "https://discord.gg/8sBegK2hK9";
const FORM_LINK = "https://form.typeform.com/to/n1g8GYnj";
const AREAS = [
	{
		graphic: "/areas/education.png",
		title: "EdTech",
		description: "asdfadsf asdfjklakdsf asdfkjasdlkf sdf",
		color: "purple",
	},
	{
		graphic: "/areas/finance.png",
		title: "Finance",
		description: "asdfadsf asdfjklakdsf asdfkjasdlkf sdf",
		color: "red",
	},
	{
		graphic: "/areas/open_innovation.png",
		title: "Open Innovation",
		description: "asdfadsf asdfjklakdsf asdfkjasdlkf sdf",
		color: "orange",
	},
	{
		graphic: "/areas/social_welfare.png",
		title: "Social Welfare",
		description: "asdfadsf asdfjklakdsf asdfkjasdlkf sdf",
		color: "blue",
	},
	{
		graphic: "/areas/blockchain.png",
		title: "Blockchain & Decentralized Systems",
		description: "asdfadsf asdfjklakdsf asdfkjasdlkf sdf",
		color: "yellow",
	},
	{
		graphic: "/areas/climate_change.png",
		title: "Climate Change",
		description: "asdfadsf asdfjklakdsf asdfkjasdlkf sdf",
		color: "red",
	},
];

const cards = [1, 2, 3, 4, 5];
const cardVariants = {
	selected: {
		rotateY: 180,
		scale: 1.1,
		transition: { duration: 0.35 },
		zIndex: 10,
		boxShadow:
			"rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
	},
	notSelected: (i) => ({
		rotateY: i * 15,
		scale: 1 - Math.abs(i * 0.15),
		x: i ? i * 50 : 0,
		opacity: 1 - Math.abs(i * 0.15),
		zIndex: 10 - Math.abs(i),
		boxShadow:
			"rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
		transition: { duration: 0.35 },
	}),
};

const Flashcards = () => {
	const [selectedCard, setSelectedCard] = useState(null);
	const [{ startX, startScrollLeft, isDragging }, setDragStart] = useState({
		startX: undefined,
		startScrollLeft: undefined,
		isDragging: false,
	});
	const containerRef = useRef();
	const cardRefs = useRef(new Array());
	useEffect(() => {
		const { scrollWidth, clientWidth } = containerRef.current;
		const halfScroll = (scrollWidth - clientWidth) / 2;
		containerRef.current.scrollLeft = halfScroll;
	}, [containerRef.current]);
	const handleMouseDown = (e) => {
		setDragStart({
			startX: e.pageX - containerRef.current.offsetLeft,
			startScrollLeft: containerRef.current.scrollLeft,
			isDragging: true,
		});
	};
	const handleMouseMove = (e) => {
		if (!isDragging || selectedCard) return;
		const x = e.pageX - containerRef.current.offsetLeft;
		const walk = x - startX;
		containerRef.current.scrollLeft = startScrollLeft - walk;
	};
	const selectCard = (card) => {
		setSelectedCard(selectedCard ? null : card);

		if (card && !selectedCard) {
			cardRefs.current[card - 1].scrollIntoView({
				behavior: "smooth",
				block: "nearest",
				inline: "center",
			});
		}
	};
	const handleCardMouseUp = (e, card) => {
		if (isDragging) {
			const x = e.pageX - containerRef.current.offsetLeft;
			const walk = x - startX;
			if (Math.abs(walk) < 5) selectCard(card);
		} else selectCard(card);
	};
	return (
		<>
			<style jsx>
				{`
					.flashcards {
						height: 100%;
						width: 100%;
						display: grid;
						place-items: center center;
						background: #4da6ff;
					}
					.flashcards__container {
						max-width: 100%;
						white-space: nowrap;
						overflow-x: scroll;
						perspective: 150px;
						-ms-overflow-style: none;
						scrollbar-width: none;
					}
					.flashcards__container::-webkit-scrollbar {
						display: none;
					}
					.flashcards .card {
						position: relative;
						display: inline-block;
						height: 80px;
						width: 80px;
						background: white;
						margin: 2rem 1rem;
						border-radius: 15px;
						cursor: pointer;
					}
					.flashcards .card:first-of-type {
						margin-left: 15rem;
					}
					.flashcards .card:last-of-type {
						margin-right: 15rem;
					}
				`}
			</style>
			<div
				className="flashcards"
				onMouseDown={handleMouseDown}
				onMouseUp={() =>
					setDragStart((prev) => ({ ...prev, isDragging: false }))
				}
				onMouseMove={handleMouseMove}
			>
				<div className="flashcards__container" ref={containerRef}>
					{cards.map((card, i) => (
						<motion.div
							className="card"
							key={card}
							ref={(el) => cardRefs.current.push(el)}
							onMouseUp={(e) => handleCardMouseUp(e, card)}
							variants={cardVariants}
							animate={
								selectedCard === card
									? "selected"
									: "notSelected"
							}
							custom={selectedCard ? selectedCard - card : 0}
						/>
					))}
				</div>
			</div>
		</>
	);
};

const FAQ = ({ question, answer }: { question: string; answer: string }) => (
	<AccordionItem>
		{({ isExpanded }) => (
			<>
				<AccordionButton _focus={{ shadow: "none" }} px="4" py="8">
					{/* {isExpanded ? (
											<Icon
												as={MinusIcon}
												me="4"
												h="4"
												w="4"
											/>
										) : (
											<Icon
												as={PlusIcon}
												me="4"
												h="4"
												w="4"
											/>
										)} */}
					<Icon as={AccordionIcon} me="4" h="8" w="8" />
					<Text
						flex="1"
						textAlign="left"
						fontSize="2xl"
						fontWeight="600"
					>
						{question}
					</Text>
				</AccordionButton>
				<AccordionPanel ps="16" pb="4" fontSize="lg">
					{answer}
				</AccordionPanel>
			</>
		)}
	</AccordionItem>
);

const Index = () => {
	const { scrollYProgress } = useViewportScroll();
	console.log(scrollYProgress);

	return (
		<>
			{/* hero */}
			<Box>
				{/* <BackgroundAnimation /> */}
				<Container
					maxW="container.lg"
					zIndex="100"
					h="75vh"
					as={Flex}
					flexDir="column"
					justifyContent="center"
					alignItems="center"
				>
					<Logo mb="5" />
					<Text fontSize="2xl" fontWeight="700">
						12-15{" "}
						<Text as="span" color="red.400">
							May
						</Text>{" "}
						2022
					</Text>

					<HStack my="4" spacing="4">
						<form action={FORM_LINK} method="get" target="_blank">
							<Button variant="solid" colorScheme="purple">
								Register Now
							</Button>
						</form>
						<form
							action={DISCORD_LINK}
							method="get"
							target="_blank"
						>
							<Button
								type="submit"
								variant="outline"
								colorScheme="yellow"
							>
								Join Discord
							</Button>
						</form>
					</HStack>
				</Container>
			</Box>
			<Box bg="purple.400">
				<Container py="8" maxW="container.lg" zIndex="100">
					<Heading>About Hack SVIT</Heading>
					<Text>
						HackSVIT is going to be an in-person hackathon at Sardar
						Vallabhbhai Patel Institute of Technology (Vasad). It
						will be a 36-hour long joy ride where students will go
						build awesome projects, attend workshops, mentoring
						sessions, networking sessions & fun mini-events.
					</Text>
				</Container>
			</Box>
			<Container maxW="container.md" py="12">
				{AREAS.map(({ title, description, graphic, color }, i) => (
					<Flex
						key={i}
						bgGradient={`linear(to-r, ${color}.400, ${color}.700)`}
						p="4"
					>
						<Image src={graphic} />
						<VStack align="start" spacing="0" ms="4">
							<Heading size="lg">{title}</Heading>
							<Text>{description}</Text>
						</VStack>
					</Flex>
				))}
			</Container>
			<Flashcards />
			<Box bg="red.400">
				<Container py="8" maxW="container.lg" zIndex="100">
					<Heading fontSize={["3xl", null, null, "4xl"]} mb="8">
						Frequently asked questions
					</Heading>
					<Accordion allowToggle allowMultiple>
						<FAQ
							question="Who can participate?"
							answer="Everyone is welcome to apply, be it students,
							professionals or turing-test certified androids. As
							long as you wish to learn something, we'll be
							waiting to see you. If you are under 18 years of age, we’ll need a parental consent form."
						/>
						<FAQ
							question="Does it cost anything?"
							answer="HackSVIT is 100% free. You do not have to spend anything!"
						/>
						<FAQ
							question="Can I bring a project that was built earlier?"
							answer="We apologize, but all the hackathon's projects should be developed during the event from scratch. All hackers will be strictly monitored for any kind of plagiarism or cheating."
						/>
					</Accordion>
				</Container>
			</Box>
			<Container maxW="container.lg" textAlign="center" py="8">
				<Text fontSize="4rem" fontWeight="300">
					<Text as="span" color="orange.400">
						hello
					</Text>
					@hackclubsvit.co
				</Text>
			</Container>
		</>
	);
};

export default Index;

const Logo = ({ ...rest }) => (
	<Box
		as="svg"
		w="full"
		maxW="600"
		viewBox="0 0 1114 223"
		fill="none"
		{...rest}
	>
		{/* <svg width="1114" height="223"  xmlns="http://www.w3.org/2000/svg"> */}
		<path
			d="M215.25 8.17999V80.18C215.25 80.6046 215.183 81.0266 215.05 81.43L192.74 148.36L169.84 217.06C169.581 217.844 169.081 218.526 168.411 219.009C167.741 219.492 166.936 219.752 166.11 219.75H147.35C146.308 219.75 145.308 219.336 144.571 218.599C143.834 217.862 143.42 216.862 143.42 215.82V152.3C143.421 151.782 143.32 151.269 143.123 150.791C142.925 150.312 142.635 149.877 142.269 149.511C141.903 149.145 141.468 148.855 140.989 148.657C140.511 148.46 139.998 148.359 139.48 148.36H75.48C74.435 148.36 73.4329 148.775 72.694 149.514C71.9551 150.253 71.54 151.255 71.54 152.3V215.82C71.54 216.862 71.1259 217.862 70.3889 218.599C69.6519 219.336 68.6523 219.75 67.61 219.75H3.92999C2.88769 219.75 1.88808 219.336 1.15106 218.599C0.414044 217.862 0 216.862 0 215.82V8.17999C0 7.6639 0.101663 7.15287 0.299164 6.67606C0.496665 6.19925 0.786128 5.76601 1.15106 5.40108C1.516 5.03614 1.94925 4.74665 2.42606 4.54915C2.90287 4.35165 3.4139 4.25 3.92999 4.25H67.65C68.6923 4.25 69.6919 4.66406 70.4289 5.40108C71.1659 6.1381 71.58 7.13769 71.58 8.17999V72.4C71.5827 73.4432 71.9989 74.4428 72.7375 75.1795C73.4762 75.9163 74.4768 76.33 75.52 76.33H139.52C140.037 76.3313 140.549 76.2306 141.027 76.0337C141.505 75.8368 141.939 75.5475 142.305 75.1825C142.671 74.8174 142.962 74.3837 143.16 73.9062C143.358 73.4288 143.46 72.9169 143.46 72.4V8.17999C143.46 7.6639 143.562 7.15287 143.759 6.67606C143.957 6.19925 144.246 5.76601 144.611 5.40108C144.976 5.03614 145.409 4.74665 145.886 4.54915C146.363 4.35165 146.874 4.25 147.39 4.25H211.39C212.42 4.26835 213.402 4.69048 214.124 5.42552C214.846 6.16056 215.25 7.14971 215.25 8.17999V8.17999Z"
			fill="#F2F2F2"
		/>
		<path
			d="M388.3 219.75H327.25C326.424 219.752 325.619 219.493 324.949 219.01C324.279 218.527 323.779 217.844 323.52 217.06L301.52 151.06C301.25 150.281 300.746 149.604 300.076 149.123C299.407 148.641 298.605 148.378 297.78 148.37H276.89C276.064 148.37 275.26 148.63 274.59 149.113C273.921 149.596 273.42 150.277 273.16 151.06L251.16 217.06C250.901 217.844 250.401 218.527 249.731 219.01C249.061 219.493 248.256 219.752 247.43 219.75H184.88C184.256 219.751 183.641 219.603 183.086 219.319C182.531 219.035 182.051 218.623 181.687 218.117C181.322 217.611 181.083 217.025 180.99 216.408C180.897 215.792 180.952 215.162 181.15 214.57L203.25 148.36L227.25 76.3603L250.39 6.97028C250.649 6.18616 251.149 5.50389 251.819 5.02084C252.489 4.53778 253.294 4.2786 254.12 4.28028H321.95L322.04 4.53028L338.04 52.4803C338.22 53.0233 338.279 53.599 338.213 54.1673C338.148 54.7355 337.959 55.2826 337.66 55.7703C327.428 72.6552 322.031 92.0269 322.06 111.77V112.27C322.141 133.772 328.629 154.761 340.695 172.559C352.76 190.356 369.856 204.154 389.8 212.19C390.329 212.404 390.807 212.729 391.2 213.143C391.593 213.557 391.893 214.051 392.08 214.59C392.273 215.184 392.323 215.816 392.224 216.433C392.125 217.05 391.881 217.635 391.512 218.139C391.143 218.643 390.659 219.052 390.1 219.332C389.542 219.612 388.925 219.756 388.3 219.75V219.75Z"
			fill="#F2F2F2"
		/>
		<path
			d="M573.85 219.75H515.97C515.323 219.751 514.685 219.592 514.115 219.286C513.544 218.981 513.058 218.539 512.7 218L498.78 197.15L493.59 189.38L466.19 148.38L458.25 136.5L456.49 133.86L451.36 126.18C450.928 125.531 450.695 124.77 450.69 123.99V99.37C450.69 98.5972 450.92 97.842 451.35 97.2L456.41 89.55L458.17 86.9L465.17 76.33L493.25 33.88L498.4 26.09L511.7 6.01C512.059 5.46841 512.546 5.02418 513.118 4.71704C513.691 4.4099 514.33 4.24944 514.98 4.25H572.89C573.601 4.25155 574.298 4.44537 574.908 4.81093C575.517 5.17649 576.017 5.70015 576.353 6.32645C576.689 6.95274 576.85 7.65832 576.817 8.36842C576.785 9.07853 576.561 9.7667 576.17 10.36L533.82 74.36L532.49 76.36L527.27 84.25L509.04 111.78L509.37 112.28L527.37 139.14L533.54 148.38L533.95 148.99L577.14 213.65C577.529 214.244 577.751 214.932 577.781 215.641C577.812 216.351 577.65 217.055 577.313 217.68C576.975 218.305 576.476 218.828 575.866 219.192C575.257 219.556 574.56 219.749 573.85 219.75V219.75Z"
			fill="#F2F2F2"
		/>
		<path
			d="M482.98 190.68C483.276 191.119 483.479 191.614 483.579 192.134C483.679 192.654 483.672 193.188 483.56 193.706C483.448 194.223 483.233 194.713 482.927 195.145C482.621 195.577 482.231 195.943 481.78 196.22C467.704 204.794 451.711 209.721 435.25 210.554C418.789 211.387 402.38 208.1 387.51 200.99C370.75 192.976 356.589 180.4 346.652 164.704C336.715 149.007 331.404 130.827 331.33 112.25C331.33 112.08 331.33 111.92 331.33 111.75C331.327 94.2139 335.985 76.992 344.828 61.8484C353.67 46.7047 366.379 34.1836 381.653 25.5675C396.926 16.9513 414.215 12.5499 431.75 12.814C449.284 13.078 466.433 17.998 481.44 27.0702C481.891 27.3461 482.282 27.7103 482.589 28.1408C482.896 28.5713 483.113 29.0593 483.226 29.5756C483.34 30.092 483.349 30.6259 483.252 31.1456C483.154 31.6653 482.953 32.16 482.66 32.6002L453.71 76.3301L450.1 81.8001L448.72 83.8701L448.39 84.3802C443.443 81.0924 437.696 79.2087 431.762 78.9297C425.828 78.6508 419.93 79.987 414.696 82.796C409.461 85.605 405.087 89.7816 402.04 94.8806C398.992 99.9795 397.385 105.81 397.39 111.75C397.39 111.92 397.39 112.08 397.39 112.25C397.487 118.142 399.168 123.899 402.257 128.917C405.345 133.936 409.728 138.03 414.944 140.771C420.16 143.513 426.018 144.799 431.903 144.496C437.788 144.193 443.483 142.312 448.39 139.05L448.61 139.39L450.11 141.62L454.61 148.36L482.98 190.68Z"
			fill="#F2F2F2"
		/>
		<path
			d="M984.3 4.92999V213.07C984.3 214.112 983.886 215.112 983.149 215.849C982.412 216.586 981.412 217 980.37 217H904.25C903.626 217.001 903.011 216.853 902.456 216.569C901.901 216.285 901.421 215.873 901.057 215.366C900.692 214.86 900.453 214.275 900.36 213.658C900.267 213.041 900.322 212.411 900.52 211.82L969.89 3.69C970.152 2.90591 970.655 2.2242 971.326 1.74143C971.997 1.25865 972.803 0.999258 973.63 1H980.41C981.445 1.01054 982.435 1.42924 983.163 2.16512C983.892 2.901 984.3 3.89459 984.3 4.92999V4.92999Z"
			fill="#F2F2F2"
		/>
		<path
			d="M708.75 96.0002C723.263 95.9755 737.726 97.6911 751.83 101.11C752.393 101.251 752.917 101.516 753.364 101.886C753.81 102.257 754.168 102.723 754.41 103.25L761.88 119.04L796.43 192.04C796.807 192.857 796.897 193.777 796.687 194.652C796.476 195.526 795.977 196.304 795.27 196.86C783.73 205.69 768.27 212.7 750.4 216.99C736.83 220.088 722.96 221.684 709.04 221.75C692.75 221.99 667.75 223.99 640.68 216.99C627.68 213.63 615.86 209.2 605.96 203.56C605.432 203.265 604.979 202.853 604.636 202.355C604.293 201.856 604.069 201.286 603.982 200.687C603.895 200.089 603.947 199.478 604.134 198.903C604.321 198.328 604.638 197.803 605.06 197.37L635.25 166.56C635.905 165.894 636.775 165.481 637.706 165.397C638.636 165.313 639.566 165.562 640.33 166.1C650.6 173.31 680.75 185.57 708.99 181.5C728.27 178.72 744.26 169.41 744.26 154.5C744.26 139.59 728.47 127.5 708.99 127.5V127C681.84 127 657.05 121.08 638.11 111.41C615.53 99.8902 601.28 82.9802 601.28 64.1202C601.28 29.3902 649.63 1.24023 709.28 1.24023C736.67 1.24023 761.68 7.18023 780.72 16.9702C781.334 17.2922 781.852 17.7705 782.223 18.3569C782.593 18.9433 782.802 19.617 782.828 20.3099C782.854 21.0029 782.697 21.6905 782.373 22.3033C782.048 22.9162 781.568 23.4325 780.98 23.8002C767.57 32.1902 752.5 41.5802 739.61 49.5102C738.912 49.9463 738.095 50.1529 737.273 50.1009C736.452 50.0489 735.667 49.7409 735.03 49.2202C728.63 43.8602 719.46 40.5002 709.27 40.5002C689.94 40.5002 674.27 52.5902 674.27 67.5002C674.27 82.4102 689.52 95.9202 708.77 96.0002"
			fill="#F2F2F2"
		/>
		<path
			d="M960.7 6.21048L889.5 214.34C889.235 215.117 888.734 215.79 888.067 216.267C887.4 216.744 886.6 217.001 885.78 217H819.78C819.036 216.994 818.309 216.779 817.68 216.382C817.051 215.984 816.545 215.419 816.22 214.75L812.02 205.87L804.02 189.03L769.59 116.28L764.13 104.75L742.6 59.2605C742.34 58.6505 742.07 58.0705 741.76 57.4805V57.3805C754.98 49.3805 773.46 37.9005 790.28 27.3805C790.746 27.0891 791.268 26.8988 791.813 26.8219C792.357 26.745 792.912 26.7832 793.441 26.934C793.969 27.0848 794.46 27.3448 794.882 27.6973C795.304 28.0499 795.648 28.487 795.89 28.9805L816.65 71.0405L840.83 120.04L841.96 122.33C842.306 123.028 842.852 123.606 843.527 123.994C844.202 124.381 844.977 124.56 845.754 124.508C846.53 124.455 847.274 124.174 847.891 123.699C848.508 123.225 848.97 122.578 849.22 121.84L888.86 3.66048C889.123 2.87987 889.625 2.20148 890.294 1.72075C890.963 1.24002 891.766 0.981116 892.59 0.980469H957.04C957.663 0.990377 958.275 1.14785 958.825 1.43997C959.375 1.73209 959.848 2.15054 960.205 2.66095C960.563 3.17136 960.794 3.7592 960.88 4.37622C960.966 4.99324 960.904 5.62186 960.7 6.21048V6.21048Z"
			fill="#F2F2F2"
		/>
		<path
			d="M994.25 53.5005L993.79 5.20048C993.782 4.67973 993.877 4.16257 994.071 3.67891C994.264 3.19525 994.551 2.75469 994.915 2.38272C995.28 2.01074 995.715 1.71473 996.194 1.51181C996.674 1.30888 997.189 1.20307 997.71 1.20048L1109.81 0.980481C1110.33 0.979166 1110.84 1.07985 1111.32 1.27676C1111.79 1.47367 1112.23 1.76295 1112.6 2.12802C1112.96 2.49308 1113.25 2.92677 1113.45 3.40423C1113.65 3.8817 1113.75 4.39355 1113.75 4.91049V49.5405C1113.75 50.5828 1113.34 51.5824 1112.6 52.3194C1111.86 53.0564 1110.86 53.4705 1109.82 53.4705H1047.89C1046.85 53.4705 1045.85 53.8845 1045.11 54.6215C1044.37 55.3586 1043.96 56.3582 1043.96 57.4005V213.07C1043.96 214.113 1043.55 215.112 1042.81 215.849C1042.07 216.586 1041.07 217 1040.03 217H998.18C997.138 217 996.138 216.586 995.401 215.849C994.664 215.112 994.25 214.113 994.25 213.07V53.5005"
			fill="#F2F2F2"
		/>
	</Box>
);
