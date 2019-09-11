import React, { Component } from 'react';
import axios from 'axios';
import Graph from '../echarts/graph/graph';
import Test from '../echarts/graph/test';
import Test2 from '../echarts/graph/test2';

class Request extends Component {
    state = {
        // auth: null,
        config: null,
        data: null,
        nodes: null,
        edges: null
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
                             "p = (g)-[r*..2]-(d) return p limit 1"
            } ]
        };
        axios.post(uri, req, this.state.config)
            .then( response => {
                // for checking the response structure
                console.log(response);
                const res_dat = response.data.results[0].data;
                // this.setState({data: res_dat});
                console.log(res_dat);
                this.getNodesAndEdges(res_dat);
            });
    }
    componentWillMount() {
        // this.createAuth();
        this.createConfig();
        
    }

    componentDidMount() {
        this.login();
        this.query();
        // this.getNodesAndEdges();
        // console.log(this.state.nodes);
        // console.log(this.state.edges);
    }

    getNodesAndEdges(data) {
        let nodes = [];
        let edges = [];
        if (data == null) {
            return;
        }
        for (let d of data) {
            for (let i = 0; i < d.meta[0].length; i++) {
                if (d.meta[0][i].type === 'node') {
                    nodes.push(d.row[0][i]);
                } else if (d.meta[0][i].type === 'relationship') {
                    edges.push(d.row[0][i])
                }
            }
        }
        console.log(nodes);
        console.log(edges);
        this.setState({nodes: nodes});
        this.setState({edges: edges});
    }

    render() {
        return  <div>
                    <p>nodes: {JSON.stringify(this.state.nodes)}</p>
                    <hr/>
                    <p>edges: {JSON.stringify(this.state.edges)}</p>
                    <Graph nodes={this.state.nodes} edges={this.state.edges}/>
                    <Test/>
                    <Test2/>
                </div>
    }
}

export default Request;