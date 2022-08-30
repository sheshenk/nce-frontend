import { Card } from "@mantine/core";
import React from "react";
import { Image } from "@mantine/core";


export default function FearGreedImage() {

	return (
		<Card>
			{/* <img src="https://alternative.me/crypto/fear-and-greed-index.png" width={100} height={100} alt="Latest Crypto Fear & Greed Index" /> */}
			<Image radius="md"
			src="https://alternative.me/crypto/fear-and-greed-index.png"
			alt="Latest Crypto Fear & Greed Index"
			/>
		</Card>

	)
}