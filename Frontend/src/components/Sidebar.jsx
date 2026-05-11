function Sidebar({ selectedCategory, handleCategoryChange, uniqueCategories, under500, handlePriceChange, over4star, handleRatingChange }) {
    return (
        <aside className="col-12 col-md-3 border-end p-3">

            <div className="mb-4">
                <label htmlFor="categorySelect" className="form-label fw-bold">Category</label>
                <select
                    id="categorySelect"
                    className="form-select"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                >
                    {uniqueCategories.map(category => (
                        <option key={category} value={category}>
                            {category === "All" ? "All Categories" : category}
                        </option>
                    ))}
                </select>
            </div>

            <h5>Filters</h5>
            
            <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={under500} onChange={handlePriceChange} />
                <label className="form-check-label">Under $500</label>
            </div>


            <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={over4star} onChange={handleRatingChange} />
                <label className="form-check-label">Top Rated</label>
            </div>
        </aside>
    )
}

export default Sidebar