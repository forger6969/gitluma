import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  Moon, Globe, Volume2, VolumeX, Bell, BellOff, Mail,
  LogOut, User, ChevronRight, Check, Music, Zap, Wind
} from 'lucide-react'
import { toggleTheme } from '../store/slices/themeSlice'
import { logout } from '../store/slices/authSlice'

// ─── Sound options ────────────────────────────────────────────────────────────

const SOUNDS = [
  { id: 'default',  label: 'Default',  file: '/notification.wav',     icon: Bell },
  { id: 'chime',   label: 'Chime',    file: '/sounds/chime.wav',     icon: Music },
  { id: 'pulse',   label: 'Pulse',    file: '/sounds/pulse.wav',     icon: Zap  },
  { id: 'soft',    label: 'Soft',     file: '/sounds/soft.wav',      icon: Wind },
]

// ─── Language options ─────────────────────────────────────────────────────────

const LANGS = [
  { code: 'uz', label: "O'zbekcha", flag: '🇺🇿' },
  { code: 'ru', label: 'Русский',   flag: '🇷🇺' },
  { code: 'en', label: 'English',   flag: '🇺🇸' },
]

// ─── Toggle ───────────────────────────────────────────────────────────────────

const Toggle = ({ checked, onChange, disabled }) => (
  <label className={`relative inline-flex items-center cursor-pointer select-none ${disabled ? 'opacity-40 pointer-events-none' : ''}`}>
    <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} className="sr-only peer" />
    <div className={`
      w-11 h-6 rounded-full transition-colors duration-200 relative
      peer-checked:bg-[#E8654A] bg-[#D8DCE8]
      after:content-[''] after:absolute after:top-0.5 after:left-0.5
      after:bg-white after:rounded-full after:h-5 after:w-5
      after:transition-all after:duration-200 after:shadow-sm
      peer-checked:after:translate-x-5
    `} />
  </label>
)

// ─── Icon Box ─────────────────────────────────────────────────────────────────

const IconBox = ({ icon: Icon, bgColor, iconColor }) => (
  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: bgColor }}>
    <Icon className="w-[17px] h-[17px]" style={{ color: iconColor }} />
  </div>
)

// ─── Setting Row ──────────────────────────────────────────────────────────────

const SettingRow = ({ icon, bgColor, iconColor, title, subtitle, right, d, last, dimmed }) => (
  <div className={`
    flex justify-between items-center py-3.5 transition-opacity duration-200
    ${dimmed ? 'opacity-40' : 'opacity-100'}
    ${!last ? `border-b ${d ? 'border-[#2B3141]' : 'border-[#EEF1F7]'}` : ''}
  `}>
    <div className="flex items-center gap-3.5 min-w-0">
      <IconBox icon={icon} bgColor={bgColor} iconColor={iconColor} />
      <div className="min-w-0">
        <p className={`text-sm font-semibold truncate ${d ? 'text-[#EEF1F7]' : 'text-[#2B3141]'}`}>{title}</p>
        {subtitle && (
          <p className={`text-xs mt-0.5 truncate ${d ? 'text-[#5C6480]' : 'text-[#7A8499]'}`}>{subtitle}</p>
        )}
      </div>
    </div>
    <div className="shrink-0 ml-4">{right}</div>
  </div>
)

// ─── Section Card ─────────────────────────────────────────────────────────────

