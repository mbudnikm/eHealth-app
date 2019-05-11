import React from 'react';
import '../App.css';

const Header = (props) => {
    return (
      <>
        <ul className="nav nav-tabs mb-3 nav-color" id="myTab" role="tablist" style={{ padding: '2rem 0 0 2rem', fontSize: '1.5rem' }}>
          <li className="nav-item">
            <a className="nav-link active" id="instruction-tab" data-toggle="tab" href="#instruction" role="tab" aria-controls="instruction" aria-selected="true">Instrukcja</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="pulse-tab" data-toggle="tab" href="#pulse" role="tab" aria-controls="pulse" aria-selected="false">Puls</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="emotions-tab" data-toggle="tab" href="#emotions" role="tab" aria-controls="emotions" aria-selected="false">Emocje</a>
          </li>
          <li className="d-inline-flex p-2 ml-auto">
            <button type="button" className="btn btn-danger" onClick={props.logoutHandler}>Wyloguj</button>
            {/* <button type="button" className="btn btn-outline-danger" onClick={props.logoutHandler}>Usuń konto</button> */}
          </li>
        </ul>
      </>
    )
}

export default Header;