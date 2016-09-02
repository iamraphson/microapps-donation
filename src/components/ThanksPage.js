/**
 * Created by Raphson on 7/17/16.
 * "Thank You" Component
 * Component to thank user for user's donations.
 */
import React, {Component} from 'react';
import Auth from '../auth/auth';

class ThanksPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            donationData: JSON.parse(Auth.getPaymentData()),
        }

    }

    render(){
        return (
            <div>
                <div className="col-md-8 col-md-offset-2">
                    <h1 className="text-center thanksSpace">Thanks For Donating To Our Organization</h1>
                    <h6 className="text-center">Below is your donation details</h6>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <strong>Currency: </strong>{this.state.donationData.currency}
                        </li>
                        <li className="list-group-item">
                            <strong>Amount: </strong>{this.state.donationData.amount}
                        </li>
                        <li className="list-group-item">
                            <strong>Transaction ID: </strong>{this.state.donationData.id}
                        </li>
                        <li className="list-group-item">
                            <strong>BuildNumber: </strong>{this.state.donationData.buildNumber}
                        </li>
                        <li className="list-group-item">
                            <strong>NDC: </strong>{this.state.donationData.ndc}
                        </li>
                        <li className="list-group-item">
                            <strong>TimeStamp: </strong>{this.state.donationData.timestamp}
                        </li>
                    </ul>
                </div>
            </div>
        )
    }


}
export default ThanksPage;