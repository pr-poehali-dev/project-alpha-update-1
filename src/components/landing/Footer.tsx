import Icon from '@/components/ui/icon'

interface FooterProps {
  onNavigate: (page: string) => void
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-black/80 backdrop-blur-md border-t border-white/10 px-8 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#00C2FF] flex items-center justify-center">
            <Icon name="Home" size={16} className="text-black" />
          </div>
          <span className="text-white font-bold text-lg">SmartHome</span>
        </div>

        <nav className="flex items-center gap-6">
          {[
            { id: 'home', label: 'Главная' },
            { id: 'services', label: 'Услуги' },
            { id: 'contacts', label: 'Контакты' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="text-white/50 hover:text-white text-sm transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <Icon name="Phone" size={14} />
            <span>+7 (800) 123-45-67</span>
          </div>
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <Icon name="Mail" size={14} />
            <span>info@smarthome.ru</span>
          </div>
        </div>
      </div>
      <div className="text-center text-white/30 text-xs mt-6">
        © 2024 SmartHome. Все права защищены.
      </div>
    </footer>
  )
}
