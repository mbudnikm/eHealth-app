import React from "react";
import { handleResponse, deleteUser } from "../Shared/services"

const UserMenu = (props) => {
    return (
        <>
            <div className="dropdown dropleft">
                <button 
                    className="btn dropdown-toggle text-primary" 
                    type="button" 
                    id="dropdownMenuButton" 
                    data-toggle="dropdown" 
                    aria-haspopup="true" 
                    aria-expanded="false">
                <i className="fas fa-user fa-lg" />
                </button>
                <div className="dropdown-menu text-center" aria-labelledby="dropdownMenuButton">
                <button 
                    type="button" 
                    className="btn btn-outline-danger m-1" 
                    data-toggle="modal" 
                    data-target="#deleteAccountModal">Usuń konto</button>
                <div className="dropdown-divider"></div>
                <button type="button" className="btn btn-danger m-1" onClick={props.logoutHandler}>Wyloguj</button>
                </div>
            </div>

            {/* Modal */}
            <div 
                className="modal fade" 
                id="deleteAccountModal" 
                tabIndex="-1" 
                role="dialog" 
                aria-labelledby="deleteAccountModalLabel" 
                aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="deleteAccountModalLabel">Usuń konto</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <h6>
                    Czy na pewno chcesz usunąć konto? Wszystkie Twoje pomiary zostaną utracone bezpowrotnie.
                    </h6>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Nie usuwaj konta</button>
                    <button 
                        type="button" 
                        className="btn btn-danger"
                        data-dismiss="modal" 
                        onClick={ async () => {
                            await handleResponse(async () => await deleteUser(props.userInfo))
                            props.logoutHandler()
                        }}>Usuń konto</button>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default UserMenu;