import React,{Fragment} from 'react'
import MaterialTable from "material-table"
import {Button} from '@material-ui/core'

const TableCrud = ({Actions,data,handleModalInsert}) => {

      const columns = [
            { title: 'name', field: 'name' },
            { title: 'uv', field: 'uv' },
            { title: 'pv', field: 'pv' },
            { title: 'amt', field: 'amt', type: 'numeric'}
          ]
          
      return (
      <Fragment>
        
        <Button onClick={()=>handleModalInsert()}>Post</Button>

        <MaterialTable
            columns={columns}
            data={data}
            title="Data Table"  
            options={{actionsColumnIndex: 4, rowStyle: {backgroundColor: '#EEE'}}}
            localization={{ header:{actions: "Actions"} }}

            actions={[ {icon: 'edit',tooltip: 'Edit',onClick: (event, rowData) => Actions (rowData, "Edit")},
                       {icon: 'delete',tooltip: 'Delete',onClick: (event, rowData) => Actions (rowData, "Delete")} ]}
        />

      </Fragment>
      )
}

export default TableCrud
