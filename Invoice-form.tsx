import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/esm/Card";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import Invoiceitem from "./Invoice-item";
import InvoiceModel from "./InvoiceModel";
import { InputGroup, Button } from "react-bootstrap";

export default function Invoiceform() {
  const [state, setState] = useState({
    isOpen: false,
    currency: '₹',
    currentdate: "",
    InvoiceNumber: 1,
    billto: "",
    billtoaddress: "",
    billtoemail: "",
    billfrom: "Yuvi",
    billfromemail: "yuvarajvictor1234@gmail.com",
    billfromaddress: "Chennai, Tamil Nadu",
    notes: "",
    subtot: 0.00,
    subtotal: 0.00, // Initialize subtotal
    taxrate: 0,
    taxamount: 0.00,
    discountrate: 0,
    discountmoney: 0,
    discountAmount: 0.00,
  });

  const [total, setTotal] = useState(0.00);
  const [items, setItems] = useState([
    {
      id: "0",
      name: "",
      description: "",
      price: 1.0,
      quantity: 1,
    },
  ]);

  const onChange = (event) => {
    setState(state => ({
      ...state, [event.target.name]: event.target.value,
    }));
  };

  const onItemizedItemEdit = (event) => {
    const IndividualItem = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value,
    };

    var newItems = items.map((item) => {
      if (item.id === IndividualItem.id) {
        return { ...item, [IndividualItem.name]: IndividualItem.value };
      }
      return item;
    });
    setItems(newItems);
  };

  const handleAddEvent = () => {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var item = {
      id,
      name: "",
      price: 1.0,
      description: "",
      quantity: 1,
    };
    setItems(items => [...items, item]);
  };

  const handleRowDel = (item) => {
    if (items.length > 1) {
      setItems((items) => items.filter((data) => data.id !== item.id));
    } else {
      setItems([{
        id: "0",
        name: "",
        description: "",
        price: 1.0,
        quantity: 1,
      }]);
    }
  };

  const OnCurrencyChange = (selectedOption) => {
    setState((state) => ({ ...state, currency: selectedOption }));
  };

  const handleCalculateTotal = () => {
    let subtotal = 0;
    items.forEach((item) => {
      subtotal += parseFloat(item.price) * Number(item.quantity);
    });
    subtotal = parseFloat(subtotal).toFixed(2);
    const discountAmount = parseFloat((subtotal * (parseFloat(state.discountrate) / 100)).toFixed(2));
    const taxAmount = parseFloat((subtotal * (parseInt(state.taxrate) / 100)).toFixed(2));
    const total = parseFloat(subtotal) + taxAmount - discountAmount;
    const formattedTotal = total.toFixed(2);
    
    setTotal(total);
    setState(state => ({
      ...state,
      subtotal,
      total:total.toFixed(2),
      taxamount:taxAmount,
      discountAmount,
    }));
  };

  useEffect(() => {
    handleCalculateTotal();
  }, [items , state.discountrate, state.taxrate]);

  return (
    <Form onSubmit={(e) => {
      e.preventDefault();
      setState((state) => ({ ...state, isOpen: true }));
    }}>
      <Row>
        <Col md={8} lg={9} id="name">
          <Card className='d-flex p-4 p-xl-5 my-3 my-xl-4'>
            <div className="flex-row justify-content-between">
              <div className="d-flex flex-row mb-3">
                <div className="mb-2">
                  <h2 className="bird">INVOICE GENERATOR</h2>
                  <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                  <span className="current-date">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="d-flex flex-row mb-3">
                <div className="mb-2">
                  <span className="fw-bold">Invoice&nbsp;Number:&nbsp;</span>
                  <span className="current-date">
                    {state.InvoiceNumber}
                  </span>
                </div>
              </div>
            </div>
            <hr className="my-4" />
            <Row className="mb-5">
              <Col>
                <Form.Label className='fw-bold'>Customer Details</Form.Label>
                <Form.Control placeholder="Enter your Name" value={state.billto} type="text" name='billto' className="my-2" onChange={onChange} autoComplete="Name" required={true} />
                <Form.Control placeholder="Enter your Email" value={state.billtoemail} type="text" name='billtoemail' className="my-2" onChange={onChange} autoComplete="Email" />
                <Form.Control placeholder="Enter your Address" value={state.billtoaddress} type="text" name='billtoaddress' className="my-2" onChange={onChange} autoComplete="Address" required={true} />
              </Col>
              <Col>
                <Form.Label className="fw-bold">Bill from:</Form.Label>
                <Form.Control value={state.billfrom} className="my-2" disabled={true} />
                <Form.Control value={state.billfromemail} className="my-2" disabled={true} />
                <Form.Control value={state.billfromaddress} className="my-2" disabled={true} />
              </Col>
            </Row>
            <Invoiceitem items={items} onItemizedItemEdit={onItemizedItemEdit} OnRowAdd={handleAddEvent} OnRowDel={handleRowDel}
              currency={state.currency} />
              <Row className="mt-4 justify-content-end">
                <Col lg={6}>
                <div className="d-flex flex-row align-items-start justify-content-between">
                    <span className="fw-bold">SubTotal:</span>
                    <span>
                        {state.currency}{state.subtotal}
                    </span>
                    </div>
                    <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                    <span className="fw-bold">Discount:</span>
                    <span>
                        {state.discountrate}% {state.currency}{state.discountAmount}
                    </span>
                    </div>
                    <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                    <span className="fw-bold">Tax:</span>
                    <span>
                        {state.taxrate}% {state.currency}{state.taxamount}
                    </span>
                    </div>
                    <div className="d-flex flex-row align-items-start justify-content-between mt-2" style={{fontSize:'1.125rem'}}>
                    <span className="fw-bold">Total:</span>
                    <span>
                      {state.currency}
                      {state.total}
                    </span>
                    </div>
                    </Col>
              </Row>
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <div className="sticky-top pt-md-3 pt-xl-4" id="sticky">
            <Button variant="primary" type="submit" className="d-block w-100 mb-3">Review Invoice</Button>
            <Form.Group className="md-3">
              <Form.Label className="fw-bold">Currency:</Form.Label>
              <Form.Select onChange={(e) => OnCurrencyChange(e.target.value)}
                className="btn btn-light my-1">
                <option value='₹'>INR</option>
                <option value='$'>USD</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Tax Rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control name="taxrate" type="number" value={state.taxrate} onChange={onChange} className="bg-white-border" placeholder="0.00" min="0.00" step="0.01" max="100.00" />
                <InputGroup.Text className="bg-light fw-bold text-secondary small">%</InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Discount Rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control name="discountrate" type="number" value={state.discountrate} onChange={onChange} className="bg-white-border" placeholder="0.00" min="0.00" step="0.01" max="100.00" />
                <InputGroup.Text className="bg-light fw-bold text-secondary small">%</InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </div>
        </Col>
      </Row>
      <InvoiceModel showModel={state.isOpen}
      closeModel={() => setState((state) => ({ ...state, isOpen: false }))}
      info={state}
      items={items}
      total={total} />
    </Form>
  );
}