import React, { Component, Fragment, useEffect } from 'react'
import { Route } from "react-router-dom";

export default function UserTemplate(props) {


  const { Component, ...restProps } = props;

  useEffect(()=>{
    window.scrollTo(0,0);
})

  return <Route {...restProps} render={(propsRoute) => { //props.location, props.history, props.match
    return <Fragment>
      <div className="min-h-screen bg-purple-400 flex justify-center items-center" style={{
        backgroundImage: 'url(./img/xx.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}>
        <Component {...propsRoute} />

      </div>
    </Fragment>
  }} />

}
