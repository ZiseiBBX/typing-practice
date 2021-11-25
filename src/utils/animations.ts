import { Variants } from "framer-motion";

export const pageTransitionVariant: Variants = {
  in: {
    opacity: 1,
    y: '0'
  },
  out: {
    opacity: 0,
    y: '100vh'
  }
}