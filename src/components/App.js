/**
 * Created by Raphson on 7/16/16.
 * Main Component of the application
 *
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import DonationForm from './DonationForm';
import PaymentForm from './PaymentForm';
import ThanksPage from './ThanksPage';
import AppConstants from '../constants/AppConstants';
import Auth from '../auth/auth';
import $ from 'jquery';



class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            canSubmit: false,
            amount: 0,
            currency: 'USD',
            checkOutData : [],
            page: undefined,
            donationData:  JSON.parse(Auth.getPaymentData()),
        };
    }

    /**
     * Prepare Checkout from PAYON API
     * using Jquery Ajax to make ajax call to PAYON API
     */
    getCheckout(){
        //Set All Parameter/ Data needed for checkout
        var data = {
            'authentication.userId' : AppConstants.USER_ID,
            'authentication.password' : AppConstants.PASSWORD,
            'authentication.entityId' : AppConstants.ENTITY_ID,
            'amount' : this.state.amount,
            'currency' : this.state.currency,
            'paymentType' : 'DB'
        };

        $.ajax({
            method: 'post',
            url: 'https://test.oppwa.com/v1/checkouts',
            data: data,
            dataType: 'json',
            cache: false,
            success: function(data){
                if(/^(000\.200)/.test(data.result.code)){
                    data.amount = parseFloat(this.state.amount);
                    data.currency = this.state.currency;
                    Auth.storeCheckOutData(data);
                    this.setState({checkOutData: data, page: 'payment'});
                }
            }.bind(this),
            error : function(xhr, status, err){
                alert(err);
            }.bind(this)
        });
    }

    /**
     * Get Payment status from PAYON API
     * using jquery to make the magic ajax call to PAYON API
     * @param resourcePath
     */
    getPaymentStatus(resourcePath){
        var data = {
            'authentication.userId' : AppConstants.USER_ID,
            'authentication.password' : AppConstants.PASSWORD,
            'authentication.entityId' : AppConstants.ENTITY_ID,
        }

        $.ajax({
            url: 'https://test.oppwa.com' + resourcePath,
            data: data,
            dataType: 'json',
            success: function(data){
                this.verifyPayment(data);
            }.bind(this),
            error : function(xhr, status, err){
                this.setState({page: 'home'});
            }.bind(this)
        });
    }

    /**
     * make payment verification to check if payment is clean
     * if so, redirect to "thankyou" page
     * @param data
     */
    verifyPayment(data){
        if(/^(000\.000\.|000\.100\.1|000\.[36])/.test(data.result.code)){
            var checkOutObject = JSON.parse(Auth.getCheckOutData());
            if(checkOutObject.amount != data.amount){
                this.setState({page: 'home'});
                alert("Invalid Transaction!!");
                return;
            }

            if(checkOutObject.ndc != data.ndc){
                this.setState({page: 'home'});
                alert("Invalid Transaction!!");
                return;
            }

            if(checkOutObject.buildNumber != data.buildNumber){
                this.setState({page: 'home'});
                alert("Invalid Transaction!!");
                return;
            }

            if(checkOutObject.currency != data.currency){
                this.setState({page: 'home'});
                alert("Invalid Transaction!!");
                return;
            }
            Auth.storePaymentData(data);
            this.setState({page: 'thanksPage'});

        }
    }

    /**
     * Operations to be performed before mounting component to user's browser
     */
    componentWillMount(){
        console.log(this.state.donationData);
        if(Auth.canUserDonate(this.state.donationData)){
            this.getRequestOrigin();
        } else {
            this.setState({page: 'thanksPage'});
        }
    }

    /**
     * Process donation form and prepare checkout for payemtn
     * @param amount
     * @param currency
     */
    handleFormSubmit(amount, currency){
        this.setState({amount: amount, currency: currency}, function () {
            this.getCheckout();
        });
    }

    render() {
        if(this.state.page == "home"){
            var displayResult = <DonationForm onDonationSubmit={this.handleFormSubmit.bind(this)} />;
        } else  if(this.state.page == 'payment'){
            var displayResult = <PaymentForm checkoutId={this.state.checkOutData.id} />;
        } else  if(this.state.page == 'thanksPage'){
            var displayResult = <ThanksPage />;
        }
        return (
            <div>
                { displayResult }
            </div>
        )
    }

    /**
     * Get where request is coming from(User or from PAYON API)
     */
    getRequestOrigin(){
        var resourcePath = Auth.getParameterByName('resourcePath');
        var paymentId = Auth.getParameterByName('id');
        if(paymentId != null && resourcePath != null){
            //Request is from PAYON API
            this.getPaymentStatus(resourcePath);
        } else {
            //Request is from user
            this.setState({page: 'home'});
        }
    }
}

export  default App;