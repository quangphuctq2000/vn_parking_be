import { Controller, Get, Post, Redirect, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { OnePayInternational } from 'vn-payments';
import moment from 'moment';

const checkoutSuccessUrl = 'http://localhost:3000/payment/checkoutSuccess';

@Controller('payment')
@ApiTags('Payment')
export class PaymentController {
    @Post('/createCheckoutUrl')
    async getPaymentUrl(@Req() request: Request) {
        const checkoutData = {
            againLink: 'http://localhost:3000',
            amount: 500000,
            clientIp: request.ip,
            currency: 'VND',
            locale: 'vn',
            orderId: moment(new Date()).format('HHmmss').toString(),
            returnUrl: checkoutSuccessUrl,
            title: 'pay',
            transactionId: moment(new Date()).format('HHmmss').toString(),
            vpcAccessCode: '6BEB2546',
            vpcCommand: 'pay',
            vpcMerchant: 'TESTONEPAY',
            vpcVersion: '2',
        };
        const onepayIntl = new OnePayInternational({
            paymentGateway: 'https://mtf.onepay.vn/vpcpay/vpcpay.op',
            merchant: 'TESTONEPAY',
            accessCode: '6BEB2546',
            secureSecret: '6D0870CDE5F24F34F3915FB0045120DB',
        });

        const checkoutUrl = await onepayIntl.buildCheckoutUrl(checkoutData);
        return checkoutUrl.href;
    }

    @Get('/checkoutSuccess')
    @Redirect('http://localhost:8000', 301)
    async checkoutSuccess(@Req() request) {
        console.log(request.query);
        return { url: 'http://localhost:8000' };
    }
}