const SectionCard = ({ label, children, d, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
    className={`rounded-xl px-5 pt-4 pb-1 border shadow-sm transition-colors duration-200 ${d ? 'bg-[#161B27] border-[#2B3141]' : 'bg-white border-[#E6E9F2]'}`}
  >
    <p className={`text-[11px] font-bold uppercase tracking-widest mb-1 ${d ? 'text-[#5C6480]' : 'text-[#7A8499]'}`}>
      {label}
    </p>
    {children}
  </motion.div>
)

// ─── Language Modal ───────────────────────────────────────────────────────────

const LangModal = ({ d, current, onSelect, onClose }) => (
  <AnimatePresence>
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      />

      {/* Sheet */}
      <motion.div
        className={`relative z-10 w-full sm:w-80 rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl border
          ${d ? 'bg-[#161B27] border-[#2B3141]' : 'bg-white border-[#E6E9F2]'}`}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      >
        <p className={`text-[11px] font-bold uppercase tracking-widest mb-4 ${d ? 'text-[#5C6480]' : 'text-[#7A8499]'}`}>
          Tilni tanlang
        </p>

        <div className="flex flex-col gap-1">
          {LANGS.map(l => {
            const active = l.code === current
            return (
              <motion.button
                key={l.code}
                whileTap={{ scale: 0.97 }}
                onClick={() => { onSelect(l.code); onClose() }}
                className={`
                  flex items-center justify-between px-4 py-3 rounded-xl w-full text-left transition-colors
                  ${active
                    ? d ? 'bg-[#E8654A]/15 text-[#F0997B]' : 'bg-[#FFF3EE] text-[#E8654A]'
                    : d ? 'hover:bg-[#1E2235] text-[#C8CDD9]' : 'hover:bg-[#F4F6FB] text-[#2B3141]'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{l.flag}</span>
                  <span className="text-sm font-semibold">{l.label}</span>
                </div>
                {active && <Check className="w-4 h-4" />}
              </motion.button>
            )
          })}
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
)

// ─── Sound Picker (inline expanded) ──────────────────────────────────────────

const SoundPicker = ({ d, current, onSelect, disabled }) => (
  <AnimatePresence>
    {!disabled && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.22 }}
        className="overflow-hidden"
      >
        <div className={`mx-0 mb-3 rounded-xl overflow-hidden border ${d ? 'border-[#2B3141] bg-[#0E1118]' : 'border-[#EEF1F7] bg-[#F4F6FB]'}`}>
          <p className={`text-[10px] font-bold uppercase tracking-widest px-4 pt-3 pb-2 ${d ? 'text-[#5C6480]' : 'text-[#7A8499]'}`}>
            Bildirishnoma ovozi
          </p>
          {SOUNDS.map((s, i) => {
            const active = s.id === current
            const Icon = s.icon
            return (
              <motion.button
                key={s.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(s.id)}
                className={`
                  flex items-center justify-between w-full px-4 py-2.5 transition-colors
                  ${i !== SOUNDS.length - 1 ? `border-b ${d ? 'border-[#2B3141]' : 'border-[#E6E9F2]'}` : ''}
                  ${active
                    ? d ? 'bg-[#E8654A]/10' : 'bg-[#FFF3EE]'
                    : d ? 'hover:bg-[#1E2235]' : 'hover:bg-white'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center
                    ${active
                      ? d ? 'bg-[#E8654A]/20' : 'bg-[#FFE5DA]'
                      : d ? 'bg-[#2B3141]' : 'bg-white'
                    }`}>
                    <Icon className="w-3.5 h-3.5" style={{ color: active ? '#E8654A' : d ? '#5C6480' : '#7A8499' }} />
                  </div>
                  <span className={`text-sm font-medium ${active ? (d ? 'text-[#F0997B]' : 'text-[#E8654A]') : (d ? 'text-[#C8CDD9]' : 'text-[#2B3141]')}`}>
                    {s.label}
                  </span>
                </div>
                {active && <Check className="w-3.5 h-3.5" style={{ color: '#E8654A' }} />}
              </motion.button>
            )
          })}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
)

// ─── Main Settings Page ───────────────────────────────────────────────────────

const Settings = () => {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation()

  const d = useSelector(s => s.theme.mode) === 'dark'
  const { user } = useSelector(s => s.user)
  const u = user?.user

  const [pushEnabled, setPushEnabled] = useState(
    () => localStorage.getItem('gl-push') !== 'false'
  )
  const [soundEnabled, setSoundEnabled] = useState(
    () => localStorage.getItem('gl-sound') !== 'false'
  )
  const [selectedSound, setSelectedSound] = useState(
    () => localStorage.getItem('gl-sound-id') || 'default'
  )
  const [emailEnabled, setEmailEnabled] = useState(
    () => localStorage.getItem('gl-email') === 'true'
  )
  const [lang, setLang] = useState(i18n.language || 'en')
  const [showLangModal, setShowLangModal] = useState(false)

  // Push o'chirilsa — ovoz ham o'chadi
  const handlePush = (val) => {
    setPushEnabled(val)
    localStorage.setItem('gl-push', val)
    if (!val) {
      setSoundEnabled(false)
      localStorage.setItem('gl-sound', false)
    }
  }

  const handleSound = (val) => {
    if (!pushEnabled) return
    setSoundEnabled(val)
    localStorage.setItem('gl-sound', val)
  }

  const handleSoundSelect = (id) => {
    setSelectedSound(id)
    localStorage.setItem('gl-sound-id', id)
    // preview sound
    try {
      const s = SOUNDS.find(s => s.id === id)
      if (s) {
        const a = new Audio(s.file)
        a.volume = 0.4
        a.play().catch(() => {})
      }
    } catch {}
  }

  const handleLang = (code) => {
    setLang(code)
    i18n.changeLanguage(code)
    localStorage.setItem('gl-lang', code)
  }

  const currentLang = LANGS.find(l => l.code === lang) || LANGS[2]
  const h = d ? 'text-[#EEF1F7]' : 'text-[#2B3141]'
  const m = d ? 'text-[#5C6480]' : 'text-[#7A8499]'

  return (
    <>
      <div className="mx-5 my-4 flex flex-col gap-5 font-sans">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className={`text-2xl font-bold tracking-tight ${h}`}>Настройки</h1>
          <p className={`text-sm mt-1 ${m}`}>Управление настройками</p>
        </motion.div>

        {/* ── Appearance ── */}
        <SectionCard label="Внешний вид" d={d} delay={0.05}>

          <SettingRow
            d={d}
            icon={Moon}
            bgColor={d ? 'rgba(232,101,74,0.13)' : '#FFF3EE'}
            iconColor={d ? '#F0997B' : '#E8654A'}
            title="Тёмный режим"
            subtitle="Переключиться на тёмную тему"
            right={<Toggle checked={d} onChange={() => dispatch(toggleTheme())} />}
          />

          {/* Language — button opens modal */}
          <div className={`flex justify-between items-center py-3.5`}>
            <div className="flex items-center gap-3.5 min-w-0">
              <IconBox
                icon={Globe}
                bgColor={d ? 'rgba(59,130,246,0.13)' : '#DAE9FF'}
                iconColor={d ? '#85B7EB' : '#3B82F6'}
              />
              <div>
                <p className={`text-sm font-semibold ${h}`}>Язык</p>
                <p className={`text-xs mt-0.5 ${m}`}>Выберите язык интерфейса</p>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowLangModal(true)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-semibold
                transition-colors duration-200 shrink-0 ml-4
                ${d
                  ? 'bg-[#1E2235] border-[#2B3141] text-[#EEF1F7] hover:bg-[#252B40]'
                  : 'bg-[#F4F6FB] border-[#E6E9F2] text-[#2B3141] hover:bg-[#EEF1F7]'
                }
              `}
            >
              <span className="text-base">{currentLang.flag}</span>
              <span>{currentLang.label}</span>
              <ChevronRight className={`w-3.5 h-3.5 ${m}`} />
            </motion.button>
          </div>

        </SectionCard>

        {/* ── Notifications ── */}
        <SectionCard label="Уведомления" d={d} delay={0.1}>

          {/* Push */}
          <SettingRow
            d={d}
            icon={pushEnabled ? Bell : BellOff}
            bgColor={d ? 'rgba(249,115,22,0.13)' : '#FFE5DA'}
            iconColor={d ? '#F0997B' : '#F97316'}
            title="Push-уведомления"
            subtitle="Уведомления в браузере"
            right={
              <Toggle
                checked={pushEnabled}
                onChange={e => handlePush(e.target.checked)}
              />
            }
          />

          {/* Sound — disabled when push is off */}
          <SettingRow
            d={d}
            icon={soundEnabled && pushEnabled ? Volume2 : VolumeX}
            bgColor={d ? 'rgba(34,197,94,0.13)' : '#D4F0E1'}
            iconColor={d ? '#5DCAA5' : '#22C55E'}
            title="Звук"
            subtitle={pushEnabled ? 'Звук при новом уведомлении' : 'Push отключён — звук недоступен'}
            dimmed={!pushEnabled}
            right={
              <Toggle
                checked={soundEnabled && pushEnabled}
                onChange={e => handleSound(e.target.checked)}
                disabled={!pushEnabled}
              />
            }
          />

          {/* Sound picker — only visible when both push & sound are on */}
          <SoundPicker
            d={d}
            current={selectedSound}
            onSelect={handleSoundSelect}
            disabled={!pushEnabled || !soundEnabled}
          />

          {/* Email */}
          <SettingRow
            d={d} last
            icon={Mail}
            bgColor={d ? 'rgba(6,182,212,0.13)' : '#CBF0F9'}
            iconColor={d ? '#67D4E8' : '#06B6D4'}
            title="Email-уведомления"
            subtitle="Уведомления на почту"
            right={
              <Toggle
                checked={emailEnabled}
                onChange={e => {
                  setEmailEnabled(e.target.checked)
                  localStorage.setItem('gl-email', e.target.checked)
                }}
              />
            }
          />
        </SectionCard>

        {/* ── Account ── */}
        <SectionCard label="Аккаунт" d={d} delay={0.15}>

          {u && (
            <SettingRow
              d={d}
              icon={User}
              bgColor={d ? 'rgba(139,92,246,0.13)' : '#EDE9FE'}
              iconColor={d ? '#A78BFA' : '#7C3AED'}
              title={u.username || u.login}
              subtitle={u.email || 'GitHub Account'}
              right={
                u.avatar_url && (
                  <img src={u.avatar_url} alt="" className="w-8 h-8 rounded-full object-cover ring-2 ring-[#E8654A]/20" />
                )
              }
            />
          )}

          <SettingRow
            d={d} last
            icon={LogOut}
            bgColor={d ? 'rgba(232,101,74,0.13)' : '#FFF3EE'}
            iconColor={d ? '#F0997B' : '#E8654A'}
            title="Выйти"
            subtitle="Выйти из аккаунта"
            right={
              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                onClick={() => dispatch(logout())}
                className={`
                  text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200
                  ${d
                    ? 'bg-[#E8654A]/10 text-[#F0997B] hover:bg-[#E8654A]/20'
                    : 'bg-[#FFF0ED] text-[#E8654A] hover:bg-[#FFE0D9] border border-[#FFDDD6]'
                  }
                `}
              >
                Выйти
              </motion.button>
            }
          />
        </SectionCard>

        {/* Version */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="flex justify-center pb-2"
        >
          <span className={`text-xs px-3 py-1.5 rounded-full border ${d ? 'border-[#2B3141] text-[#5C6480]' : 'border-[#E6E9F2] text-[#7A8499]'}`}>
            GitLens v1.0.0
          </span>
        </motion.div>

      </div>

      {showLangModal && (
        <LangModal
          d={d}
          current={lang}
          onSelect={handleLang}
          onClose={() => setShowLangModal(false)}
        />
      )}
    </>
  )
}

export default Settings