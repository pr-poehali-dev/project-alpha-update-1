import { useState } from 'react'
import { motion } from 'framer-motion'
import Icon from '@/components/ui/icon'

const contacts = [
  { icon: 'Phone', label: 'Телефон', value: '+7 (800) 123-45-67', sub: 'Бесплатно по России' },
  { icon: 'Mail', label: 'Email', value: 'info@smarthome.ru', sub: 'Ответим в течение часа' },
  { icon: 'MapPin', label: 'Адрес', value: 'Москва, ул. Инновационная, 12', sub: 'Офис и шоурум' },
  { icon: 'Clock', label: 'Режим работы', value: 'Пн–Вс: 9:00 – 21:00', sub: 'Без выходных' },
]

export default function ContactsPage() {
  const [form, setForm] = useState({ name: '', phone: '', comment: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="h-full overflow-y-auto snap-y snap-mandatory pt-16">
      <section className="relative min-h-screen w-full snap-start flex flex-col justify-center px-8 md:px-16 lg:px-24 py-24 pb-32">
        <motion.h2
          className="text-4xl md:text-6xl lg:text-[5rem] font-bold leading-tight text-white mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Свяжитесь с нами.
        </motion.h2>
        <motion.p
          className="text-lg text-neutral-400 mb-12 max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Оставьте заявку — и мы свяжемся с вами в течение 15 минут.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div>
            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-white/60 text-sm mb-1.5 block">Ваше имя</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Иван Иванов"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#00C2FF]/60 transition-all"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-sm mb-1.5 block">Телефон</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+7 (999) 000-00-00"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#00C2FF]/60 transition-all"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-sm mb-1.5 block">Комментарий</label>
                  <textarea
                    rows={4}
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    placeholder="Расскажите о вашем объекте..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#00C2FF]/60 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#00C2FF] hover:bg-[#00A8E0] text-black font-semibold py-3 rounded-xl text-base transition-all"
                >
                  Отправить заявку
                </button>
                <p className="text-white/30 text-xs text-center">Нажимая кнопку, вы соглашаетесь с политикой обработки данных</p>
              </form>
            ) : (
              <div className="bg-white/5 border border-[#00C2FF]/30 rounded-2xl p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-[#00C2FF]/10 flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle" size={32} className="text-[#00C2FF]" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-2">Заявка отправлена!</h3>
                <p className="text-white/50 text-sm">Мы свяжемся с вами в течение 15 минут.</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
            {contacts.map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="w-9 h-9 rounded-xl bg-[#00C2FF]/10 flex items-center justify-center mb-3">
                  <Icon name={item.icon as 'Home'} size={18} className="text-[#00C2FF]" />
                </div>
                <div className="text-white/40 text-xs mb-1">{item.label}</div>
                <div className="text-white text-sm font-medium">{item.value}</div>
                <div className="text-white/40 text-xs mt-0.5">{item.sub}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  )
}
