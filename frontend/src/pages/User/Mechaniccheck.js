import React from 'react'
import Checkavilability from '../../components/user/Checkavilability'
import Paymentform from '../../components/user/Payment/Paymentform'
import Razerpay from '../../components/user/Payment/Razerpay'
import RazerPay from '../../components/user/Payment/RzerPay'
const Mechaniccheck = () => {
  return (
    <div>
    <Checkavilability/>
    <br>
    </br>
    <Paymentform/>
    <br>
    </br>
    {/* <Razerpay/> */}
<RazerPay/>
    </div>
  )
}

export default Mechaniccheck