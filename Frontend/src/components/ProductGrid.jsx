import Card from "./Card"

function ProductGrid({ items, addToCart }) {
    return (
        <div className="row g-3">
            {items.map((item) => (
                <div className="col-12 col-md-6 col-lg-4" key={item.id}>
                    <Card {...item} item={item} addToCart={addToCart} />
                </div>
            ))}
        </div>
    )
}

export default ProductGrid