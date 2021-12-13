import React, {Component} from "react";
import UserService from "../services/UserService"; 

export default class User extends Component {
    constructor(props){
        super(props)

        this.state = {
            content: ""
        }
    }

    componentDidMount() {
        UserService.getUserBoard().then(
            response => {
                this.setState({
                    content: response.data
                })
            },
            //error =>
        )
    }
}