import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { CreateAccount } from './create_account/create_account';
import { MyLibrary } from './my_library/my_library';
import { Gallery } from './gallery/gallery';
import { Login } from './login/login'
import { NotFound } from './not_found/not_found';

export default function App() {


    return (
        <BrowserRouter>
            <div className='body'>
                <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">MyRPGVisual</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className='nav-item'>
                                    <NavLink className='nav-link' to=''>
                                        Login
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink className='nav-link' to='create_account'>
                                        Create Account
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink className='nav-link' to='library'>
                                        My Library
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink className='nav-link' to='gallery'>
                                        Gallery
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink className='nav-link' to=''>
                                        Logout
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <main>
                <Routes>
                    <Route path='/' element={<Login />} exact />
                    <Route path='/create_account' element={<CreateAccount />} />
                    <Route path='/library' element={<MyLibrary />} />
                    <Route path='/gallery' element={<Gallery />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
                </main>
                <footer className="fixed-bottom">
                    <p className="author">Author: Nathanael T. Cotton</p>
                    <a href="https://github.com/T876/startup">
                        <button className="btn btn-primary">Github</button>
                    </a>
                </footer>
            </div>
        </BrowserRouter>
    );
}