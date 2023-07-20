import { Fragment, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { USER_LOGIN } from "../util/settings/config";


const CheckOutTemplate = (props) => { //path, exact, Component
    const {Component,...restProps} = props;

    useEffect(()=>{
        window.scrollTo(0,0);
    })

    if(!localStorage.getItem(USER_LOGIN)){
        return <Redirect to='/login'/>
    } else {
        return <Route {...restProps} render={(propsRoute)=>{ //props.location, props.history, props.match
            return <Fragment>
                
                <Component {...propsRoute}/>
            </Fragment>
        }}/>
    }

   
}

export default CheckOutTemplate;