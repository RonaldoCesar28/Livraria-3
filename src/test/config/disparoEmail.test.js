import { describe, expect } from '@jest/globals';
import nodemailer from 'nodemailer';
import 'dotenv/config';

//  testes de conexão com a biblioteca nodeMailer para disparo de e-mails na API.
const testAccount = await nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: testAccount.user,
        pass: testAccount.pass,
    },
    tls: {
        rejectUnauthorized: false // Ignora o erro de certificado autoassinado
    }
});

const verificarConexao = () => new Promise((resolver, reject) => {
    transporter.verify((error, success) => {
        if (error) {
            reject(error);
        } else {
            resolver(success);
        }
    });
});

describe('Testando disparo de email', () => {
    it('O sistema deve validar se a conexão com o sistema de disparo de email', async () => {
        const estaConectado = true;

        const validarConexao = await verificarConexao();

        expect(validarConexao).toStrictEqual(estaConectado);
    });

    it('O sistema deve enviar um email', async () => {
        const dadosEmailMock = {
            from: '"Ana Lucia" <ana@gmail.com>',
            to: 'ronaldo@gmail.com',
            subject: 'Aluguel de Livro',
            text: 'Olá, Ronaldo, você alugou o livro Harry Potter e o Cálice de Fogo por 5 dias.',
        };
        const info = await transporter.sendMail(dadosEmailMock);
        expect(info.accepted[0]).toBe(dadosEmailMock.to);
    });
});