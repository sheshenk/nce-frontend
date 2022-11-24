import { Grid, Stack, Title } from "@mantine/core";
// import AssetsChart from "../../components/assets/AssetsChart/AssetsChart";
import AssetsTable from "../../components/assets/AssetsTable/AssetsTable";
import BalanceCard from "../../components/assets/BalanceCard/BalanceCard";
import APICard from "../../components/assets/APICard/APICard";
import PLTrend from "../../components/assets/PLTrend/PLTrend";


export default function AssetsPage({ props }) {

	return (
		<Stack p={24}>
			<Title order={2}>Your Assets</Title>
			<Grid columns={24}>
				<Grid.Col span={8}>
					<BalanceCard userid={props.user.userid} />
				</Grid.Col>
				<Grid.Col span={16}>
					<PLTrend userid={props.user.userid} />
				</Grid.Col>
				<Grid.Col span={12}>
					<AssetsTable walletid={props.user.userid} />
				</Grid.Col>
				<Grid.Col span={12}>
					<APICard />
				</Grid.Col>
			</Grid>
		</Stack>
	)
}
