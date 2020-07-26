import React, { Component } from 'react';
import './mainpage.css';
import api from '../api';

class mainpage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            mapping:{},
        }
    }

    componentDidMount=async()=>{
        // var _receive_data = api.getImageInfo(post_id);
        //     var receive_data = await _receive_data;

        //     api.setAuthToken(this.getCookie('access'));
        //     var _tmp = api.getViewCount(post_id).catch(function (error) {
        //         that.loginValidation()
        //     });;
        //     tmp = await _tmp;
            
        //     this.setState({
        //         index:receive_data.data['some'],
        //         mapping:tmp.data,
        //     })
    }

    render(){
        // const list = this.state.imgs.map((elem) => (
        //     this.showDiv(elem.i)
        // ));
        return(
            <div>
                hello
            </div>
        )
    }
}

export default mainpage;

