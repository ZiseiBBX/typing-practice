import { Box, BoxProps, Flex, FlexProps, Text, TextProps, Stack, StackProps } from "@chakra-ui/react";
import { motion } from "framer-motion";

export const MotionText = motion<TextProps>(Text);
export const MotionBox = motion<BoxProps>(Box);
export const MotionFlex = motion<FlexProps>(Flex);
export const MotionStack = motion<StackProps>(Stack);