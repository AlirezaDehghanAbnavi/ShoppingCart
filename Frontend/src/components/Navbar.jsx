import { useState } from 'react'
import CartModal from './CardModal'
import { Link } from 'react-router-dom'

function Navbar({ cart, clearCart, searchedItem, handleSearchChange, user, setUser, handleLoginChange }) {
    const [isCartOpen, setIsCartOpen] = useState(false)

    const handleLogout = () => {
        setUser(null);
    }

    return (
        <>
            <nav className="navbar navbar-dark bg-dark px-3 position-relative d-flex justify-content-between">
                <Link to="/" className="navbar-brand">
                    DehghanCommerce
                </Link>

                <input
                    className="form-control w-50 position-absolute start-50 translate-middle-x"
                    placeholder="Search products..."
                    value={searchedItem.title}
                    onChange={handleSearchChange}
                />

                <div className="d-flex align-items-center gap-3">

                    {user ? (
                        <div className="d-flex align-items-center gap-3">
                            <span className="text-light">Hello, {user.name.split(" ")[0]}</span>
                            <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <><button
                            className="btn btn-link text-light text-decoration-none p-0"
                            onClick={handleLoginChange}
                        >
                            Login
                        </button>
                            <Link to="/signup" className="text-light text-decoration-none">
                                Sign up
                            </Link></>
                    )}


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
        </>
    )
}

export default Navbar