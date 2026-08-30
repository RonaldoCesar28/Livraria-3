import { describe, expect } from '@jest/globals';
import LivrosImagensService from '../../services/livrosImagensService';

const livrosImagensService = new LivrosImagensService();

describe('Testando livrosImagensService.cadastrarImagem', () => {
    it('O sistema deve salvar uma imagem vinculada ao livro caso todos os dados estejam corretos', async () => {
        const imagemMock = {
            file: {
                originalname: 'curso node.png',
                mimetype: 'image/png',
                size: 2857,
                buffer: {
                    type: 'Buffer',
                    data: [137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 1, 192, 0, 0, 1, 46, 8, 2, 0, 0, 0, 150, 9, 85, 214, 0, 0, 0, 1, 115, 82, 71, 66, 0, 174, 206, 28, 233], // não exibimos a sequência completa. Para isso, consulte o repositório no GitHub],
                },
            },
            body: {
                livroId: 1,
            }
        };

        const imagemSalva = await livrosImagensService.cadastrarImagem(imagemMock);

        expect(imagemSalva.content.livro_id).toBe(imagemMock.body.livroId);
        expect(imagemSalva.content.size).toBeLessThan(5000);

        await livrosImagensService.excluirImagemLivro(imagemSalva.content.id);
    });

    it('É obrigatório informar o id do livro a qual a imagem é vinculada', async () => {
        const imagemMock = {
            file: {
                originalname: 'curso node.png',
                mimetype: 'image/png',
                size: 2857,
                buffer: {
                    type: 'Buffer',
                    data: [137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 1, 192, 0, 0, 1, 46, 8, 2, 0, 0, 0, 150, 9, 85, 214, 0, 0, 0, 1, 115, 82, 71, 66, 0, 174, 206, 28, 233],
                },
            },
            body: {}
        };
        const imagemSave = livrosImagensService.cadastrarImagem(imagemMock);
        await expect(imagemSave).rejects.toThrow('O id do livro é obrigatório.');
    });

    it('O sistema só permite imagens do tipo PNG e JPG', async () => {
        const imagemMock = {
            file: {
                originalname: 'curso node.gif',
                mimetype: 'image/gif',
                size: 2857,
                buffer: {
                    type: 'Buffer',
                    data: [137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 1, 192, 0, 0, 1, 46, 8, 2, 0, 0, 0, 150, 9, 85, 214, 0, 0, 0, 1, 115, 82, 71, 66, 0, 174, 206, 28, 233],
                },
            },
            body: {
                livroId: 1
            }
        };
        const imagemSave = livrosImagensService.cadastrarImagem(imagemMock);
        await expect(imagemSave).rejects.toThrow(`O formato ${imagemMock.file.mimetype} não é permitido.`);
    });

    it('O sistema só permite imagens ate 5000kb', async () => {
        const imagemMock = {
            file: {
                originalname: 'curso node.png',
                mimetype: 'image/png',
                size: 5001,
                buffer: {
                    type: 'Buffer',
                    data: [137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 1, 192, 0, 0, 1, 46, 8, 2, 0, 0, 0, 150, 9, 85, 214, 0, 0, 0, 1, 115, 82, 71, 66, 0, 174, 206, 28, 233],
                },
            },
            body: {
                livroId: 1
            }
        };
        const imagemSave = livrosImagensService.cadastrarImagem(imagemMock);
        await expect(imagemSave).rejects.toThrow('O limite para upload de imagem é de 5000kb.');
    });
});