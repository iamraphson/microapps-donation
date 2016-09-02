import moment from 'moment';
import AppConstants from '../constants/AppConstants';
module.exports = {

    /**
     * Store Checkout data into local storage after making checkout query from payON API
     * @param data
     */
    storeCheckOutData(data){
        localStorage.checkOutData = JSON.stringify(data);
    },

    /**
     * Return Checkout data stored in local storage
     * @returns {Array|*|null}
     */
    getCheckOutData(){
        return localStorage.checkOutData || null;
    },

    /**
     * Delete Checkout data from local storage.
     */
    deleteCheckOutData() {
        delete localStorage.checkOutData;
    },

    /**
     * Store Payment details in local storage and delete check out data..
     * @param data
     */
    storePaymentData(data){
        this.deleteCheckOutData();
        localStorage.paymentData = JSON.stringify(data);
    },

    /**
     * Return Payment data stored in local storage
     * @returns {Array|*|null}
     */
    getPaymentData(){
        return localStorage.paymentData || null;
    },

    /**
     * Check if user has donated within the last 1 hr
     * @param data
     * @returns {boolean}
     */
    canUserDonate(data){
        if(data != null){
            var then = moment(data.timestamp).utcOffset('+0000').format('YYYY-MM-DD HH:mm:ss');
            var now = moment(Date.now()).utcOffset('+0000').format('YYYY-MM-DD HH:mm:ss');
            var diff = moment.duration(moment(now).diff(moment(then)));
            console.log(then + ":then<->now:" + now)
            console.log(diff.asMinutes());
            return (diff.asMinutes() > AppConstants.NEXT_PAYMENT_IN_MIN);
        }
        console.log("isnull");
        return true;

    },

    /**
     * Get URL Query String..
     * @param name
     * @param url
     * @returns {*}
     */
    getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
};
