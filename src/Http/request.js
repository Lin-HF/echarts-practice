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
        edges: null,
        categories: null
    }

    createConfig() {
        const auth = new Buffer('haifeng:KID3521451kid').toString('base64');
        const config = {
            headers: {
                "Authorization": auth
            } 
        }
        this.setState({config: config});
        // console.log("AUTH: " + auth)
        // console.log("CONFIG: " + config)
        // console.log("State config: " + this.state.config)
    }

    login() {
        const uri = "http://hoffmann.data2discovery.net:7474/user/haifeng";
        axios.get(uri, this.state.config)
            .then( response => {
                // console.log(response);
                this.setState({data: response.data});
            }).catch( error => {
                // console.log("ERROR!!! " + error)
                // console.log("State config: " + this.state.config)
            })
    }

    query() {
        const uri = "http://hoffmann.data2discovery.net:7474/db/data/transaction/commit";
        const req = {
            "statements": [ {
                "statement": "match (g:Gene {label:'JAK1'})," + 
                             "(d:Phenotype {label:'Diabetes'})," + 
                             "p = (g)-[r*..2]-(d) return p limit 50",
                "resultDataContents": [ "row", "graph" ]
            } ]
        };
        axios.post(uri, req, this.state.config)
            .then( response => {
                // for checking the response structure
                console.log(response);
                const res_dat = response.data.results[0].data; //Array of data
                // this.setState({data: res_dat});
                // console.log(res_dat);
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
        let set = new Set();

        
        let categoriesSet = new Set();
        for (let d of data) {
            for (let n of d.graph.nodes) {
                categoriesSet.add(n.labels[0]);
            }
        }
        const categories = Array.from(categoriesSet);
        this.setState({categories: categories});
        if (data == null) {
            return;
        }
        for (let d of data) { //d:graph, meta, row
            const rawNodes = d.graph.nodes;
            const rawEdges = d.graph.relationships;
            for (let node of rawNodes) {
                if (set.has(node.id)) {
                    continue;
                }
                set.add(node.id);
                let n = {};
                n.id = node.id;
                n.name = node.properties.label
                n.itemStyle = {
                    borderColor: "#000",
                    borderWidth: 1
                };
                n.symbolSize = 50;
                
                // n.value = node.properties.label;
                // n.category = node.labels[0]
                n.category = categories.findIndex((el) => (el === node.labels[0]));
                n.des = 'internal-id: '+ node.id +'  biotype: '+ node.properties.biotype +'<br/>  description: '+ node.properties.description +'<br/>  dev_phase: '+ node.properties.dev_phase +'  id: '+ node.properties.id +'  label: '+ node.properties.label +'  source: '+ node.properties.source +'  source2: '+ node.properties.source2;
                // Use random x, y
                n.x = null;
                n.y = null;
                n.draggable = true;
                nodes.push(n);
            }
            for (let e of rawEdges) {
                let e2 = {};
                e2.name = e.type;
                e2.des = 'internal-id: ' + e.id + ' e: ' + e.properties.e + ' otd: ' + e.properties.otd + ' raw: ' + e.properties.raw + '<br/> s: ' + e.properties.s + ' score: ' + e.properties.score + ' source: ' + e.properties.source;
                e2.source = e.startNode;
                e2.target = e.endNode;
                edges.push(e2);
            }
        }
        console.log(nodes);
        console.log(edges);
        this.setState({nodes: nodes});
        this.setState({edges: edges});
    }

    render() {
        return  <div>
                    {/* <p>nodes: {JSON.stringify(this.state.nodes)}</p> */}
                    <hr/>
                    {/* <p>edges: {JSON.stringify(this.state.edges)}</p> */}
                    <Graph nodes={this.state.nodes} edges={this.state.edges} categories={this.state.categories}/>
                    {/* <Test/> */}
                    {/* <Test2/> */}
                </div>
    }
}

export default Request;