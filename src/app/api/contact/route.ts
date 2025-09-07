import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validação básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nome, email e mensagem são obrigatórios' },
        { status: 400 }
      );
    }

    // Configuração do transportador de email
    const transporter = nodemailer.createTransport({
      service: 'hotmail', // ou 'outlook'
      auth: {
        user: process.env.EMAIL_USER, // seu email
        pass: process.env.EMAIL_PASS, // App Password do Hotmail/Outlook
        /* 
         * Para obter App Password no Hotmail/Outlook:
         * 1. Acesse https://account.microsoft.com/security
         * 2. Ative a verificação em duas etapas (se não tiver)
         * 3. Procure por "Senhas de app" ou "App passwords"
         * 4. Clique em "Criar nova senha de app"
         * 5. Escolha "Mail" como aplicativo
         * 6. Copie a senha gerada (16 caracteres)
         * 7. Use essa senha no .env.local como EMAIL_PASS
         */
      },
    });

    // Configuração do email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'rafaeltsd@hotmail.com', // email de destino
      subject: subject || 'Nova mensagem do portfólio',
      html: `
        <h3>Nova mensagem do portfólio</h3>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Assunto:</strong> ${subject || 'Não informado'}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message}</p>
      `,
      replyTo: email,
    };

    // Enviar email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Thank you for your interest! I will get in touch with you soon.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
