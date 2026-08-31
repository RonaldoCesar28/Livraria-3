import { describe, expect } from '@jest/globals';
import AluguelLivroService from '../../services/aluguelLivroService';

// Implementando primeiro o teste utilizando o conceito de TDD (Testing Driver Development)
// Criar testes que verifiquem o comportamento esperado da função. 
// Implementar o código da função de forma a fazer os testes passarem. Refatorar o código, se necessário.
const aluguelLivroService = new AluguelLivroService();

describe('Testando AluguelLivroService', () => {
    it('Retornar a data de devolução do livro validando a quantidade de dias alugados', async () => {
        const dataAlugado = new Date('2026-08-25');
        const numeroDiasAlugados = 5;
        const dataDevolucaoMock = new Date('2026-08-30');

        const dataDevolucao = await aluguelLivroService.calcularDataDevolucao(dataAlugado, numeroDiasAlugados);

        expect(dataDevolucao).toStrictEqual(dataDevolucaoMock);
    });
});