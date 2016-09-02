/**
 * Created by Raphson on 7/16/16.
 * Donation Form Component
 * Displays Donation form  so user can donate
 */
import React, {Component} from 'react';
import ErrorAlert from  './ErrorAlert';

class DonationForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            canSubmit: false,
            error : ''
        };

    }

    render(){
        //display error in form
        if(this.state.error == ''){
            var errorDisplay = '';
        } else {
            var errorDisplay = <ErrorAlert error={this.state.error} />;
        }
        return (
            <div>
                <div className="col-md-8 col-md-offset-2">
                    {errorDisplay}
                    <div className="search-form">
                        <h1 className="text-center">DONATION</h1>
                        <form onSubmit={this.onSubmit.bind(this)}>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="currency">Select Currency</label>
                                    <select className="form-control" ref="currency" id="currency">
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="amount">Amount</label>
                                    <input type="text" className="form-control" ref="amount" id="amount" placeholder="Amount" />
                                </div>
                            </div>
                            <button className="btn btn-primary btn-block" disabled={this.state.canSubmit}>Donate</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    /**
     * To Handle on submit form when user input is complete
     * @param e
     */
    onSubmit(e){
        e.preventDefault();
        var currency = this.refs.currency.value;
        var amount = parseFloat(this.refs.amount.value.trim());

        //check if input from user is actaully number
        if(!this.checkNumber(amount)){
            this.setState({error : "Amount must be number!"});
            return;
        }

        //check if Amount is between 1 and 100
        if(amount > 100 || amount < 0){
            this.setState({error :"Amount must be between 1 and 100"});
            return;
        }

        //Helps to disable donate button..
        this.setState({canSubmit: true});
        this.props.onDonationSubmit(amount, currency);
    }

    /**
     * check if an input is number or not
     * @param z
     * @returns {boolean}
     */
    checkNumber(z) {
        return isFinite(z) && !isNaN(parseInt(z));
    }


}
export default DonationForm;