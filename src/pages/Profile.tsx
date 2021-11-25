import { Container, Flex, useColorModeValue, Box, Text, Grid, Divider, useColorMode } from "@chakra-ui/react";
import { primaryColor } from "../utils/constants";
import useStore from "../store/store";
import { VictoryAxis, VictoryChart, VictoryLabel, VictoryLine, VictoryThemeDefinition } from "victory";
import { useState, useEffect } from "react";
import { getDate } from "../utils/functions";
import PageContainer from "../components/PageContainer";

interface IGraphData {
	date: string
	wpm: number
}

function Profile() {
	const [data, setData] = useState<IGraphData[]>([])

	const graphColor = useColorModeValue(primaryColor, "white");
	const statistics = useStore((state) => state.myStatistics);

  const theme: VictoryThemeDefinition = {
    axis: {
      style: {
        tickLabels: {
          fill: graphColor,
        },
        axisLabel: {
          fill: graphColor,
        },
        axis: {
          fill: graphColor,
          stroke: graphColor
        },
        grid: {
          display: "none"
        },
      }
    },
  };

	useEffect(() => {
		let temp: IGraphData[] = []

		for (let i = 0; i < statistics.length; i++) {
			temp.push({
				date: getDate(new Date(statistics[i].inserted_at)),
				wpm: statistics[i].grossWPM
			})
		}

		temp = temp.slice(0).reverse()

		setData(temp)
	}, [statistics])

	return (
		<PageContainer textAlign="center">
			{data.length > 1 && <Text fontSize="1.5rem" fontWeight="600">Overview of your WPM</Text>}
			{data.length <= 1  && <Text mt="4" fontSize="1.5rem" fontWeight="600">Not enough data, shoo shoo</Text>}
			{data.length <= 1  && <Text mt="4" fontSize="1.5rem" fontWeight="600">Come back again after a session or two</Text>}
			{data.length > 1 && <VictoryChart animate={{ duration: 1500, easing: "linear" }} theme={theme} domainPadding={20}>
				<VictoryAxis dependentAxis label="WPM"  />
				<VictoryAxis label="Date" tickCount={4} tickFormat={(val) => {
					return val.split(" ")[0]
				}} />
				<VictoryLine data={data} x="date" y="wpm" colorScale="blue" style={{ data:  { stroke: graphColor } }} />
			</VictoryChart>}
		</PageContainer>
	);
}

export default Profile;
