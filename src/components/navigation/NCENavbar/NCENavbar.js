import { Navbar, Stack } from "@mantine/core"
import { ChartLine, ListDetails, News, Aperture, Award, Road } from "tabler-icons-react"
import NCENavbarLink from "../NCENavbarLink/NCENavbarLink"

export default function NCENavbar() {
	return (
		<Navbar width={{ base: 220 }} height={500} p='xs'>
			<Stack spacing={4}>
				<NCENavbarLink title={"Journey"} icon={<Road color={'#bb40bf'} />} url='/journey' />
				<NCENavbarLink title={"Trades"} icon={<ChartLine />} color='blue' url='/' />
				<NCENavbarLink title={"Your Assets"} icon={<ListDetails />} color='orange' url='/assets' />
				<NCENavbarLink title={"Contest"} icon={<Award />} color='red' url='/contest' />
				<NCENavbarLink title={"Learn"} icon={<News />} color='green' url='/blog' />
				<NCENavbarLink title={"Crypto Stats"} icon={<Aperture />} color='violet' url='/viz' />
			</Stack>

		</Navbar>
	)
}
