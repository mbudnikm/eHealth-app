import React from 'react';
import Header from "./Header";
import Content from "./Content"

const Main = (props) => {
    return (
        <>
            <Header 
                logoutHandler={props.logoutHandler} 
                userInfo={props.userInfo} />, 
            <Content userInfo={props.userInfo} />
        </>
    )
}

export default Main;