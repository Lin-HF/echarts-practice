import React, { Component } from 'react';
import axios from 'axios';

class Request extends Component {
    state = {
        // auth: null,
        config: null,
        data: "Default response."
    }

    // createAuth() {
    //     const auth = new Buffer('haifeng:KID3521451kid').toString('base64');
    //     this.setState({auth: auth});
    //     console.log("AUTH: " + this.state.auth)
    // }

    createConfig() {
        const auth = new Buffer('haifeng:KID3521451kid').toString('base64');
        const config = {
            headers: {
                "Authorization": auth
            } 
        }
        this.setState({config: config});
        console.log("AUTH: " + auth)
        console.log("CONFIG: " + config)
        console.log("State config: " + this.state.config)
    }

    login() {
        const uri = "http://hoffmann.data2discovery.net:7474/user/haifeng";
        axios.get(uri, this.state.config)
            .then( response => {
                console.log(response);
                this.setState({data: response.data});
            }).catch( error => {
                console.log("ERROR!!! " + error)
                console.log("State config: " + this.state.config)
            })
    }

    query() {
        const uri = "http://hoffmann.data2discovery.net:7474/db/data/transaction/commit";
        const req = {
            "statements": [ {
                "statement": "match (g:Gene {label:'JAK1'})," + 
                             "(d:Phenotype {label:'Diabetes'})," + 
                             "p = (g)-[r*..2]-(d) return p limit 50"
            } ]
        };
        axios.post(uri, req, this.state.config)
            .then( response => {
                // for checking the response structure
                console.log(response);
                const res_dat = JSON.stringify(response.data.results[0]);
                this.setState({data: res_dat});
                // console.log(str_posts);
            });
    }
    componentWillMount() {
        // this.createAuth();
        this.createConfig();
        
    }

    componentDidMount() {
        this.login();
        this.query();
    }
    render() {
        return  <div>
                    {/* <label>User Name: </label>
                    <input />
                    <label>User Name: </label>
                    <input /> */}
                </div>
    }
}

export default Request;