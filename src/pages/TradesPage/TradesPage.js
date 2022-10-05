import { SimpleGrid, Stack, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import SymbolCard from "../../components/trades/SymbolCard/SymbolCard";
import { AUTH_TOKEN } from "../../constants/authToken";
import { SYMBOLS } from "../../constants/symbols";

export default function TradesPage() {
	const navigate = useNavigate()
	if (!localStorage.getItem(AUTH_TOKEN)) {
		navigate('/journey')
	}
	return (
		<Stack p={24} spacing={48}>
			<Stack>
				<Title order={2}>Symbols</Title>
				<SimpleGrid cols={4}>
					{SYMBOLS.map(s => <SymbolCard key={s.name} symbol={s} />)}
				</SimpleGrid>
			</Stack>
		</Stack>
	)
}