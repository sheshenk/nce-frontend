import { useMutation } from "@apollo/client"
import { Anchor, Button, Group, PasswordInput, Space, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { showNotification } from "@mantine/notifications"
import { useState } from "react"
import { AUTH_TOKEN } from "../../../constants/authToken"
import { REGISTER_MUTATION } from "../../../queries/auth"
import { createHash } from 'crypto';

function hash(string) {
	return createHash('sha256').update(string).digest('hex');
}

export default function RegisterForm({ setIsLoginMode }) {
	const [otpSent, setOtpSent] = useState(false)

	const form = useForm({
		initialValues: {
			name: '',
			email: '',
			password: ''
		}
	})

	const [startRegister] = useMutation(REGISTER_MUTATION, {
		variables: {
			name: form.values.name,
			email: form.values.email,
			password: hash(form.values.password)
		},
		onCompleted: ({ createUser }) => {
			console.log(createUser.error)
			if (createUser.response) {
				localStorage.setItem(AUTH_TOKEN, createUser.response)
				window.location.href = '/journey';
			} else {
				showNotification({
					title: 'Register Failed',
					message: createUser.error
				})
			}
		}
	})

	return (
		<>
			<TextInput placeholder="John Doe" label="Your Name" size="md" {...form.getInputProps('name')} />
			<Group sx={{ position: 'relative' }}>
				<TextInput placeholder="+65 xxxxxxxx" label="Your Phone Number" size="md" sx={{ width: otpSent ? '48.5%' : '75%' }} {...form.getInputProps('email')} />
				{otpSent ? <TextInput placeholder="xxxx" label="OTP" size="md" sx={{ width: '48%' }} /> : <Button variant='default' size="md" sx={{ right: 0, bottom: 0, position: 'absolute' }} onClick={() => setOtpSent(!otpSent)}>Get OTP</Button>}
				{/* () => { alert("User registration is temporarily closed, please contact the administrator for assistance.") } */}
			</Group>
			<PasswordInput placeholder="Password" label="Password" size="md" {...form.getInputProps('password')} />
			<Space />
			{otpSent ? <Button variant='filled' size="lg" onClick={() => startRegister()}>Register</Button> : <Button variant='filled' size="lg" disabled>Get OTP First</Button>}
			<Space />
			<Text align="center">Already have an account? <Anchor onClick={() => setIsLoginMode(true)}>Login</Anchor> </Text>
		</>
	)
}