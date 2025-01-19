import { extendTheme } from "@chakra-ui/react";

import fonts from "./foundation/fonts";
import textStyles from "./foundation/typography";
import colors from "./foundation/colors";
import Button from "./components/Button";

const theme = extendTheme({
	fonts,
	textStyles,
	colors,
	components: {
		Button,
		Divider: {
			defaultProps: { size: "md" },
			sizes: {
				lg: { borderWidth: "4px" },
				md: { borderWidth: "2px" },
				sm: { borderWidth: "1px" },
			},
		},
	},
});

export default theme;
