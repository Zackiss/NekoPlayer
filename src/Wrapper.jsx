import React from 'react';
import App from "./App"


class Wrapper extends React.Component {
    componentDidCatch(error, info) {
        console.log(error)
        console.log(info)
    }
    render() {
        return (<App/>)
    }
}

export default Wrapper;