function CartModal({ isOpen, onClose, cart, clearCart }) {
    if (!isOpen) return null;

    const total = cart.reduce((sum, item) => sum + item.price, 0)

    return (
        <div
            className="modal show d-block"
            tabIndex="-1"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={onClose}
        >
            <div className="modal-dialog modal-dialog-centered" onClick={e => e.stopPropagation()}>
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">
                            Your Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            aria-label="Close"
                        ></button>
                    </div>

                    <div className="modal-body">
                        {cart.length === 0 ? (
                            <p>Your cart is empty.</p>
                        ) : (
                            <>
                                <ul className="list-group mb-3">
                                    {cart.map((item, index) => (
                                        <li className="list-group-item d-flex justify-content-between" key={index}>
                                            <span>
                                                {item.title} (
                                                {item.description.length > 30
                                                    ? item.description.slice(0, 30) + '...'
                                                    : item.description}
                                                )
                                            </span>
                                            <strong>${item.price}</strong>
                                        </li>
                                    ))}
                                </ul>
                                <div className="d-flex justify-content-end fw-bold">
                                    Total: ${total.toFixed(2)}
                                </div>
                            </>
                        )}
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Close
                        </button>
                        {cart.length > 0 && (
                            <button
                                className="btn btn-danger"
                                onClick={clearCart}
                            >
                                Clear Cart
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartModal;