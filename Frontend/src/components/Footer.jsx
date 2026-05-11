function Footer() {
    return (
        <footer className="bg-dark text-white pt-5 pb-4 mt-5">
            <div className="container text-center text-md-start">
                <div className="row text-center text-md-start">

                    <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                        <h5 className="text-uppercase mb-4 font-weight-bold text-warning">DehghanCommerce</h5>
                        <p>Your one-stop shopping experience. We provide the best quality products with top-notch customer service.</p>
                    </div>
                

                    <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                        <h5 className="text-uppercase mb-4 font-weight-bold">Support</h5>
                        <p><a href="#" className="text-white text-decoration-none">Your Account</a></p>
                        <p><a href="#" className="text-white text-decoration-none">Shipping Rates</a></p>
                        <p><a href="#" className="text-white text-decoration-none">Returns & Refunds</a></p>
                        <p><a href="#" className="text-white text-decoration-none">Help & FAQ</a></p>
                    </div>

                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                        <h5 className="text-uppercase mb-4 font-weight-bold">Contact Us</h5>
                        <p>📍 Torino, Italia</p>
                        <p>✉️ alireza.dehghan07@yahoo.com</p>
                        <p>📞 +39 (344) 635-8172</p>
                    </div>

                </div>

                <hr className="mb-4" />

                <div className="row align-items-center">
                    <div className="col-md-7 col-lg-8">
                        <p> Copyright © 2026 All rights reserved by:{''}
                            <a href="#" style={{ textDecoration: 'none' }}>
                                <strong className="text-warning"> DehghanCommerce</strong>
                            </a>
                        </p>
                    </div>
                </div>
                
            </div>
        </footer>
    );
}

export default Footer;