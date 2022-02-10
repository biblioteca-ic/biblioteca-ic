import * as React from 'react';
import { Link, Box, Text, Input, InputGroup, InputRightElement, Button, Stack } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [cpf, setCpf] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("")
    const [show, setShow] = React.useState(false)

    const history = useHistory()
    const handleClick = () => setShow(!show)

    const handleLogin = () => {
        // verificar credenciais e redirecionar para a dashboard
        history.push("/dashboard")
    }

    return (
        <Box textAlign="center" fontSize="xl" p={8} display='flex' justifyContent='center'>

            <Stack spacing={3} display='flex' alignItems='center' w='80%' maxW={380} minW={320}>
                <Text>Login</Text>
                <Input value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    placeholder='CPF'

                />

                <InputGroup size='md' maxW={380}>
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Senha'
                    />
                    <InputRightElement width='4.5rem'>
                        <Button mr={2} h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Esconder' : 'Mostrar'}
                        </Button>
                    </InputRightElement>
                </InputGroup>

                <Button colorScheme='teal' size='md' w='100%' onClick={() => handleLogin()}>
                    Entrar
                </Button>

                <Box width='100%' display="flex" justifyContent='space-between'>
                    <Text fontSize='md'>Ainda não tem conta?</Text>
                    <Link href="/register" color='#1A94DA'>
                        <Text fontSize='md'>Cadastre-se</Text>
                    </Link>
                </Box>
            </Stack>
        </Box>
    );
};

export default Login;
