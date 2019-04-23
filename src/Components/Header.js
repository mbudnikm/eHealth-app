import React from 'react';
import '../App.css'

const Header = () => {
    return (
        <ul className="nav nav-tabs mb-3 nav-color" id="pills-tab" role="tablist" style={{ padding: '2rem 0 0 2rem', fontSize: '1.5rem'}}>
          <li className="nav-item">
            <a className="nav-link active" id="instruction-tab" data-toggle="pill" href="#instruction" role="tab" aria-controls="instruction" aria-selected="true">Instrukcja</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="pulse-tab" data-toggle="pill" href="#pulse" role="tab" aria-controls="pulse" aria-selected="false">Puls</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="emotions-tab" data-toggle="pill" href="#emotions" role="tab" aria-controls="emotions" aria-selected="false">Emocje</a>
          </li>
        </ul>
    )
}

export default Header;