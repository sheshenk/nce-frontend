import { Card, Stack, Title} from "@mantine/core";
import { Button } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { ScrollArea } from '@mantine/core';
import React from "react";
import { AUTH_TOKEN } from "../../../constants/authToken";

export default function APICard() {
    const token = String(localStorage.getItem(AUTH_TOKEN));
    // console.log("TOKEN",token)
	// return (
    //     <div><Text size="xs">{token}</Text></div>
	// )

    const clipboard = useClipboard({ timeout: 500 });
    console.log(token)
    return (
        <Card>
            <Stack>
                <Title>
                    API Key
                </Title>
            </Stack>
            <Stack>
                <ScrollArea style={{ width: 525}}>
                    {token}
                </ScrollArea>
            </Stack>
            <Stack>
                <Button
                    color={clipboard.copied ? 'teal' : 'blue'}
                    onClick={() => clipboard.copy(token)}>
                    {clipboard.copied ? 'Copied' : 'Copy'}
                </Button>
            </Stack>
        </Card>
      
    );
}
