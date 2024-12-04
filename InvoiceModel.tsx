import React from 'react'
import html2canvas from 'html2canvas'
import jspdf, { jsPDF } from 'jspdf'
import { Button, Col, Modal,Row, Table } from 'react-bootstrap'
export default function InvoiceModel(props) {
  const generateInvoice=()=>{
    html2canvas(document.querySelector("#invoiceCapture")).then((canvas)=>{
      const imgData= canvas.toDataURL("image/png",1.0)
      const pdf=new jsPDF({
        orientation:"potrait",
        unit:'pt',
        format:[612,792],
      })
      pdf.internal.scaleFactor=1
      const imgProps=pdf.getImageProperties(imgData)
      const pdfWidth=pdf.internal.pageSize.getWidth();
      const pdfHeight=(imgProps.height*pdfWidth)/ imgProps.width;
      pdf.addImage(imgData,"PNG",0,0,pdfWidth,pdfHeight)
      pdf.save("invoice.pdf")
    })

  }
  return (
    <div>
      <Modal show={props.showModel} onHide={props.closeModel} size='lg' centered>
        <div id='invoiceCapture'>
          <div className='d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4'>
            <div className='w-100'>
              <h4 className='fw-bold my-2'>
                {props.info.billfrom}
              </h4>
              <h6 className='fw-bold text-secondary mb-1'>
                Invoice #:{props.info.InvoiceNumber}
              </h6>
            </div>
            <div className='text-end ms-4'>
              <h6 className='fw-bold mt-1 mb-2'>Amount&nbsp;Due:</h6>
              <h5 className='fw-bold text-secondary'>
                {props.info.currency} {props.total}
              </h5>
            </div>
          </div>
          <div className='p-4'>
            <Row className="mb-4">
              <Col md={4}>
              <div className='fw-bold'>Billed To: </div>
              <div>{props.info.billto ||""}</div>
              <div>{props.info.billtoaddress ||""}</div>
              <div>{props.info.billtoemail ||""}</div>
              </Col>
              <Col md={4}>
              <div className='fw-bold'>Billed From: </div>
              <div>{props.info.billfrom ||""}</div>
              <div>{props.info.billfromaddress ||""}</div>
              <div>{props.info.billfromemail ||""}</div>
              </Col>
              <Col md={4}>
                <div className='fw-bold mt-2'>Date of Issue:</div>
                <div>{new Date().toLocaleDateString()}</div>
              </Col>
              </Row>
              <Table className='mb-0'>
                <thead>
                  <tr>
                    <th>Qty</th>
                    <th>Description</th>
                    <th className='text-end'>Price</th>
                    <th className='text-end'>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {props.items.map((item,i)=>{
                    return(
                      <tr id={i} key={i}>
                        <td style={{width:'70px'}}>{item.quantity}</td>
                        <td>{item.name} - {item.description}</td>
                        <td className='text-end' style={{width:"100px"}}>
                          {props.currency} {item.price}
                        </td>
                        <td className='text-end' style={{width:"100px"}}>
                          {props.currency} {item.price * item.quantity}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
              <Table>
                <tbody>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr className='text-end'>
                    <td></td>
                    <td className='fw-bold' style={{width:"100px"}}>SubTotal</td>
                    <td className='fw-bold' style={{width:"100px"}}>
                    {props.info.currency}{props.info.subtotal}
                    </td>
                  </tr>
                  <tr className='text-end'>
                    <td></td>
                    <td className='fw-bold'style={{width:"100px"}}>Tax</td>
                    <td className='fw-bold' style={{width:"100px"}}>
                      {props.info.currency}{props.info.taxamount}
                    </td>
                  </tr>
                  {props.discountAmount!==0.0 &&(
                    <tr className='text-end'>
                      <td></td>
                      <td className='fw-bold'style={{width:"100px"}}>Discount</td>
                      <td className='fw-bold' style={{width:"100px"}}>
                        {props.info.currency} {props.info.discountAmount}
                      </td>
                    </tr>
                  )}
                  <tr className='text-end'>
                    <td></td>
                    <td className='fw-bold' style={{width:"100px"}}>
                      Total
                    </td>
                    <td className='fw-bold' style={{width:"100px"}}>
                      {props.info.currency} {props.total}
                    </td>
                  </tr>
                </tbody>
              </Table>
              {props.info.notes && (
                <div className="bg-light py-3 px-4 rounded">{props.info.notes}</div>
              )}
          </div>
        </div>
        <div className='pb-4 px-4'>
          <Button variant='primary' className='d-block w-100 mt-3 mt-md-0' onClick={generateInvoice}>
            Download
          </Button>
        </div>
      </Modal>
    </div>
  )
}
