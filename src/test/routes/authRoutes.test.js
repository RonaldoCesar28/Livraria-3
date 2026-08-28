import request from 'supertest';
import { afterEach, beforeEach, describe } from '@jest/globals';
import app from '../../app';

// Teste de integração - testando varias partes do codigo, o método login
// Teste de caixa preta - não precisa ter acesso diretamente ao informações do nosso codigo

let servidor;
beforeEach(() => {
    const porta = 3000;
    servidor = app.listen(porta);
});

afterEach(() => {
    servidor.close();
});

describe('Testando a rota login (POST)', () => {
    it('O login deve possuir um e-mail e senha para se autenticar', async () => {
        const loginMock = {
            email: 'ronaldo@gmail.com.br',
        };

        await request(servidor) // chamou o endpoint e retornou uma mensagem do backend da nossa API Service
            .post('/login')
            .send(loginMock)
            .expect(500)
            .expect('"A senha de usuario é obrigatório."');
    });

    it('O login deve validar se o usuário está cadastrado', async () => {
        const loginMock = {
            email: 'raphael.teste@teste.com.br', // Deve falhar se o e-mail não existir e senha correta
            senha: '123456',
        };
        await request(app)
            .post('/login')
            .set('Accept', 'application/json')
            .send(loginMock)
            .expect(500)
            .expect('"Usuario não cadastrado."'); // Mensagem para e-mail errado
    });

    it('O login deve validar email e senha incorreto', async () => {
        const loginMock = {
            email: 'raphael@teste.com.br', // Deve falhar se o e-mail existir mas a senha estiver errada
            senha: '12345',
        };
        await request(app)
            .post('/login')
            .set('Accept', 'application/json')
            .send(loginMock)
            .expect(500)
            .expect('"Usuario ou senha invalido."'); // Mensagem para senha errada
    });

    it('O login deve validar se está sendo retornado um accessToken', async () => {
        const loginMock = {
            email: 'raphael@teste.com.br', // validar com email e senha correta
            senha: '123456',
        };
        const resposta = await request(app)
            .post('/login')
            .set('Accept', 'application/json')
            .send(loginMock)
            .expect(201);
        expect(resposta.body.message).toBe('Usuario conectado');
        expect(resposta.body).toHaveProperty('accessToken');
    });
});