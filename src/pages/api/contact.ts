import { Resend } from 'resend';
import type { APIRoute } from 'astro';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async (context) => {
  try {
    const data = await context.request.json();
    console.log('Received contact data:', data);

    await resend.emails.send({
      from: 'noreply@awakemarketing.es',
      to: 'hola@awakemarketing.es',
      subject: `Nuevo contacto: ${data.nombre}`,
      html: `
        <h2>Nuevo mensaje de ${data.nombre}</h2>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Marca:</strong> ${data.marca || 'No especificada'}</p>
        <p><strong>Servicio:</strong> ${data.servicio || 'No especificado'}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${(data.mensaje || '').replace(/\n/g, '<br>')}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Error al enviar' }), { status: 500 });
  }
};