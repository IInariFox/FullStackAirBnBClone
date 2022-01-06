import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class ContinueCheckout extends React.Component {
  constructor(props) {
    super(props)
   
  }
  
  resumeCheckout = (e) => {
    e.preventDefault();
    const checkout_session_id = this.props.checkout_session_id
    return fetch(`/api/charges?booking_id=${checkout_session_id}&cancel_url=${window.location.pathname}`, safeCredentials({
      method: 'POST',
    }))
      .then(handleErrors)
      .then(response => {
        const stripe = Stripe(process.env.STRIPE_PUBLISHABLE_KEY);
  
        stripe.redirectToCheckout({
          sessionId: response.charge.checkout_session_id,
        }).then((result) => {
        });
      })
      .catch(error => {
        console.log(error);
      })
  }

  render () {
      return (
       <div>
         <button className="btn btn-success" onClick={this.resumeCheckout}>Continue Checkout</button>
       </div>
      );
    };
  }

export default ContinueCheckout;