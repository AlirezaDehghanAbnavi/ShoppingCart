const Card = ({ title, description, price, category, rating, item, addToCart }) => {
  return (
    <div className="card h-100 shadow-sm border-1">
      <div className="card-body d-flex flex-column">

        <div className="mb-2">
          <span className="badge text-bg-light border border-secondary-subtle">
            {category}
          </span>
        </div>

        <h6 className="fw-bold">{title}</h6>

        <p className="text-muted small mb-2">{description}</p>

        <div className="mb-3 small fw-bold text-warning">
          {rating} ⭐
        </div>

        <div className="mt-auto">
          <h5 className="text-success">${price}</h5>

          <button
            className="btn btn-warning w-100 mt-2"
            onClick={() => addToCart(item)}
          >
            Add to Cart
          </button>

        </div>
      </div>
    </div>
  )
}

export default Card