import { useState } from 'react'
import Layout from './Layout'
import Header from './Header'
import Footer from './Footer'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import ContactsPage from './pages/ContactsPage'

type Page = 'home' | 'services' | 'contacts'

export default function LandingPage() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  const navigate = (page: string) => {
    setCurrentPage(page as Page)
  }

  return (
    <Layout>
      <div className="flex flex-col h-full">
        <Header currentPage={currentPage} onNavigate={navigate} />

        <div className="flex-1 overflow-hidden relative">
          {currentPage === 'home' && <HomePage onNavigate={navigate} />}
          {currentPage === 'services' && <ServicesPage onNavigate={navigate} />}
          {currentPage === 'contacts' && <ContactsPage />}
        </div>

        <Footer onNavigate={navigate} />
      </div>
    </Layout>
  )
}
