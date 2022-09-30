import { useMutation } from "@apollo/client"
import { Anchor, Button, PasswordInput, Space, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { showNotification } from "@mantine/notifications"
import { AUTH_TOKEN } from "../../../constants/authToken"
import { LOGIN_MUTATION } from "../../../queries/auth"

export default function LoginForm({ setIsLoginMode }) {
	const form = useForm({
		initialValues: {
			email: '',
			password: ''
		}
	})

	const [startLogin] = useMutation(LOGIN_MUTATION, {
		variables: {
			email: form.values.email,
			password: form.values.password
		},
		onCompleted: ({ login }) => {
			console.log(login.error)
			if (login.response) {
				localStorage.setItem(AUTH_TOKEN, login.response)
				window.location.href = '/journey';
			} else {
				showNotification({
					title: 'Login Failed',
					message: login.error
				})
			}
		}
	})

	return (
		<>
			<TextInput placeholder="+65 xxxxxxxx" label="Phone number" size="md" {...form.getInputProps('email')} />
			<PasswordInput placeholder="Password" label="Password" size="md" {...form.getInputProps('password')} />
			<Space />
			<Button variant='filled' size="lg" type='submit' onClick={() => startLogin()}>Log In</Button>
			<Space />
			<Text align="center">Don't have an account yet? <Anchor onClick={() => setIsLoginMode(false)}>Create an Account</Anchor> </Text>
		</>
	)
}