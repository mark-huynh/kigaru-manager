import React from 'react';
import Table from './Table';

class MenuSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: []
          };
    }

    componentDidMount() {
        fetch("https://xbarlxdua2.execute-api.us-east-1.amazonaws.com/items")
        .then(response => response.json())
        .then(data => {
          this.setState({
              allData: data
          });
        },
        err => console.err("err:" + err));
    }

    render() {
        <div>
            <h1>Sushi</h1>
            
            <h1>Appetizers</h1>
            <h1>Main Dishes</h1>
            <h1>Drinks, Etc</h1>
        </div>
    }
}