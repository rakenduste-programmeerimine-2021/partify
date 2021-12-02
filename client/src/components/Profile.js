import React, { Component } from "react";
import Auth from "../services/Auth";

export default class Profile extends Component {
    constructor(props){
        super(props)

        this.state = {
            currentUser: Auth.getCurrentUser()
        }
    }

    render(){
        const { currentUser } = this.state

        return(
            <div>
                
            </div>
        )
    }
}