import React from "react";

const User = (props) => {
    return (
        <div class="dropdown">
            <button 
                class="btn dropdown-toggle text-primary" 
                type="button" 
                id="dropdownMenuButton" 
                data-toggle="dropdown" 
                aria-haspopup="true" 
                aria-expanded="false">
            <i class="fas fa-user fa-lg" />
            </button>
            <div class="dropdown-menu text-center" aria-labelledby="dropdownMenuButton">
              <button type="button" className="btn btn-outline-danger m-1" >Usuń konto</button>
              <div class="dropdown-divider"></div>
              <button type="button" className="btn btn-danger m-1" onClick={props.logoutHandler}>Wyloguj</button>
            </div>
        </div>
    )
}

export default User