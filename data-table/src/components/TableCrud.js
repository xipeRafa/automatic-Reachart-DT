import MaterialTable from "material-table"
import {Fragment} from 'react'
import {Button} from '@material-ui/core'

const TableCrud = ({ Actions, data, handleModalInsert }) => {

      const columns = [
            { title: 'name', field:'name'},
            { title: 'uv', field: 'uv' },
            { title: 'pv', field: 'pv' },
            { title: 'amt', field: 'amt'}
      ]
          
      return (

        <Fragment>
        
          <Button onClick={()=> handleModalInsert() }>Post New Info</Button>

          <MaterialTable
              columns={columns}
              data={data}
              title="Data Table"  
              options={ 
                        { 
                         actionsColumnIndex: 4,
                         rowStyle: {backgroundColor: '#EEE'}
                        }
                      }

              localization={ 
                              { 
                                header:{actions: "Actions"} 
                              } 
                           }

              actions={[ 
                        {
                          icon: 'edit', 
                          tooltip: 'Edit', 
                          onClick: (event, rowData) => Actions(rowData, "Edit")
                        },
                        {
                          icon: 'delete',
                          tooltip: 'Delete',  
                          onClick: (event, rowData) => Actions(rowData, "Delete")
                        }
                      ]}
          />

        </Fragment>

      )
}

export default TableCrud
