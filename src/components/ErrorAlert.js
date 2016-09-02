/**
 * Created by Raphson on 7/17/16.
 * Error Alert Component
 */
import React, {Component} from 'react';

class ErrorAlert extends Component{

    render(){
        return (
            <div>
                <div className="alert alert-danger erroralert" role="alert">
                    <strong>Oh snap!</strong> {this.props.error}
                </div>
            </div>
        )
    }



}
export default ErrorAlert;