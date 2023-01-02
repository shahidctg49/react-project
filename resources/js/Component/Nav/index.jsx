import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ApiService from '../../services/ApiService';

function Nav(){

    const [Msg, setMsg]= useState();
    const [show, setShow] = useState(false);
    const [Payment, setPayment]= useState([]);
    const [PaymentM, setPaymentM]= useState([]);
    const [Investor, setInvestor]= useState([]);

    const [Due, setDue]= useState(0);
    const [Actual_amount, setActual_amount]= useState(0);
    const [Fees, setFees]= useState(0);
    const [TotalFees, setTotalFees]= useState(0);
    const [Number_shares, setNumber_shares]= useState(1);
    const [Pay_already, setPay_already]= useState(0);

    const handelInputChange = event =>{
        const {name, value} =event.target;
        setPayment({...Payment,[name]:value});
    }
    useEffect(() => {
        getPaymentM();
        getInvestor();
      }, []);
    const getPaymentM= () =>{
        ApiService.paymentMethod().then(res=>{
            setPaymentM(res.data);
        }).catch(e=>{
            console.log(e);
        });
    }
    const getInvestor= () =>{
        ApiService.Investor().then(res=>{
            setInvestor(res.data);
        }).catch(e=>{
            console.log(e);
        });
    }
    const checkPayment= () =>{
        ApiService.checkPayment(Payment).then(res=>{
            setDue(res.data.due)
            setActual_amount(res.data.actual_amount);
            setFees(res.data.fees);
            setPay_already(res.data.pay_already);
            setNumber_shares(res.data.number_shares[0]);
            setTotalFees((res.data.number_shares[0] * res.data.fees));
        }).catch(e=>{
            console.log(e);
        });
    }

    const savePayment= () =>{
        console.log(Payment);
        ApiService.savePayment(Payment).then(res=>{
         setMsg(res.data);
        }).catch(e=>{
            console.log(e);
        });
    }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
            <div className="container">
                <a className="navbar-brand" href="#page-top"><img src="fontent/assets/img/navbar-logo.svg" alt="..." /></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fas fa-bars ms-1"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
                        <li className="nav-item"><a className="nav-link" href="#services">Services</a></li>
                        <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <header className="masthead">
            <div className="container">
                <div className="masthead-subheading">Welcome To Our KbFirm!</div>
                <div className="masthead-heading text-uppercase">You can pay your instalment </div>
                <Button className="btn btn-primary btn-xl text-uppercase" variant="primary" onClick={handleShow}>
        Pay Now
      </Button>
                {Msg}
            </div>
        </header>
        
        <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" show={show} onHide={handleClose} >
      
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form action="" method="get">
            <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <label for="investor_id">Investor </label>
              <select name="investor_id" onChange={handelInputChange} className="form-control" id="investor_id">
                <option value="">Select Investor</option>
                {Investor.length>0 && Investor.map((item,index)=>(
                <option key={index} value={item.id}>{item.name} - {item.contact_no}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label for="is_once">Include One Time Payment (Subscription)</label> <br/>
              <select name="is_once" onChange={handelInputChange} id="is_once" className="form-control">
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label for="fees_month">Fees Month</label> <br/>
              <input type="month" onChange={handelInputChange} name="fees_month" id="fees_month" className="form-control"/>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label for="date">Date</label>
              <input type="date" onClick={() => checkPayment()} onChange={handelInputChange} className="form-control" name="date" id="date"/>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label for="book_no">Book No</label>
              <input type="number" onChange={handelInputChange} className="form-control" name="book_no" id="book_no"/>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label for="receipt_no">Receipt No</label>
              <input type="number" onChange={handelInputChange} className="form-control" name="receipt_no" id="receipt_no"/>
            </div>
          </div>
          
          <div className="col-sm-6">
            <div className="form-group">
              <label for="payment_method">Payment Method</label>
              <select className="form-control" onChange={handelInputChange} name="payment_method" id="payment_method">
                <option value="">Select Method</option>
                {PaymentM.length>0 && PaymentM.map((item,index)=>(
                <option key={index} value={`${item.id}-${item.table_name}`}>{item.head_name} - {item.head_code}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label for="totalpayable">Pay Amount</label>
              <input type="number" onChange={handelInputChange} className="form-control" name="amount" id="totalpayable"/>
            </div>
          </div>
          
          <div className="col-sm-6">
            <div className="form-group">
              <label for="receipt_no">Number of Share</label>
              <input type="text" onClick={handelInputChange} value={Number_shares} className="form-control" name="number_of_share" id="number_of_share"/>
            </div>
          </div>
          
          <div className="col-sm-6">
            <div className="form-group">
              <label for="receipt_no">Total Fees</label>
              <input type="number" onClick={handelInputChange} value={TotalFees} className="form-control" name="totalpayable" id="totalpayable"/>
            </div>
          </div>
          <div className="col-sm-6">
            <table className="table">
              <tr>
                <th>On Due</th>
                <th><span className="due">{Due}</span></th>
              </tr>
              <tr>
                <th>Already Pay</th>
                <th><span className="pay_already">{Pay_already}</span></th>
              </tr>
              <tr>
                <th>Total Fees</th>
                <th><span className="number_shares">{Number_shares}</span> X <span className="fees">{Fees}</span> = <span className="totalfees">{TotalFees}</span></th>
              </tr>
              <tr>
                <th>Payable</th>
                <td><span className="totalpayable">{TotalFees}</span></td>
              </tr>
            </table>
            
          </div>
          <div className="col-sm-4">
            <button className='btn btn-primary mt-4' onClick={() => savePayment()} type='button'> Save</button>
          </div>
        </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    );
}
export default Nav
