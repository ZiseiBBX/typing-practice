import { Stack, Box, Text } from "@chakra-ui/layout"

interface IStatProps {
  title: string
  value: string | number
}

function Stat(props: IStatProps) {
  return (
    <Stack direction="row" spacing="4" justify="center" textAlign="left">
      <Text fontWeight="700" fontSize="1.1rem">{props.title} :</Text>
      <Text fontWeight="600" fontSize="1.1rem">{props.value}</Text>
    </Stack>
  )
}

export default Stat
