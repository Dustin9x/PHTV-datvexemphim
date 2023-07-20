import { Fragment, useEffect } from "react";
import { Route } from "react-router-dom";
import Header from "./Layout/Header";
import HomeCarousel from "./Layout/HomeCarousel";
import Footer from "./Layout/Footer";




export const MovieTemplate = (props) => { //path, exact, Component
    const {Component,...restProps} = props;

    useEffect(()=>{
        window.scrollTo(0,0);
    })

    return <Route {...restProps} render={(propsRoute)=>{ //props.location, props.history, props.match
        return <Fragment>
            <Header {...propsRoute}/>
            
            <Component {...propsRoute}/>
        </Fragment>
    }}/>
}