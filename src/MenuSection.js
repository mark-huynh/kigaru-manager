import React from 'react';
import Table from './Table';
import EditIcon from '@material-ui/icons/Edit';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

class MenuSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allData: [],
            isLoading: false
          };
          this.handleCreateData = this.handleCreateData.bind(this);
          this.handleDeleteData = this.handleDeleteData.bind(this);
          this.handleUpdateData = this.handleUpdateData.bind(this);
          this.refetchData = this.refetchData.bind(this);
    }

    componentDidMount() {
        this.refetchData();
    }

    refetchData() {
      this.setState({isLoading: true})
      fetch("https://8qqznzyrgh.execute-api.us-east-1.amazonaws.com/develop/menuitems")
      .then(response => response.json())
      .then(data => {
        this.setState({
            allData: data,
            isLoading: false
        });
      },
      err => console.log("err:" + err));
    }

    handleCreateData(insert) {
        let collection = insert.collection;
        let groupName = insert.groupName;
        delete insert["collection"];
        delete insert["groupName"];

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',  'X-COG-ID': this.props.authKey},
            body: JSON.stringify({ 
                operation: "insert",
                collection: collection,
                groupName: groupName,
                item: insert
            })
        };

        fetch("https://8qqznzyrgh.execute-api.us-east-1.amazonaws.com/develop/menuitems", requestOptions)
        .then(response => response.json())
        .then(this.refetchData);
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

      //To swap misordered values due to table library making it alphabetical order
      let newData2 = {
        name: newData.name,
        price: newData.price,
        description: newData.description,
        picture: newData.picture
      }

      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-COG-ID': this.props.authKey},
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
      .then(this.refetchData);
    }

    handleDeleteData(oldData) {
      this.setState({isLoading: true});

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
          headers: { 'Content-Type': 'application/json' , 'X-COG-ID': this.props.authKey },
          body: JSON.stringify({ 
              operation: "delete",
              collection: collection,
              groupName: groupName,
              item: itemCopy
          })
      };
      fetch("https://8qqznzyrgh.execute-api.us-east-1.amazonaws.com/develop/menuitems", requestOptions)
      .then(response => response.json())
      .then(this.refetchData);
    }

    render() {
        return (
          <div>
            <ol>
              <li>Sign into a Kigaru Admin Account</li>
              <li>Click <EditIcon/> to modify a row
                <ul>
                  <li>After editing, click the check button</li>
                  <li>After a bit, the changes will be updated on the page. Don't edit anything while changes are loading</li>
                </ul>
              </li>
              <li>To add an item, click <AddBoxIcon/> and enter the data you want</li>
              <ul>
                  <li>For the time being, I have not integrated adding pictures. That will come in the future</li>
                  <li>Similarly, wait until you see the changes get updated</li>
              </ul>
              <li>Delete a row by clicking <DeleteOutlineIcon/> and confirming</li>
            </ol>
            <div style={{padding: "10px"}}>
            Each of these tables allow you to seach by any of the fields (name, price, description) and also allow you to expand the number of rows displayed. Also works on mobile. Contact mark.huynh.oregon@gmail.com for any issues.
            </div>

            
            <div style={{textAlign: "center"}}><h1>Sushi</h1></div>
            <Table
              label={"Sushi"}
              isAuth={this.props.isAuth}
              isLoading={this.state.isLoading}
              onCreate={this.handleCreateData}
              onUpdate={this.handleUpdateData}
              onDelete={this.handleDeleteData}
              items={this.state.allData.sushi}
            />
            <div style={{textAlign: "center"}}><h1>Appetizers</h1></div>
            <Table
              label={"Appetizers"}
              isAuth={this.props.isAuth}
              isLoading={this.state.isLoading}
              onCreate={this.handleCreateData}
              onUpdate={this.handleUpdateData}
              onDelete={this.handleDeleteData}
              items={this.state.allData.appetizers}
            />
            <div style={{textAlign: "center"}}><h1>Main Dishes</h1></div>
            <Table
              label={"MainDish"}
              isAuth={this.props.isAuth}
              isLoading={this.state.isLoading}
              onCreate={this.handleCreateData}
              onUpdate={this.handleUpdateData}
              onDelete={this.handleDeleteData}
              items={this.state.allData.main_dishes}
            />
            <div style={{textAlign: "center"}}><h1>Drinks, Etc</h1></div>
            <Table
              label={"Drinks"}
              isAuth={this.props.isAuth}
              isLoading={this.state.isLoading}
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