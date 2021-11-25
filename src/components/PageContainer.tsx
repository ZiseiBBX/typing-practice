import { Container } from "@chakra-ui/react";
import { pageTransitionVariant } from "../utils/animations";
import { MotionFlex } from "./MotionComponents";

function PageContainer({ textAlign, children }: any) {
	return (
		<MotionFlex
			height="100%"
			justifyContent="center"
			alignItems="center"
			variants={pageTransitionVariant}
			animate="in"
			exit="out"
			initial="out"
      textAlign={textAlign}
		>
			<Container>{children}</Container>
		</MotionFlex>
	);
}

export default PageContainer;
