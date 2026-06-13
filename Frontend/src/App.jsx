import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Sidebar from './components/Sidebar'
import ProductGrid from './components/ProductGrid'
import Navbar from './components/Navbar'
import CommunicationService from './services/CommunicationService'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import LoginModal from './components/LoginModal'

function App() {
  const [cart, setCart] = useState([])
  const [searchedItem, setSearchedItem] = useState('')
  const [items, setItems] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [under500, setUnder500] = useState(false)
  const [over4Star, setOver4Star] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const addToCart = (item) => setCart([...cart, item])
  const clearCart = () => setCart([])
  const removeFromCart = (index) => setCart(cart.filter((_, i) => i !== index))
  const handleSearchChange = (event) => setSearchedItem(event.target.value)
  const handleCategoryChange = (event) => setSelectedCategory(event.target.value)
  const handlePriceChange = (event) => setUnder500(event.target.checked)
  const handleRatingChange = (event) => setOver4Star(event.target.checked)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const savedUser = JSON.parse(loggedUserJSON)
      setUser(savedUser)
    }

    CommunicationService.getAll()
      .then(initialItems => setItems(initialItems))
      .catch(error => console.error('Failed to fetch items:', error))
  }, [])

  const uniqueCategories = ['All', ...new Set(items.map(item => item.category))]

  const itemToShow = items.filter(item => {
    const search = searchedItem.toLowerCase()
    const matchesSearch =
      item.title.toLowerCase().includes(search) ||
      item.description.toLowerCase().includes(search)
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    const matchesUnder500 = under500 ? item.price <= 500 : true
    const matchesOver4Star = over4Star ? item.rating >= 4.5 : true
    return matchesSearch && matchesCategory && matchesUnder500 && matchesOver4Star
  })

  return (
    <>
      <Navbar
        cart={cart}
        clearCart={clearCart}
        searchedItem={searchedItem}
        handleSearchChange={handleSearchChange}
        removeFromCart={removeFromCart}
        user={user}
        setUser={setUser}
        onLoginClick={() => setIsLoginOpen(true)}
      />
      <Routes>
        <Route path="/" element={
          <div className="container-fluid">
            <div className="row">
              <Sidebar
                selectedCategory={selectedCategory}
                handleCategoryChange={handleCategoryChange}
                uniqueCategories={uniqueCategories}
                under500={under500}
                handlePriceChange={handlePriceChange}
                over4Star={over4Star}
                handleRatingChange={handleRatingChange}
              />
              <main className="col-12 col-md-9 p-3">
                <ProductGrid items={itemToShow} addToCart={addToCart} />
              </main>
            </div>
          </div>
        } />
        <Route path="/signup" element={<Signup setIsLoginOpen={setIsLoginOpen} />} />
      </Routes>
      <Footer />
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        setUser={setUser}
      />
    </>
  )
}

export default App