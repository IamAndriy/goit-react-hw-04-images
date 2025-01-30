import { Component } from "react";
import {ColorRing} from "react-loader-spinner";


export class Loader extends Component{

    render(){
        return <ColorRing colors={['#3f51b5', '#3f51b5', '#3f51b5', '#51E5FF', '#429EA6']}/>
    }
}