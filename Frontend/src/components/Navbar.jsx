import { useState } from 'react'

function Navbar({ cart, clearCart, searchedItem, handleSearchChange }) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <nav className="navbar navbar-dark bg-dark px-3 d-flex justify-content-between">
                <span className="navbar-brand">DehghanCommerce</span>

                <input
                    className="form-control w-50"
                    placeholder="Search products..."
                    value={searchedItem.title}
                    onChange={handleSearchChange}
                />

                <div className="d-flex align-items-center gap-3">
                    
                    <a href="#" className="text-light text-decoration-none">
                        Login
                    </a>

                    <a href="#" className="text-light text-decoration-none">
                        Sign up
                    </a>
                    
                    <button
                        className="btn btn-outline-light d-flex align-items-center gap-2"
                        onClick={() => setIsModalOpen(true)}
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

            {isModalOpen && (
                <div
                    className="modal show d-block"
                    tabIndex="-1"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">Your Cart</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setIsModalOpen(false)}
                                ></button>
                            </div>

                            <div className="modal-body">
                                {cart.length === 0 ? (
                                    <p>Your cart is empty.</p>
                                ) : (
                                    <ul className="list-group mb-3">
                                        {cart.map((item, index) => (
                                            <li className="list-group-item d-flex justify-content-between" key={index}>
                                                <span>
                                                    {item.title} (
                                                    {item.description.length > 30
                                                        ? item.description.slice(0, 30) + "..."
                                                        : item.description}
                                                    )
                                                </span>
                                                <strong>${item.price}</strong>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Close
                                </button>
                                {cart.length > 0 && <button
                                    className="btn btn-danger btn-secondary"
                                    onClick={clearCart}
                                >
                                    Clear Cart
                                </button>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Navbar