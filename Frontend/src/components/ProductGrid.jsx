import Card from "./Card"
import { useState } from "react"

function ProductGrid({ items, addToCart }) {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 12

    const lastItemIndex = currentPage * itemsPerPage
    const firstItemIndex = lastItemIndex - itemsPerPage
    const currentItems = items.slice(firstItemIndex, lastItemIndex)

    const totalPages = Math.ceil(items.length / itemsPerPage)

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }



    return (
        <div>
            <div className="row g-3">
                {currentItems.map((item) => (
                    <div className="col-12 col-md-6 col-lg-4" key={item.id}>
                        <Card {...item} item={item} addToCart={addToCart} />
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="d-flex justify-content-center align-items-center mt-5 mb-3">
                    <button
                        className="btn btn-outline-dark"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        &laquo; Previous
                    </button>
                    <span className="mx-4 font-weight-bold">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        className="btn btn-outline-dark"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next &raquo;
                    </button>
                </div>
            )}

        </div>
    )
}

export default ProductGrid