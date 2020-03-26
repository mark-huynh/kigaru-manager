import React from 'react';
import MaterialTable from 'material-table';
import CircularProgress from '@material-ui/core/CircularProgress';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.items
    };
  }

  render() {
    let allTables = this.props.items ? this.props.items.map(item => (
      <MaterialTable
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                newData.collection = this.props.label;
                newData.groupName = item.name;
                this.props.onCreate(newData);
                resolve();
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                oldData.collection = this.props.label;
                oldData.groupName = item.name;
                this.props.onUpdate(oldData, newData);
                resolve();
                // if (oldData) {
                //   this.setState(prevState => {
                //     let toChange = [...prevState.data];
                //     let allMeals = toChange[toChange.indexOf(item)].meals;
                //     let modifiedIndex = oldData.tableData.id;

                //     console.log(modifiedIndex);
                //     toChange[toChange.indexOf(item)].meals[
                //       modifiedIndex
                //     ] = newData;

                //     console.log(toChange);
                //     return { ...prevState, toChange };
                  // });
                // }
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                oldData.collection = this.props.label;
                oldData.groupName = item.name;
                this.props.onDelete(oldData);
                resolve();
                // this.setState(prevState => {
                //   const data = [...prevState.data];
                //   data.splice(data.indexOf(oldData), 1);
                //   return { ...prevState, data };
                // });
              }, 600);
            })
        }}
        columns={[
          { title: "Name", field: "name" },
          { title: "Price", field: "price"},
          { title: "Description", field: "description" },
          {
            title: "Picture",
            field: "picture"
          }
        ]}
        data={item.meals.map(food => ({
          name: food.name,
          description: food.description,
          picture: food.picture,
          price: food.price
        }))}
        title={item.name}
      />
    )) : <CircularProgress/>;

    return <div style={{ maxWidth: "100%" }}>{allTables}</div>;
  }
}

export default Table