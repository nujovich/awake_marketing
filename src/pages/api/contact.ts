import { Resend } from 'resend';
import type { APIRoute } from 'astro';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async (context) => {
  try {
    const data = await context.request.json();
    
    const nombre = String(data?.nombre ?? '');
    const email = String(data?.email ?? '');
    const marca = String(data?.marca ?? '');
    const servicio = String(data?.servicio ?? '');
    const mensaje = String(data?.mensaje ?? '');

    await resend.emails.send({
      from: 'noreply@awakemarketing.es',
      to: 'hola@awakemarketing.es',
      subject: `Nuevo contacto: ${nombre}`,
      html: `
        <h2>Nuevo mensaje de ${nombre}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Marca:</strong> ${marca || 'No especificada'}</p>
        <p><strong>Servicio:</strong> ${servicio || 'No especificado'}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje.replace(/\n/g, '<br>')}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Error al enviar' }), { status: 500 });
  }
};