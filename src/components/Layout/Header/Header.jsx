import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import userImg from '../../../asserts/img_user.jpeg';
import './Header.scss';
import { FaBell } from 'react-icons/fa';
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineClose } from "react-icons/md";
import { useAuth } from '../../../auth/authProvider';



function Header() {
  const {logout: logoutAuth, user} = useAuth()
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const {dispatch: dispatchAuth } = useAuth();
  const [userName] = useState("");
  const handleClick = () => {
    setMenuOpen(!isMenuOpen)
    document.body.classList.toggle('mobHeader');
  };

  // const useData = useSelector((state: any) => state.login)
  // const username = localStorage.getItem('username')
  // useEffect(() => {
  //   setUserName(useData.data.username)
  // },[useData.data.username])
  const logOut = async () => {
    // dispatch(resetLogin());
    // dispatchAuth(logout());
    // COOKIES.removeCookieAll();
    logoutAuth()
    localStorage.clear();
    navigate("/")
  }
  return (
    <div className="header">
      <Container>

        <Navbar className='justify-content-between' expand="lg">
          <Button onClick={handleClick} className=' bg-transparent border-0 p-0 text-white d-flex d-lg-none align-items-center me-2 me-sm-3' type='button'
          >
            {isMenuOpen ? (
              <MdOutlineClose size="24px" />
            ) : (
              <RxHamburgerMenu size="24px" />
            )}
          </Button>
          <Link style={{ color: 'var(--white)' }} to="/">
            <h2 className="logos me-2 me-sm-4 d-block">Logo</h2>
          </Link>
          <div className='notification position-relative ms-auto'>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic" className='bg-transparent p-0 border-0'>
                <FaBell color='var(--white)' />
                <span className='notiCount rounded-circle d-flex align-items-center justify-content-center'>3</span>
              </Dropdown.Toggle>

              <Dropdown.Menu className='single_noti p-0 '>
                <div className=''>
                  <ul className="list-unstyled mb-0">
                    <li>
                      <Link to="#" className="message-item d-flex align-items-center border-bottom px-3 py-1">
                        <div className="btn btn-danger rounded-circle btn-circle"><i className="text-white fas fa-user text-white"></i></div>
                        <div className="w-75 d-inline-block ps-2">
                          <span className="fs-12 text-nowrap d-block">Ferdaus7923 has been joined</span>
                          <span className="fs-12 text-nowrap d-block">December 26, 2022 05:07 PM</span>
                        </div>
                      </Link>
                      <Link to="#" className="message-item read d-flex align-items-center border-bottom px-3 py-1">
                        <div className="btn btn-danger rounded-circle btn-circle"><i className="text-white fas fa-user text-white"></i></div>
                        <div className="w-75 d-inline-block ps-2">
                          <span className="fs-12 text-nowrap d-block">Ferdaus7923 has been joined</span>
                          <span className="fs-12 text-nowrap d-block">December 26, 2022 05:07 PM</span>
                        </div>
                      </Link>
                      <Link to="#" className="message-item d-flex align-items-center border-bottom px-3 py-1">
                        <div className="btn btn-danger rounded-circle btn-circle"><i className="text-white fas fa-user text-white"></i></div>
                        <div className="w-75 d-inline-block ps-2">
                          <span className="fs-12 text-nowrap d-block">Ferdaus7923 has been joined</span>
                          <span className="fs-12 text-nowrap d-block">December 26, 2022 05:07 PM</span>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="nav-link py-3 text-center ">
                        Clear all <i className="fa fa-angle-right"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          <Navbar id="basic-navbar-nav">
            <Nav className="ms-auto">
              <div className='user_toggle'>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic" className='bg-transparent p-0 border-0 d-flex align-items-center'>
                    <img className='img-fluid rounded-circle userprofile' src={userImg} alt='icon' />
                    <div className="ms-2  d-flex align-items-center">
                      <p className="text-white text-capitalize">{userName ? userName : user.name}</p>
                      <i className="fa-solid fa-angle-down ms-2 text-white"></i>
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className=' p-0 user_list'>
                    <Link to="/user/profile"><i className="fa-regular fa-user me-2"></i> Profile</Link>
                    <Nav.Link href="#home"><i className="fa-solid fa-gear me-2"></i> Password</Nav.Link>
                    <Nav.Link className='dropdown-divider'></Nav.Link>
                    <Nav.Link onClick={logOut}><i className="fa-solid fa-power-off me-2"></i> Logout</Nav.Link>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Nav>
          </Navbar>
        </Navbar>
      </Container>
    </div>
  );
}

export default Header;
