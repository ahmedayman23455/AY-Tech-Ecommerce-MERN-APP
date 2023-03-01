import React, { useState } from 'react';
import {
  PayPalButtons,
  PayPalScriptProvider,
} from '@paypal/react-paypal-js';
/* ------------------------------------------------------ */
const PaypalButton = () => {
  const [orderId, setOrderId] = useState();
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  //   createOrder
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: 'Iphone pro max 2023',
            amount: {
              currency_code: 'USD',
              value: 20,
            },
          },
        ],

        application_context: {
          shipping_preference: 'NO_SHIPPING',
        },
      })
      .then((orderId) => {
        setOrderId(orderId);
        return orderId;
      });
  };

  //   onApprove
  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      const { payer } = details;
      setSuccess(true);
    });
  };

  //   onError
  const onError = (data, actions) => {
    setErrorMessage('An error occured with your payment');
  };

  return (
    <div>
      <PayPalScriptProvider
        options={{
          'client-id':
            'AfiVSDzKu697HftbOwDKMOsOfsB6Q2Fe3waeE0zPvX1tEJ8wZza8reFEvIJUAdQleQMNpU5hEFbGyqVU',
        }}
      >
        <PayPalButtons
          style={{ layout: 'vertical' }}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
        />

        {errorMessage && (
          <h1> Your payment failed. Please try again</h1>
        )}

        {success && (
          <h1>
            Your Payment has been done successfully please check email
          </h1>
        )}
      </PayPalScriptProvider>
    </div>
  );
};

export default PaypalButton;

// import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
// import { useState } from 'react';
// import './App.css';
// function App() {
//   const [show, setShow] = useState(false)
//   const [success, setSuccess] = useState(false)
//   const [errorMessage, setErrorMessage] = useState('')
//   const [orderId, setOrderId] = useState(false)
//
//   const createOrder = (data, actions) => {
//     return actions.order.create({
//       purchase_units: [
//         {
//           description: 'This is the Book Worth 100
// ,
//           amount: {
//             currency_code: 'USD',
//             value:100
//           },
//         },
//       ],
//       application_context: {
//         shipping_preference:'NO_SHIPPING'
//       }
//     })
//       .then((orderID) => {
//         setOrderId(orderID)
//         return orderID
//     })
//   }
//   const onApprove = (data,actions) => {
//     return actions.order.capture().then(function (details) {
//       const { payer } = details
//       setSuccess(true)
//     })
//   }
//   const onError = (data, actions) => {
//     setErrorMessage("An error occured with your payment")
//   }
//   return (
//     <div className="App">
//       <PayPalScriptProvider
//         options={{
//           "client-id":
//             "###replacethiswithyourownclientid###"
//         }}
//       >
//       <h1>Simple Book Worth 100lt;/h1>
//       <span>100lt;/span>
//       <button onClick={() => setShow(true) } type='submit'>
//         Buy Now
//       </button>
//       {show ? (
//           <PayPalButtons style={{ layout: 'vertical' }} createOrder={createOrder}
//             onApprove={onApprove} onError={onError}/>
//         ) : null}
//
//         {success ? (
//           <h1>Your Payment has been done successfully please check email</h1>
//         ):<h2>payment is pending</h2>}
//
//     </PayPalScriptProvider>
//     </div>
//   );
// }
// export default App;
//
