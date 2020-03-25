import React, {useState} from 'react';
import MaterialTable from 'material-table';

class Table extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            data: [
                    {"_id":{"$oid":"5e793c07b1f5d234fc1c6f30"},"name":"Combos","meals":[{"name":"Bento Box","price":{"$numberInt":"8"},"description":"Includes: Salmon Skin Roll, Karage (3pc), Edamame, Sesame Balls","picture":null}]},
                    {"_id":{"$oid":"5e793c07b1f5d234fc1c6f31"},"name":"Japanese Curry","meals":[{"name":"Beef Curry","price":{"$numberInt":"9"},"description":"Includes: Salmon Skin Roll, Karage (3pc), Edamame, Sesame Balls","picture":null},{"name":"Fried Shrimp Curry","price":{"$numberInt":"9"},"description":"Includes: Salmon Skin Roll, Karage (3pc), Edamame, Sesame Balls","picture":null}]}          
            ]}
    }


    render() {
        let allTables = this.state.data.map(item => (
          <MaterialTable
          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  this.setState(prevState => {
                    const data = [...prevState.data];
                    data.push(newData);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    this.setState(prevState => {
                      let toChange = [...prevState.data];
                      let allMeals = toChange[toChange.indexOf(item)].meals;
                      let modifiedIndex = oldData.tableData.id;

                      console.log(modifiedIndex);
                      toChange[toChange.indexOf(item)].meals[modifiedIndex] = newData;
                      
                      console.log(toChange);
                      return { ...prevState, toChange };
                    });
                  }
                }, 600);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  this.setState(prevState => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
          }}
            columns={[
              { title: "Name", field: "name" },
              { title: "Price", field: "price", type: "numeric"},
              { title: "Description", field: "description"},
              {
                title: "Picture",
                field: "picture"
              }
            ]}
            data={
                item.meals.map(food => (
                    {
                        name: food.name,
                        description: food.description,
                        picture: food.picture   
                    }
                ))
            }
            title={item.name}
          />
        ));

        return (
            <div style={{ maxWidth: "100%" }}>
              {allTables}
            </div>
        );
    }
}

export default Table