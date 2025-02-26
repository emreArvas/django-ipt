import React from 'react'
import '../my.css'

function Footer() {
  return (
    <div className="footer-bg">
        <div className="container">
      <footer className="py-5">
        <div className="row">
          <div className="col-2">
            <h5>Bölümler</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Ev</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Özellikler</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Fiyatlar</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">FAQs</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Hakkında</a></li>
            </ul>
          </div>

          

         

          <div className="col-4 offset-1">
            <form>
              <h5>İndirimlerden haberdar olun</h5>
              
              <div className="d-flex w-100 gap-2">
                <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                <input id="newsletter1" type="text" className="form-control" placeholder="Email addresi" />
                <button className="btn btn-primary" type="button">Abone ol</button>
              </div>
            </form>
          </div>
        </div>

        <div className="d-flex justify-content-between py-4 my-4 border-top">
          <p>&copy; 2024 ARVAS TİCARET.</p>
          <ul className="list-unstyled d-flex">
            <li className="ms-3"><a className="link-dark" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#twitter" /></svg></a></li>
            <li className="ms-3"><a className="link-dark" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#instagram" /></svg></a></li>
            <li className="ms-3"><a className="link-dark" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#facebook" /></svg></a></li>
          </ul>
        </div>
      </footer>
    </div>
    </div>
  )
}

export default Footer