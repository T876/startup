import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {


    return (
        <div className='body'>
            <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">MyRPGVisual</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Create Account</a>
                        </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <main>
                App Components go here
            </main>
            <footer class="fixed-bottom">
                <p class="author">Author: Nathanael T. Cotton</p>
                <a href="https://github.com/T876/startup">
                    <button class="btn btn-primary">Github</button>
                </a>
            </footer>
        </div>
    );
}