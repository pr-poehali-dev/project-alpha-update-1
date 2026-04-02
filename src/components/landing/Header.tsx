import Icon from '@/components/ui/icon'

interface HeaderProps {
  currentPage: string
  onNavigate: (page: string) => void
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const navItems = [
    { id: 'home', label: 'Главная' },
    { id: 'services', label: 'Услуги' },
    { id: 'contacts', label: 'Контакты' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-black/60 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
        <div className="w-9 h-9 rounded-lg bg-[#00C2FF] flex items-center justify-center">
          <Icon name="Home" size={20} className="text-black" />
        </div>
        <span className="text-white font-bold text-xl tracking-tight">SmartHome</span>
      </div>

      <nav className="hidden md:flex items-center gap-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              currentPage === item.id
                ? 'bg-[#00C2FF] text-black'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <button
        onClick={() => onNavigate('contacts')}
        className="bg-[#00C2FF] hover:bg-[#00A8E0] text-black font-semibold px-5 py-2 rounded-full text-sm transition-all"
      >
        Оставить заявку
      </button>
    </header>
  )
}
