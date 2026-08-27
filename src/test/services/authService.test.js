import { describe } from '@jest/globals';
import AuthService from '../../services/authService.js';

const authService = new AuthService();

describe('Testando a authService.cadastrarUsuario', () => {
    it('O usuário deve possuir um nome, email e senha', async () => {
        // arrange
        const usuarioMock = {
            nome: 'Raphael',
            email: 'raphael@teste.com.br'
        };
        // act
        const usuarioSalvo = authService.cadastrarUsuario(usuarioMock);
        // assert
        await expect(usuarioSalvo).rejects.toThrow('A senha de usuário é obrigatório!');
    });
});