import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const runtime = 'nodejs'

const escapeHtml = (input: string): string =>
  input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    // App Password sa z Googlu kopíruje s medzerami — tu ich odstránime
    pass: (process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, ''),
  },
})

export async function POST(req: NextRequest) {
  try {
    const { name, email, service, message, consent } = (await req.json()) as {
      name?: string
      email?: string
      service?: string
      message?: string
      consent?: boolean
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Vyplňte všetky povinné polia.' },
        { status: 400 }
      )
    }

    if (!consent) {
      return NextResponse.json(
        { error: 'Pre odoslanie je potrebný súhlas so spracovaním osobných údajov.' },
        { status: 400 }
      )
    }

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeService = escapeHtml(service || 'Nezadané')
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>')

    const info = await transporter.sendMail({
      from: `"SB Design" <${process.env.GMAIL_USER}>`,
      to: 'biben@sbdesign.sk',
      replyTo: email,
      subject: `Nový dopyt — ${name} (${service || 'Nezadané'})`,
      html: `
        <div style="font-family: monospace; max-width: 600px; margin: 0 auto;
                    background: #010818; color: #fff; padding: 40px; border-radius: 8px;">
          <h1 style="font-size: 28px; margin: 0 0 32px; color: #fff;">
            Nový dopyt z SB Design webu
          </h1>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);
                         color: rgba(255,255,255,0.5); font-size: 11px;
                         letter-spacing: 0.2em; text-transform: uppercase; width: 140px;">
                Meno
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);
                         color: #fff; font-size: 16px;">
                ${safeName}
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);
                         color: rgba(255,255,255,0.5); font-size: 11px;
                         letter-spacing: 0.2em; text-transform: uppercase;">
                Email
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);
                         color: #00D4FF; font-size: 16px;">
                <a href="mailto:${safeEmail}" style="color: #00D4FF;">${safeEmail}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);
                         color: rgba(255,255,255,0.5); font-size: 11px;
                         letter-spacing: 0.2em; text-transform: uppercase;">
                Služba
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);
                         color: #fff; font-size: 16px;">
                ${safeService}
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);
                         color: rgba(255,255,255,0.5); font-size: 11px;
                         letter-spacing: 0.2em; text-transform: uppercase;">
                Súhlas (marketing)
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);
                         color: #fff; font-size: 16px;">
                ${consent ? 'Áno' : 'Nie'}
              </td>
            </tr>
            <tr>
              <td style="padding: 16px 0 0; color: rgba(255,255,255,0.5);
                         font-size: 11px; letter-spacing: 0.2em;
                         text-transform: uppercase; vertical-align: top;">
                Správa
              </td>
              <td style="padding: 16px 0 0; color: rgba(255,255,255,0.8);
                         font-size: 15px; line-height: 1.7;">
                ${safeMessage}
              </td>
            </tr>
          </table>

          <div style="margin-top: 40px; padding-top: 24px;
                      border-top: 1px solid rgba(255,255,255,0.1);
                      font-size: 11px; color: rgba(255,255,255,0.3);
                      letter-spacing: 0.15em;">
            SB DESIGN · sbdesign.sk · Odoslané automaticky z kontaktného formulára
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true, id: info.messageId })
  } catch (err) {
    console.error('Kontaktný formulár — chyba pri odoslaní e-mailu:', err)
    return NextResponse.json(
      { error: 'Nastala chyba. Skúste znova.' },
      { status: 500 }
    )
  }
}
