import { describe, expect } from '@jest/globals';
import nodemailer from 'nodemailer';
import 'dotenv/config';

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
});