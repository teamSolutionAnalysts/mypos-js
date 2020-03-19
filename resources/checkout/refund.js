'use strict';

const uuidv4 = require('uuid/v4');
const utils = require('../../utils/common');
const CheckoutApiRequest = require('../abstract/checkout-api-request');

class CheckoutRefundRequest extends CheckoutApiRequest {
    constructor(mypos, params) {
        let language = utils.safeVal(params.lang, utils.safeVal(mypos.config.checkout.lang, 'EN'));
        let version = utils.safeVal(params.version, utils.safeVal(mypos.config.checkout.version, '1.4'));
        let sid = utils.safeVal(params.sid, mypos.config.checkout.sid);
        let walletNumber = utils.safeVal(params.sid, mypos.config.checkout.clientNumber);
        let currency = utils.safeVal(params.currency, mypos.config.checkout.currency);
        let orderId = utils.safeVal(params.orderId, uuidv4());
        let outputFormat = utils.safeVal(params.outputFormat, utils.safeVal(mypos.config.checkout.outputFormat, 'JSON'));

        const refundParams = {
            IPCmethod: 'IPCRefund',
            IPCVersion: version,
            IPCLanguage: language,
            SID: sid,
            walletnumber: walletNumber,
            KeyIndex: mypos.config.checkout.keyIndex,
            IPC_Trnref: params.trnRef,
            Amount: params.amount,
            Currency: currency,
            OrderID: orderId,
            OutputFormat: outputFormat
        };

        super(mypos, refundParams);
    }
}

module.exports = CheckoutRefundRequest;