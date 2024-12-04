import React from 'react'
import { Button, Table } from 'react-bootstrap'
import Editfield from './Editfield'
import { BiTrash } from 'react-icons/bi'

export default function Invoiceitem(props) {
  var Itemtable = props.items.map(item => (
    <Itemrow 
      onItemizedItemEdit={props.onItemizedItemEdit}
      item={item}
      OnDelEvent={props.OnRowDel}
      key={item.id}
      currency={props.currency}
    />
  ))

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price/Rate</th>
            <th className='text-center'>Action</th>
          </tr>
        </thead>
        <tbody>{Itemtable}</tbody>
      </Table>
      <Button className='fw-bold btn btn-success'onClick={props.OnRowAdd}>Add item</Button>
    </div>
  )
}

function Itemrow(props) {
  const OnDelEvent = () => {
    props.OnDelEvent(props.item)
  }

  return (
    <tr>
      <td style={{ width: '100%' }}>
        <Editfield
          onItemizedItemEdit={props.onItemizedItemEdit}
          cellData={{
            type: 'text',
            name: 'name',
            placeholder: 'Item Name',
            value: props.item.name,
            id: props.item.id
          }}
        />
        <Editfield
          onItemizedItemEdit={props.onItemizedItemEdit}
          cellData={{
            type: 'text',
            name: 'description',
            placeholder: 'Item Description',
            value: props.item.description,
            id: props.item.id
          }}
        />
      </td>
      <td style={{ minWidth: '70px' }}>
        <Editfield
          onItemizedItemEdit={props.onItemizedItemEdit}
          cellData={{
            type: 'number',
            name: 'quantity',
            min: 1,
            step: 1,
            value: props.item.quantity,
            id: props.item.id
          }}
        />
      </td>
      <td style={{ minWidth: '130px' }}>
        <Editfield
          onItemizedItemEdit={props.onItemizedItemEdit}
          cellData={{
            leading: props.currency,
            type: 'number',
            name: 'price',
            min: 1,
            step: 0.01,
            textAlign: 'text-end',
            placeholder: 'Item Price',
            value: props.item.price,
            id: props.item.id
          }}
        />
      </td>
      <td className='text-center' style={{ minWidth: 50 }}>
        <BiTrash
          onClick={OnDelEvent}
          style={{ height: '33px', width: '33px', padding: '7.5px' }}
          className='text-white mt-1 btn btn-danger'
        />
      </td>
    </tr>
  )
}
