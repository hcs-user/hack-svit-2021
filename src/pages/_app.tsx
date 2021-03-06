import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/encode-sans/400.css";
import "@fontsource/encode-sans/500.css";
import "@fontsource/encode-sans/600.css";
import "@fontsource/encode-sans/700.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import { AnimatePresence, motion } from "framer-motion";
import { AppProps } from "next/app";
import theme from "../theme";
import "swiper/css";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import Layout from "@components/Layout";

function MyApp({ Component, pageProps, router }: AppProps) {
	return (
		<>
			<ChakraProvider cssVarsRoot={undefined} resetCSS theme={theme}>
				<AnimatePresence>
					<motion.div
						key={router.route}
						initial='pageInitial'
						animate='pageAnimate'
						exit='pageInitial'
						transition={{ duration: 0.3 }}
						variants={{
							pageInitial: {
								opacity: 0,
								y: -50,
							},
							pageAnimate: {
								y: 0,
								opacity: 1,
							},
						}}
					>
						{/* <Navbar />
						<Component {...pageProps} />
						<Footer /> */}
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</motion.div>
				</AnimatePresence>
			</ChakraProvider>
		</>
	);
}

export default MyApp;
