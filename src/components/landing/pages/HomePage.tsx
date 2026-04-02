import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import Icon from '@/components/ui/icon'

const homeSections = [
  {
    id: 'hero',
    badge: 'Новое поколение жилья',
    title: 'Умный дом под ключ.',
    content: null,
    showButton: true,
    buttonText: 'Узнать стоимость',
  },
  {
    id: 'about',
    badge: null,
    title: 'Мы автоматизируем ваш дом.',
    content: 'Проектируем и устанавливаем системы «Умный дом» любой сложности. Управляйте светом, климатом, безопасностью и бытовыми приборами с одного экрана смартфона.',
    showButton: false,
    buttonText: null,
  },
  {
    id: 'why',
    badge: null,
    title: 'Почему выбирают нас?',
    content: null,
    showButton: false,
    buttonText: null,
    features: [
      { icon: 'ShieldCheck', text: '5 лет гарантии на все работы' },
      { icon: 'Clock', text: 'Монтаж от 1 дня' },
      { icon: 'Headphones', text: 'Поддержка 24/7' },
      { icon: 'Award', text: 'Более 300 реализованных объектов' },
    ]
  },
  {
    id: 'cta',
    badge: null,
    title: 'Готовы к умной жизни?',
    content: 'Оставьте заявку — наш специалист свяжется с вами в течение 15 минут и ответит на все вопросы.',
    showButton: true,
    buttonText: 'Получить консультацию',
  },
]

interface HomePageProps {
  onNavigate: (page: string) => void
}

export default function HomePage({ onNavigate }: HomePageProps) {
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
        {homeSections.map((_, index) => (
          <button
            key={index}
            onClick={() => handleNavClick(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${index === activeSection ? 'bg-[#00C2FF] scale-150' : 'bg-white/30 hover:bg-white/60'}`}
          />
        ))}
      </nav>

      <motion.div className="fixed top-0 left-0 right-0 h-0.5 bg-[#00C2FF] origin-left z-40" style={{ scaleX }} />

      <div ref={containerRef} className="h-full overflow-y-auto snap-y snap-mandatory pt-16">
        {homeSections.map((section, index) => {
          const isActive = index === activeSection
          return (
            <section key={section.id} id={section.id} className="relative h-screen w-full snap-start flex flex-col justify-center px-8 md:px-16 lg:px-24 pb-20">
              {section.id === 'hero' && (
                <div className="absolute inset-0 z-0">
                  <img
                    src="https://cdn.poehali.dev/projects/25e90077-3a4d-4984-a4c3-3999f65986ea/files/770f21fc-7200-46e2-8d97-1358a52e7bf7.jpg"
                    alt="Умный дом"
                    className="w-full h-full object-cover opacity-25"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                </div>
              )}
              {section.badge && (
                <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={isActive ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
                  <Badge variant="outline" className="text-[#00C2FF] border-[#00C2FF] text-sm px-4 py-1">
                    {section.badge}
                  </Badge>
                </motion.div>
              )}

              <motion.h2
                className="text-4xl md:text-6xl lg:text-[5rem] xl:text-[6rem] font-bold leading-[1.1] tracking-tight max-w-4xl text-white"
                initial={{ opacity: 0, y: 50 }}
                animate={isActive ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                {section.title}
              </motion.h2>

              {section.content && (
                <motion.p
                  className="text-lg md:text-xl lg:text-2xl max-w-2xl mt-6 text-neutral-400"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isActive ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {section.content}
                </motion.p>
              )}

              {section.features && (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 max-w-2xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isActive ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {section.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-4">
                      <Icon name={feature.icon as 'Home'} size={20} className="text-[#00C2FF] flex-shrink-0" />
                      <span className="text-white/80 text-sm">{feature.text}</span>
                    </div>
                  ))}
                </motion.div>
              )}

              {section.showButton && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isActive ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-10"
                >
                  <button
                    onClick={() => onNavigate('contacts')}
                    className="bg-[#00C2FF] hover:bg-[#00A8E0] text-black font-semibold px-8 py-3 rounded-full text-base transition-all"
                  >
                    {section.buttonText}
                  </button>
                </motion.div>
              )}
            </section>
          )
        })}
      </div>
    </>
  )
}