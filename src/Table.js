import React from 'react';
import MaterialTable from 'material-table';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    fetch("https://xbarlxdua2.execute-api.us-east-1.amazonaws.com/items")
      .then(response => response.json())
      .then(data => {
          console.log(data);
        this.setState({
            data: data.main_dishes
        });
      },
      err => console.log("err" + err));
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
                    toChange[toChange.indexOf(item)].meals[
                      modifiedIndex
                    ] = newData;

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
            })
        }}
        columns={[
          { title: "Name", field: "name" },
          { title: "Price", field: "price", type: "numeric" },
          { title: "Description", field: "description" },
          {
            title: "Picture",
            field: "picture"
          }
        ]}
        data={item.meals.map(food => ({
          name: food.name,
          description: food.description,
          picture: food.picture
        }))}
        title={item.name}
      />
    ));

    return <div style={{ maxWidth: "100%" }}>{allTables}</div>;
  }
}

export default Table