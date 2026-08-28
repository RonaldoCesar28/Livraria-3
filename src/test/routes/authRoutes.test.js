import request from 'supertest';
import { afterEach, beforeEach, describe } from '@jest/globals';
import app from '../../app';

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

        await request(servidor)
            .post('/login')
            .send(loginMock)
            .expect(500)
            .expect('"A senha de usuario é obrigatório."');
    });
});