import { describe } from '@jest/globals';
import AuthService from '../../services/authService.js';
import bcryptjs from 'bcryptjs';
import Usuario from '../../models/usuario.js';

// Teste unitário - Cadastrar Usuário

const authService = new AuthService();

describe('Testando a authService.cadastrarUsuario', () => {
    it('O usuário deve possuir um nome, email e senha', async () => {
        // arrange: quais as informações que queremos validar
        const usuarioMock = {
            nome: 'Ronaldo',
            email: 'ronaldo@gmail.com',
        };
        // act: chama o método que retorna os registros
        const usuarioSalvo = authService.cadastrarUsuario(usuarioMock);
        // assert: valida as informaçoes retornadas, ou os erros lançados se estavam de acordo com o esperado
        await expect(usuarioSalvo).rejects.toThrow('A senha de usuário é obrigatório!');
    });

    it('A senha do usuário precisa ser criptografada quando for salva no banco de dados', async () => {
        const data = {
            nome: 'Leonardo',
            email: 'leonardo@gmail.com',
            senha: 'senha12345',
        };

        const resultado = await authService.cadastrarUsuario(data);
        const senhaIguais = await bcryptjs.compare('senha12345', resultado.content.senha);

        expect(senhaIguais).toStrictEqual(true);
        await Usuario.excluir(resultado.content.id);
    });

    it('Não pode ser cadastrado um usuário com e-mail duplicado', async () => {
        const usuarioMock = {
            nome: 'Marcos',
            email: `marcos_${Date.now()}@gmail.com`, // gera um email unico baseado no tempo atual
            senha: 'senha12345',
        };
        // 1º Cadastro: Deve funcionar perfeitamente
        const primeiroCadastro = await authService.cadastrarUsuario(usuarioMock);
        // 2º Cadastro: Tentando o MESMO e-mail. Agora deve falhar!
        const segundoCadastro = authService.cadastrarUsuario(usuarioMock);
        // O Jest espera que a SEGUNDA chamada rejeite e lance o erro
        await expect(segundoCadastro).rejects.toThrow('O email já está cadastrado!');
        await Usuario.excluir(primeiroCadastro.content.id);
    });

    it('Ao cadastrar um usuário deve ser retornada uma mensagem informando que o usuário foi cadastrado', async () => {
        const data = {
            nome: 'Fernando',
            email: 'fernando@gmail.com',
            senha: 'senha12345',
        };

        const resultado = await authService.cadastrarUsuario(data);

        expect(resultado.message).toEqual('usuario criado');

        await Usuario.excluir(resultado.content.id);
    });

    it('Ao cadastrar um usuário, validar o retorno das informações do usuário', async () => {
        const data = {
            nome: 'Rogerio',
            email: 'rogerio@gmail.com',
            senha: 'senha12345',
        };

        const resultado = await authService.cadastrarUsuario(data);

        expect(resultado.content).toMatchObject(data);

        await Usuario.excluir(resultado.content.id);
    });
});