import React from 'react';
import Table from './Table';

class MenuSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allData: [],
            modified: {
                sushi: [],
                drinks: [],
                main: [],
                app: []
            }
          };
          this.handleCreateData = this.handleCreateData.bind(this);
          this.handleDeleteData = this.handleDeleteData.bind(this);
          this.handleUpdateData = this.handleUpdateData.bind(this);
    }

    componentDidMount() {
        fetch("https://8qqznzyrgh.execute-api.us-east-1.amazonaws.com/develop/menuitems")
        .then(response => response.json())
        .then(data => {
          this.setState({
              allData: data
          });
        },
        err => console.log("err:" + err));
        // this.setState({allData: {"main_dishes":[{"_id":"5e793c07b1f5d234fc1c6f30","name":"Combos","meals":[{"name":"Bento Box","price":8,"description":"Includes: Salmon Skin Roll, Karage (3pc), Edamame, Sesame Balls","picture":null}]},{"_id":"5e793c07b1f5d234fc1c6f31","name":"Japanese Curry","meals":[{"name":"Beef Curry","price":9,"description":"Includes: Salmon Skin Roll, Karage (3pc), Edamame, Sesame Balls","picture":null},{"name":"Fried Shrimp Curry","price":9,"description":"Includes: Salmon Skin Roll, Karage (3pc), Edamame, Sesame Balls","picture":null}]}],"drinks":[{"_id":"5e7afd37cdaf982014bea85e","name":"Nigiri","meals":[{"name":"*Squid","price":2,"description":"Includes: Salmon Skin Roll, Karage (3pc), Edamame, Sesame Balls","picture":null}]},{"_id":"5e7afd37cdaf982014bea85f","name":"Specials","meals":[{"name":"Bluefin Tuna Toro (1pc)","price":9,"description":"Includes: Salmon Skin Roll, Karage (3pc), Edamame, Sesame Balls","picture":null},{"name":"Negitoro (2pc)","price":9,"description":"Includes: Salmon Skin Roll, Karage (3pc), Edamame, Sesame Balls","picture":null}]}],"sushi":[{"_id":"5e7afce6d792fb47a442e3df","name":"Nigiri","meals":[{"name":"*Squid","price":2,"description":"Includes: Salmon Skin Roll, Karage (3pc), Edamame, Sesame Balls","picture":null}]},{"_id":"5e7afce6d792fb47a442e3e0","name":"Specials","meals":[{"name":"Bluefin Tuna Toro (1pc)","price":9,"description":"Includes: Salmon Skin Roll, Karage (3pc), Edamame, Sesame Balls","picture":null},{"name":"Negitoro (2pc)","price":9,"description":"Includes: Salmon Skin Roll, Karage (3pc), Edamame, Sesame Balls","picture":null}]}],"appetizers":[{"_id":"5e7afd2eb082ab2c5495dd7b","name":"Nigiri","meals":[{"name":"*Squid","price":2,"description":"Includes: Salmon Skin Roll, Karage (3pc), Edamame, Sesame Balls","picture":null}]},{"_id":"5e7afd2eb082ab2c5495dd7c","name":"Specials","meals":[{"name":"Bluefin Tuna Toro (1pc)","price":9,"description":"Includes: Salmon Skin Roll, Karage (3pc), Edamame, Sesame Balls","picture":null},{"name":"Negitoro (2pc)","price":9,"description":"Includes: Salmon Skin Roll, Karage (3pc), Edamame, Sesame Balls","picture":null}]}]}});
    }

    handleCreateData(insert) {
        let collection = insert.collection;
        let groupName = insert.groupName;
        delete insert["collection"];
        delete insert["groupName"];

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                operation: "insert",
                collection: collection,
                groupName: groupName,
                item: insert
            })
        };

        fetch("https://8qqznzyrgh.execute-api.us-east-1.amazonaws.com/develop/menuitems", requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));
        console.log(insert);
    }

    handleUpdateData(oldData, newData) {
      let collection = oldData.collection;
      let groupName = oldData.groupName;
      //necessary because cannot delete tableData without messing up page
      let itemCopy = {
        name: oldData.name,
        price: oldData.price,
        description: oldData.description,
        picture: oldData.picture
      }

      //To swap misordered values due to library making it alphabetical order
      let newData2 = {
        name: newData.name,
        price: newData.price,
        description: newData.description,
        picture: newData.picture
      }

      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
              operation: "update",
              collection: collection,
              groupName: groupName,
              item: newData2,
              old: itemCopy
          })
      };
      fetch("https://8qqznzyrgh.execute-api.us-east-1.amazonaws.com/develop/menuitems", requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));

        console.log(itemCopy, newData2);
    }

    // Not working with already placed data that has "integers", update values to make everything strings
    handleDeleteData(oldData) {
      let collection = oldData.collection;
      let groupName = oldData.groupName;
      //necessary because cannot delete tableData without messing up page
      let itemCopy = {
        name: oldData.name,
        price: oldData.price,
        description: oldData.description,
        picture: oldData.picture
      }

      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
              operation: "delete",
              collection: collection,
              groupName: groupName,
              item: itemCopy
          })
      };
      fetch("https://8qqznzyrgh.execute-api.us-east-1.amazonaws.com/develop/menuitems", requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));
        console.log(oldData);
    }

    render() {
        return (
          <div>
            <h1>Sushi</h1>
            <Table
              label={"Sushi"}
              onCreate={this.handleCreateData}
              onUpdate={this.handleUpdateData}
              onDelete={this.handleDeleteData}
              items={this.state.allData.sushi}
            />
            <h1>Appetizers</h1>
            <Table
              label={"Appetizers"}
              onCreate={this.handleCreateData}
              onUpdate={this.handleUpdateData}
              onDelete={this.handleDeleteData}
              items={this.state.allData.appetizers}
            />
            <h1>Main Dishes</h1>
            <Table
              label={"MainDish"}
              onCreate={this.handleCreateData}
              onUpdate={this.handleUpdateData}
              onDelete={this.handleDeleteData}
              items={this.state.allData.main_dishes}
            />
            <h1>Drinks, Etc</h1>
            <Table
              label={"Drinks"}
              onCreate={this.handleCreateData}
              onUpdate={this.handleUpdateData}
              onDelete={this.handleDeleteData}
              items={this.state.allData.drinks}
            />
          </div>
        );
    }
}

export default MenuSection