'use client'
import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const services = [
  'Webstránka',
  'E-shop',
  'Meta & Google Ads',
  'Komplexné riešenie',
  'Iné',
]

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function ClosingSection() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [focused, setFocused] = useState<string | null>(null)
  const [gdprChecked, setGdprChecked] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!gdprChecked) {
      setErrorMsg('Prosím potvrďte súhlas so spracovaním údajov.')
      setFormState('error')
      return
    }

    setFormState('loading')

    const formData = new FormData(e.currentTarget)
    const payload = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      service: selectedService,
      message: formData.get('message') as string,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || 'Nastala chyba.')
        setFormState('error')
      } else {
        setFormState('success')
        formRef.current?.reset()
        setSelectedService('')
        setGdprChecked(false)
      }
    } catch {
      setErrorMsg('Nastala chyba. Skúste znova.')
      setFormState('error')
    }
  }

  const inputStyle = (name: string): React.CSSProperties => ({
    width: '100%',
    background:
      focused === name ? 'rgba(0,87,255,0.05)' : 'rgba(255,255,255,0.015)',
    border: `1px solid ${
      focused === name ? 'rgba(0,87,255,0.5)' : 'rgba(255,255,255,0.06)'
    }`,
    borderRadius: 0,
    padding: '14px 16px',
    fontFamily: 'Syne, sans-serif',
    fontSize: '14px',
    color: '#FFFFFF',
    outline: 'none',
    transition: 'border-color 0.25s, background 0.25s',
    boxSizing: 'border-box',
  })

  const labelStyle: React.CSSProperties = {
    fontFamily: 'monospace',
    fontSize: '9px',
    letterSpacing: '0.22em',
    color: 'rgba(255,255,255,0.3)',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '8px',
  }

  return (
    <section
      id="kontakt"
      style={{
        padding: '72px clamp(24px,6vw,96px) 64px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 80% 60% at 20% 50%, rgba(0,87,255,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 80% 30%, rgba(0,40,180,0.08) 0%, transparent 55%)
          `,
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: 'clamp(40px,6vw,80px)',
          alignItems: 'start',
          position: 'relative',
          zIndex: 1,
          maxWidth: '1100px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <div>
          <motion.p
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            style={{
              fontFamily: 'monospace',
              fontSize: '9px',
              letterSpacing: '0.3em',
              color: 'rgba(255,255,255,0.2)',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            ZAČNIME SPOLUPRÁCU
          </motion.p>

          <motion.h2
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(36px,5.5vw,80px)',
              lineHeight: 0.88,
              letterSpacing: '-0.04em',
              color: '#FFFFFF',
              marginBottom: '24px',
            }}
          >
            Prémiový<br />
            web.<br />
            <span
              style={{
                background:
                  'linear-gradient(135deg, #4A8FFF 0%, #00D4FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Váš výsledok.
            </span>
          </motion.h2>

          <motion.p
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(14px,1.1vw,17px)',
              color: 'rgba(255,255,255,0.4)',
              lineHeight: 1.75,
              maxWidth: '380px',
              marginBottom: '48px',
            }}
          >
            SB DESIGN nie je pre každého. Pracujeme s klientmi, ktorí chápu
            hodnotu prémiového webu. Konzultácia je vždy bezplatná.
          </motion.p>

          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            {[
              {
                label: 'Email',
                value: 'biben@sbdesign.sk',
                href: 'mailto:biben@sbdesign.sk',
              },
              { label: 'Lokalita', value: 'Slovensko · Remote', href: null },
            ].map((item) => (
              <div
                key={item.label}
                style={{ display: 'flex', gap: '20px', alignItems: 'center' }}
              >
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '8px',
                    letterSpacing: '0.2em',
                    color: 'rgba(255,255,255,0.2)',
                    textTransform: 'uppercase',
                    minWidth: '60px',
                  }}
                >
                  {item.label}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 500,
                      fontSize: '15px',
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = '#00D4FF')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')
                    }
                  >
                    {item.value}
                  </a>
                ) : (
                  <span
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 500,
                      fontSize: '15px',
                      color: 'rgba(255,255,255,0.4)',
                    }}
                  >
                    {item.value}
                  </span>
                )}
              </div>
            ))}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginTop: '8px',
              }}
            >
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#0057FF',
                  boxShadow: '0 0 8px rgba(0,87,255,0.6)',
                }}
              />
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: '9px',
                  letterSpacing: '0.18em',
                  color: 'rgba(0,87,255,0.8)',
                  textTransform: 'uppercase',
                }}
              >
                Kapacita sa míňa · Q2 2026
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            {formState === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  padding: '64px 48px',
                  border: '1px solid rgba(0,87,255,0.3)',
                  background: 'rgba(0,87,255,0.04)',
                  textAlign: 'center',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    border: '1px solid rgba(0,87,255,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path
                      d="M4 11l5 5 9-9"
                      stroke="#0057FF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 900,
                    fontSize: '28px',
                    color: '#FFFFFF',
                    letterSpacing: '-0.02em',
                    marginBottom: '12px',
                  }}
                >
                  Správa odoslaná.
                </h3>
                <p
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: '15px',
                    color: 'rgba(255,255,255,0.4)',
                    lineHeight: 1.6,
                  }}
                >
                  Ozvem sa vám do 24 hodín.
                  <br />
                  Tešte sa na váš nový web.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                ref={formRef}
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                  }}
                >
                  <div>
                    <label htmlFor="name" style={labelStyle}>
                      Meno *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Ján Novák"
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      style={inputStyle('name')}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" style={labelStyle}>
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="jan@firma.sk"
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      style={inputStyle('email')}
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Záujem o</label>
                  <div
                    style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}
                  >
                    {services.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() =>
                          setSelectedService(s === selectedService ? '' : s)
                        }
                        style={{
                          fontFamily: 'monospace',
                          fontSize: '9px',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          padding: '8px 14px',
                          border: `1px solid ${
                            selectedService === s
                              ? 'rgba(0,87,255,0.7)'
                              : 'rgba(255,255,255,0.1)'
                          }`,
                          background:
                            selectedService === s
                              ? 'rgba(0,87,255,0.12)'
                              : 'transparent',
                          color:
                            selectedService === s
                              ? '#FFFFFF'
                              : 'rgba(255,255,255,0.35)',
                          cursor: 'pointer',
                          borderRadius: 0,
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" style={labelStyle}>
                    Správa *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Popíšte váš projekt, ciele, termín..."
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    style={{
                      ...inputStyle('message'),
                      resize: 'vertical',
                      minHeight: '120px',
                      fontFamily: 'Syne, sans-serif',
                    }}
                  />
                </div>

                {formState === 'error' && (
                  <p
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '10px',
                      letterSpacing: '0.1em',
                      color: 'rgba(255,80,80,0.8)',
                      padding: '10px 14px',
                      border: '1px solid rgba(255,80,80,0.2)',
                      background: 'rgba(255,80,80,0.04)',
                    }}
                  >
                    {errorMsg}
                  </p>
                )}

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    cursor: 'pointer',
                  }}
                  onClick={() => setGdprChecked(!gdprChecked)}
                >
                  <div
                    style={{
                      width: '16px',
                      height: '16px',
                      minWidth: '16px',
                      marginTop: '2px',
                      border: `1px solid ${gdprChecked ? '#0057FF' : 'rgba(255,255,255,0.2)'}`,
                      background: gdprChecked ? 'rgba(0,87,255,0.2)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                      flexShrink: 0,
                    }}
                  >
                    {gdprChecked && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path
                          d="M1.5 5l2.5 2.5 4.5-4.5"
                          stroke="#0057FF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '9px',
                      letterSpacing: '0.1em',
                      color: 'rgba(255,255,255,0.3)',
                      lineHeight: 1.6,
                      userSelect: 'none',
                    }}
                  >
                    Súhlasím so spracovaním osobných údajov v súlade s{' '}
                    <a
                      href="/ochrana-osobnych-udajov"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        color: 'rgba(0,212,255,0.6)',
                        textDecoration: 'underline',
                        textUnderlineOffset: '2px',
                      }}
                    >
                      Ochranou osobných údajov
                    </a>
                    . Údaje budú použité výlučne na zodpovedanie vašej správy.
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  style={{
                    padding: '18px 32px',
                    background:
                      formState === 'loading'
                        ? 'rgba(0,87,255,0.25)'
                        : 'linear-gradient(135deg, rgba(0,87,255,0.85), rgba(0,60,180,0.85))',
                    border: '1px solid rgba(0,87,255,0.6)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
                    borderRadius: 0,
                    fontFamily: 'monospace',
                    fontSize: '10px',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: '#FFFFFF',
                    cursor:
                      formState === 'loading' ? 'not-allowed' : 'pointer',
                    transition: 'all 0.25s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                  }}
                  onMouseEnter={(e) => {
                    if (formState !== 'loading') {
                      e.currentTarget.style.background = 'rgba(0,87,255,1)'
                      e.currentTarget.style.boxShadow =
                        '0 0 30px rgba(0,87,255,0.4)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      formState === 'loading'
                        ? 'rgba(0,87,255,0.3)'
                        : 'linear-gradient(135deg, rgba(0,87,255,0.85), rgba(0,60,180,0.85))'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {formState === 'loading' ? (
                    <>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        style={{ animation: 'spin 1s linear infinite' }}
                      >
                        <circle
                          cx="7"
                          cy="7"
                          r="5.5"
                          stroke="rgba(255,255,255,0.3)"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M7 1.5A5.5 5.5 0 0112.5 7"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      Odosiela sa...
                    </>
                  ) : (
                    <>
                      Odoslať správu
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M1 11L11 1M11 1H4M11 1V8"
                          stroke="white"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </>
                  )}
                </button>

                <p
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '8px',
                    letterSpacing: '0.12em',
                    color: 'rgba(255,255,255,0.18)',
                    textTransform: 'uppercase',
                  }}
                >
                  * Povinné polia · Odpoveď do 24 hodín
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        input::placeholder, textarea::placeholder {
          color: rgba(255,255,255,0.2);
          font-family: 'Syne', sans-serif;
        }
        input, textarea, button {
          -webkit-appearance: none;
        }
      `}</style>
    </section>
  )
}
