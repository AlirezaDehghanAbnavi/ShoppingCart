import { useState } from 'react'
import LoginModal from './LoginModal'
import CartModal from './CardModal'

function Navbar({ cart, clearCart, searchedItem, handleSearchChange, handleLogin }) {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isLoginOpen, setIsLoginOpen] = useState(false)

    return (
        <>
            <nav className="navbar navbar-dark bg-dark px-3 position-relative d-flex justify-content-between">
                <span className="navbar-brand">DehghanCommerce</span>

                <input
                    className="form-control w-50 position-absolute start-50 translate-middle-x"
                    placeholder="Search products..."
                    value={searchedItem.title}
                    onChange={handleSearchChange}
                />

                <div className="d-flex align-items-center gap-3">

                    <button
                        className="btn btn-link text-light text-decoration-none p-0"
                        onClick={() => setIsLoginOpen(true)}
                    >
                        Login
                    </button>

                    <a href="#" className="text-light text-decoration-none">
                        Sign up
                    </a>

                    <button
                        className="btn btn-outline-light d-flex align-items-center gap-2"
                        onClick={() => setIsCartOpen(true)}
                    >
                        Cart
                        {cart.length > 0 && (
                            <span className="badge bg-danger rounded-pill">
                                {cart.length}
                            </span>
                        )}
                    </button>
                </div>
            </nav>

            <CartModal
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cart={cart}
                clearCart={clearCart}
            />

            <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
            />
        </>
    )
}

export default Navbar