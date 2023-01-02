import http from "../http-common";
const savePayment = data=>{
    return http.post('savePayment',data);
}

const paymentMethod = () =>{
    return http.get('paymethod');
}

const Investor = ()=>{
    return http.get('investor');
}

const checkPayment = data=>{
    return http.post('paymentajax',data);
}

const ApiService = {
    savePayment,paymentMethod,Investor,checkPayment
}

export default ApiService;