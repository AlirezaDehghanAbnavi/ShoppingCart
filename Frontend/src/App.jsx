import { use, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Sidebar from './components/Sidebar'
import ProductGrid from './components/ProductGrid'
import Navbar from './components/Navbar'
import CommunicationService from './services/CommunicationService'
import Footer from './components/Footer'


function App() {
  const [cart, setCart] = useState([])
  const [searchedItem, setSearchedItem] = useState('')
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [under500, setUnder500] = useState(false);
  const [over4Star, setOver4Star] = useState(false);
  const [user, setUser] = useState(null)

  const addToCart = (item) => {
    setCart([...cart, item])
  }

  const clearCart = () => {
    setCart([])
  }

  const handleSearchChange = (event) => {
    setSearchedItem(event.target.value)
  }

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value)
  }

  const handlePriceChange = (event) => {
    setUnder500(event.target.checked)
  }

  const handleRatingChange = (event) => {
    setOver4Star(event.target.checked)
  }

  
  useEffect(() => {
    CommunicationService.getAll()
      .then(initialItem => {
        console.log("Promise fullfilled");
        setItems(initialItem)
      })
  }, [])

  const uniqueCategories = ["All", ...new Set(items.map(item => item.category))];

  const itemToShow = items.filter(item => {
    const search = searchedItem.toLowerCase();

    const matchesSearch = item.title.toLowerCase().includes(search) ||
      item.description.toLowerCase().includes(search);

    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;

    const matchesUnder500 = under500 ? item.price <= 500 : true;
    const matchesOver4Star = over4Star ? item.rating >= 4.5 : true;

    return matchesSearch && matchesCategory && matchesUnder500 && matchesOver4Star;
  });

  return (
    <>
      <Navbar
        cart={cart}
        clearCart={clearCart}
        searchedItem={searchedItem}
        handleSearchChange={handleSearchChange}
        user={user}       
        setUser={setUser}
      />
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
      <Footer></Footer>
    </>
  )
}

export default App