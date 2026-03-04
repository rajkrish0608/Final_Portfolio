'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FormState {
    name: string
    email: string
    subject: string
    message: string
}

interface RepulsorFormProps {
    onSuccess?: () => void
}

export function RepulsorForm({ onSuccess }: RepulsorFormProps) {
    const formRef = useRef<HTMLFormElement>(null)
    const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' })
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
    const [fired, setFired] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('sending')
        setFired(true)

        // Simulate sending (replace with EmailJS in production)
        await new Promise(resolve => setTimeout(resolve, 2000))

        try {
            // EmailJS integration placeholder
            // await emailjs.send('SERVICE_ID', 'TEMPLATE_ID', form, 'PUBLIC_KEY')
            setStatus('success')
            setForm({ name: '', email: '', subject: '', message: '' })
            onSuccess?.()
        } catch {
            setStatus('error')
        } finally {
            setTimeout(() => { setStatus('idle'); setFired(false) }, 4000)
        }
    }

    const inputClasses = `
    w-full bg-[#0d0d1a] border border-[#00d4ff22] rounded-lg px-5 py-4
    font-rajdhani text-base text-[#e8f4f8] placeholder-[#8bb8cc55]
    focus:border-[#00d4ff88] focus:outline-none focus:ring-1 focus:ring-[#00d4ff33]
    focus:shadow-[0_0_15px_rgba(0,212,255,0.1)]
    transition-all duration-300
    hover:border-[#00d4ff44]
  `

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            {/* Name + Email row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="relative">
                    <label className="font-mono-hud text-[9px] text-[#00d4ff] tracking-[0.25em] block mb-2 opacity-70">
                        [ NAME ]
                    </label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Identify yourself"
                        className={inputClasses}
                    />
                </div>
                <div className="relative">
                    <label className="font-mono-hud text-[9px] text-[#00d4ff] tracking-[0.25em] block mb-2 opacity-70">
                        [ EMAIL ]
                    </label>
                    <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="comms@channel.net"
                        className={inputClasses}
                    />
                </div>
            </div>

            {/* Subject */}
            <div>
                <label className="font-mono-hud text-[9px] text-[#00d4ff] tracking-[0.25em] block mb-2 opacity-70">
                    [ SUBJECT ]
                </label>
                <input
                    type="text"
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Mission briefing..."
                    className={inputClasses}
                />
            </div>

            {/* Message */}
            <div>
                <label className="font-mono-hud text-[9px] text-[#00d4ff] tracking-[0.25em] block mb-2 opacity-70">
                    [ MESSAGE ]
                </label>
                <textarea
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Transmit your message..."
                    className={`${inputClasses} resize-none`}
                />
            </div>

            {/* Submit Button — Repulsor Fire */}
            <div className="pt-2">
                <motion.button
                    type="submit"
                    disabled={status === 'sending' || status === 'success'}
                    className="relative w-full md:w-auto min-w-[260px] overflow-hidden rounded-lg px-10 py-4 font-orbitron font-bold text-sm tracking-widest transition-all duration-300"
                    style={{
                        background: status === 'success'
                            ? 'linear-gradient(135deg, #00ff8844, #00d4ff44)'
                            : 'linear-gradient(135deg, #00d4ff22, #0047ff22)',
                        border: `1px solid ${status === 'success' ? '#00ff8866' : '#00d4ff44'}`,
                        color: status === 'success' ? '#00ff88' : '#00d4ff',
                    }}
                    whileTap={{ scale: 0.97 }}
                >
                    {/* Repulsor blast animation */}
                    <AnimatePresence>
                        {fired && (
                            <motion.div
                                key="blast"
                                className="absolute inset-0 rounded-lg"
                                initial={{ opacity: 0.8, scale: 0.8 }}
                                animate={{ opacity: 0, scale: 2 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                                style={{
                                    background: 'radial-gradient(circle, #00d4ff55 0%, transparent 70%)',
                                    transformOrigin: 'center',
                                }}
                            />
                        )}
                    </AnimatePresence>

                    {status === 'idle' && '⚡ FIRE TRANSMISSION'}
                    {status === 'sending' && (
                        <span className="flex items-center justify-center gap-3">
                            <span className="w-3 h-3 rounded-full bg-[#00d4ff] animate-ping" />
                            TRANSMITTING...
                        </span>
                    )}
                    {status === 'success' && '✓ SIGNAL RECEIVED'}
                    {status === 'error' && '⚠ TRANSMISSION FAILED — RETRY'}
                </motion.button>
            </div>
        </form>
    )
}
