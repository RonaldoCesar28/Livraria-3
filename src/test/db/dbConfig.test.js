import db from '../../db/dbconfig';
import { describe, expect } from '@jest/globals';

describe('Testando configDB', () => {
    it('Teste de conexão com o banco de dados', async () => {
        const autorMock = {
            nome: 'Ronaldo',
            nacionalidade: 'Português',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        // insere o objeto com as propriedades através do método db da tabela autores e busca o registro criado para confirmar que foi salvo
        const autorSalvo = await db('autores').insert(autorMock).then((retorno) => db('autores')
            .where('id', retorno[0])).then((autorSelecionado) => autorSelecionado[0]);

        // valida se o nome salvo é igual ao do autorMock
        expect(autorSalvo.nome).toBe(autorMock.nome);

        // deleta o registro que acabou de ser criado para deixar o banco de dados limpo.
        await db('autores').where({ id: autorSalvo.id }).del();
    });
});