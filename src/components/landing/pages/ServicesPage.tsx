import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import Icon from '@/components/ui/icon'

const services = [
  {
    icon: 'Lightbulb',
    title: 'Умное освещение',
    description: 'Автоматическое управление светом по расписанию, присутствию или голосовым командам. Экономия электроэнергии до 40%.',
    price: 'от 25 000 ₽',
  },
  {
    icon: 'Thermometer',
    title: 'Климат-контроль',
    description: 'Умные термостаты и вентиляция. Система сама поддерживает комфортную температуру и качество воздуха.',
    price: 'от 35 000 ₽',
  },
  {
    icon: 'Camera',
    title: 'Безопасность и видеонаблюдение',
    description: 'IP-камеры, датчики движения, умные замки и сигнализация с уведомлениями на смартфон.',
    price: 'от 45 000 ₽',
  },
  {
    icon: 'Wifi',
    title: 'Мультимедиа и аудио',
    description: 'Мультирумовая акустика, умный телевизор и медиасервер. Музыка и кино в любой комнате.',
    price: 'от 30 000 ₽',
  },
  {
    icon: 'Zap',
    title: 'Энергоменеджмент',
    description: 'Мониторинг и оптимизация потребления электроэнергии. Управление розетками и бытовыми приборами.',
    price: 'от 20 000 ₽',
  },
  {
    icon: 'Shield',
    title: 'Умный дом «под ключ»',
    description: 'Полная автоматизация всего дома: от проектирования до монтажа и обучения. Единая система управления.',
    price: 'от 150 000 ₽',
  },
]

const servicesSections = [
  { id: 'services-hero', title: 'Наши услуги.', badge: 'Автоматизация любой сложности' },
  { id: 'services-list', title: null },
  {
    id: 'services-process',
    title: 'Как мы работаем?',
    steps: [
      { num: '01', label: 'Консультация', desc: 'Выезд специалиста и оценка объекта' },
      { num: '02', label: 'Проектирование', desc: 'Разработка схемы и выбор оборудования' },
      { num: '03', label: 'Монтаж', desc: 'Профессиональная установка и настройка' },
      { num: '04', label: 'Обучение', desc: 'Объясним, как пользоваться системой' },
    ]
  },
]

interface ServicesPageProps {
  onNavigate: (page: string) => void
}

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  const [activeSection, setActiveSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: containerRef })
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollPosition = containerRef.current.scrollTop
        const windowHeight = window.innerHeight
        setActiveSection(Math.floor(scrollPosition / windowHeight))
      }
    }
    const container = containerRef.current
    if (container) container.addEventListener('scroll', handleScroll)
    return () => { if (container) container.removeEventListener('scroll', handleScroll) }
  }, [])

  const handleNavClick = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: index * window.innerHeight, behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
        {servicesSections.map((_, index) => (
          <button
            key={index}
            onClick={() => handleNavClick(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${index === activeSection ? 'bg-[#00C2FF] scale-150' : 'bg-white/30 hover:bg-white/60'}`}
          />
        ))}
      </nav>

      <motion.div className="fixed top-0 left-0 right-0 h-0.5 bg-[#00C2FF] origin-left z-40" style={{ scaleX }} />

      <div ref={containerRef} className="h-full overflow-y-auto snap-y snap-mandatory pt-16">
        <section className="relative h-screen w-full snap-start flex flex-col justify-center px-8 md:px-16 lg:px-24 pb-20">
          <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={activeSection === 0 ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            <Badge variant="outline" className="text-[#00C2FF] border-[#00C2FF] text-sm px-4 py-1">
              Автоматизация любой сложности
            </Badge>
          </motion.div>
          <motion.h2
            className="text-4xl md:text-6xl lg:text-[5rem] xl:text-[6rem] font-bold leading-[1.1] tracking-tight max-w-4xl text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={activeSection === 0 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Наши услуги.
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl max-w-2xl mt-6 text-neutral-400"
            initial={{ opacity: 0, y: 30 }}
            animate={activeSection === 0 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Полный спектр решений для автоматизации квартир, домов и коммерческих объектов.
          </motion.p>
        </section>

        <section className="relative min-h-screen w-full snap-start flex flex-col justify-center px-8 md:px-16 lg:px-24 py-24">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl"
            initial={{ opacity: 0, y: 40 }}
            animate={activeSection === 1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {services.map((service, i) => (
              <motion.div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#00C2FF]/50 transition-all group"
                initial={{ opacity: 0, y: 20 }}
                animate={activeSection === 1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#00C2FF]/10 border border-[#00C2FF]/20 flex items-center justify-center mb-4 group-hover:bg-[#00C2FF]/20 transition-all">
                  <Icon name={service.icon as 'Home'} size={20} className="text-[#00C2FF]" />
                </div>
                <h3 className="text-white font-semibold text-base mb-2">{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{service.description}</p>
                <span className="text-[#00C2FF] font-semibold text-sm">{service.price}</span>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="relative h-screen w-full snap-start flex flex-col justify-center px-8 md:px-16 lg:px-24 pb-20">
          <motion.h2
            className="text-4xl md:text-6xl font-bold leading-tight text-white mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={activeSection === 2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Как мы работаем?
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl"
            initial={{ opacity: 0, y: 30 }}
            animate={activeSection === 2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {[
              { num: '01', label: 'Консультация', desc: 'Выезд специалиста и оценка объекта' },
              { num: '02', label: 'Проектирование', desc: 'Разработка схемы и выбор оборудования' },
              { num: '03', label: 'Монтаж', desc: 'Профессиональная установка и настройка' },
              { num: '04', label: 'Обучение', desc: 'Объясним, как пользоваться системой' },
            ].map((step, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="text-[#00C2FF] text-3xl font-bold mb-3">{step.num}</div>
                <h3 className="text-white font-semibold text-base mb-2">{step.label}</h3>
                <p className="text-white/50 text-sm">{step.desc}</p>
              </div>
            ))}
          </motion.div>
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={activeSection === 2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button
              onClick={() => onNavigate('contacts')}
              className="bg-[#00C2FF] hover:bg-[#00A8E0] text-black font-semibold px-8 py-3 rounded-full text-base transition-all"
            >
              Заказать проект
            </button>
          </motion.div>
        </section>
      </div>
    </>
  )
}
