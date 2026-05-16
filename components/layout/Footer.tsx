'use client'
import { useState } from 'react'

const navLinks = [
  { label: 'Domov', href: '/' },
  { label: 'Služby', href: '#sluzby' },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Proces', href: '#proces' },
  { label: 'Kontakt', href: '#kontakt' },
]

const serviceLinks = [
  { label: 'Webstránky', href: '#sluzby' },
  { label: 'E-shopy', href: '#sluzby' },
  { label: 'Meta & Google Ads', href: '#sluzby' },
]

const labelStyle: React.CSSProperties = {
  fontFamily: 'monospace',
  fontSize: '9px',
  letterSpacing: '0.25em',
  color: 'rgba(255,255,255,0.2)',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: '16px',
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'Syne, sans-serif',
        fontWeight: 400,
        fontSize: '14px',
        color: hovered ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.4)',
        textDecoration: 'none',
        transform: hovered ? 'translateX(4px)' : 'translateX(0)',
        transition: 'all 0.2s',
        display: 'inline-block',
      }}
    >
      {children}
    </a>
  )
}

function SocialIcon({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `1px solid ${hovered ? 'rgba(0,87,255,0.4)' : 'rgba(255,255,255,0.08)'}`,
        color: hovered ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
        transition: 'all 0.2s',
        flexShrink: 0,
      }}
    >
      {children}
    </a>
  )
}

export default function Footer() {
  const [emailHovered, setEmailHovered] = useState(false)

  return (
    <footer
      style={{
        padding: '64px clamp(24px,6vw,96px) 32px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: 'transparent',
        position: 'relative',
      }}
    >
      {/* ROW 1 — Main grid */}
      <div
        className="footer-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: 'clamp(32px,5vw,80px)',
          alignItems: 'flex-start',
        }}
      >
        {/* COL 1 — Logo + tagline + socials */}
        <div className="footer-col1">
          <img
            src="/SB-Design-Logo-1-5.png"
            alt="SB Design"
            style={{ height: '32px', display: 'block' }}
          />
          <p
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              color: 'rgba(255,255,255,0.35)',
              lineHeight: 1.6,
              maxWidth: '200px',
              marginTop: '16px',
              marginBottom: 0,
            }}
          >
            Prémiové weby ktoré predávajú.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '8px',
              marginTop: '20px',
            }}
          >
            <SocialIcon href="#">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect
                  x="2" y="2" width="12" height="12" rx="3.5"
                  stroke="currentColor" strokeWidth="1.2"
                />
                <circle
                  cx="8" cy="8" r="2.5"
                  stroke="currentColor" strokeWidth="1.2"
                />
                <circle cx="11.2" cy="4.8" r="0.6" fill="currentColor" />
              </svg>
            </SocialIcon>
            <SocialIcon href="#">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect
                  x="2" y="2" width="12" height="12" rx="2"
                  stroke="currentColor" strokeWidth="1.2"
                />
                <path
                  d="M5 7v4M5 5.5v.01M8 11V8.5a1.5 1.5 0 013 0V11M8 7v4"
                  stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"
                />
              </svg>
            </SocialIcon>
            <SocialIcon href="#">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect
                  x="2" y="2" width="12" height="12" rx="2"
                  stroke="currentColor" strokeWidth="1.2"
                />
                <path
                  d="M9.5 5.5H8A1.5 1.5 0 006.5 7V11M9.5 8.5h-3"
                  stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"
                />
              </svg>
            </SocialIcon>
          </div>
        </div>

        {/* COL 2 — Navigácia */}
        <div>
          <span style={labelStyle}>Navigácia</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {navLinks.map((link) => (
              <NavLink key={link.label} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* COL 3 — Služby */}
        <div>
          <span style={labelStyle}>Služby</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {serviceLinks.map((link) => (
              <NavLink key={link.label} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* COL 4 — Kontakt */}
        <div>
          <span style={labelStyle}>Kontakt</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Email */}
            <div>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: '8px',
                  color: 'rgba(255,255,255,0.2)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                Email
              </span>
              <a
                href="mailto:biben@sbdesign.sk"
                onMouseEnter={() => setEmailHovered(true)}
                onMouseLeave={() => setEmailHovered(false)}
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: '14px',
                  color: emailHovered ? '#00D4FF' : 'rgba(255,255,255,0.5)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
              >
                biben@sbdesign.sk
              </a>
            </div>

            {/* Lokalita */}
            <div>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: '8px',
                  color: 'rgba(255,255,255,0.2)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                Lokalita
              </span>
              <span
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                Slovensko · Remote
              </span>
            </div>

            {/* Dostupnosť */}
            <div>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: '8px',
                  color: 'rgba(255,255,255,0.2)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                Dostupnosť
              </span>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <div
                  style={{
                    width: '5px',
                    height: '5px',
                    background: '#0057FF',
                    borderRadius: '50%',
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.5)',
                  }}
                >
                  Kapacita sa míňa
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 2 — Divider */}
      <div
        style={{
          height: '1px',
          background:
            'linear-gradient(to right, transparent, rgba(255,255,255,0.07) 20%, rgba(255,255,255,0.07) 80%, transparent)',
          margin: '40px 0 24px',
        }}
      />

      {/* ROW 3 — Bottom bar */}
      <div
        className="footer-bottom"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: '10px',
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: '0.08em',
          }}
        >
          ©2026 SB Design. Všetky práva vyhradené.
        </span>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {[
            { label: 'Ochrana osobných údajov', href: '/ochrana-osobnych-udajov' },
            { label: 'Cookies', href: '/cookies' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'monospace',
                fontSize: '9px',
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.18)',
                textDecoration: 'none',
                transition: 'color 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'rgba(255,255,255,0.18)')
              }
            >
              {link.label}
            </a>
          ))}
        </div>
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: '10px',
            color: 'rgba(255,255,255,0.15)',
          }}
        >
          Made with ♥ in Slovakia
        </span>
        <a
          href="mailto:biben@sbdesign.sk"
          style={{
            fontFamily: 'monospace',
            fontSize: '10px',
            color: 'rgba(255,255,255,0.2)',
            textDecoration: 'none',
          }}
        >
          biben@sbdesign.sk
        </a>
      </div>

      {/* Mobile styles */}
      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .footer-col1 {
            grid-column: 1 / -1;
          }
          .footer-bottom {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  )
}
