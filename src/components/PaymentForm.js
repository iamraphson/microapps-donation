/**
 * Created by Raphson on 7/17/16.
 * Payment form Component
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import AppConstants from '../constants/AppConstants';


class PaymentForm extends Component {

    constructor(props){
        super(props);
    }

    /**
     * Add PayON Javascript widget after rendering Component to User
     */
    componentDidMount () {
        $('#paymentSection').append
        ("<script src='https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=" + this.props.checkoutId + "'></script>");
    }

    render() {
        return (
            <div>
                <div className="col-md-8 col-md-offset-2" id="paymentSection">
                    <form action={AppConstants.PAYON_REDIRECT} className="paymentWidgets">VISA MASTER AMEX</form>
                </div>
            </div>
        )
    }
}

export  default PaymentForm;