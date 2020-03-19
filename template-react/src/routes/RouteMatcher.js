import React from 'react';
import Login from './Login';
import Register from './Register'
import Main from './Main'
const RouteMatcher = (props) => {
  if (props.match.params.route ==='login'){
    return (<Login/>);
  }else if (props.match.params.route ==='register'){
    return (<Register/>);
  }else{
    return(<Main/>)
  }
}

export default RouteMatcher;