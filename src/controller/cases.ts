import { Context } from 'aws-lambda';
import MessageUtil from '../utils/message'
import lrs from '../cases/longrunningreq';
import objectchecker from '../utils/objectchecker';

export class CasesController {

    readonly DEFAULT_WAIT_TIME:number = 2000;

    /**
     * Wait for a request to be done
     * @param event
     */
    async waitForResponse(event: any, context: Context) {
        // The amount of memory allocated for the function
        console.log('memoryLimitInMB: ', context.memoryLimitInMB);

        const wait: number = Number(objectchecker.isNilOrUndefined(event.queryStringParameters) || objectchecker.isNilOrUndefined(event.queryStringParameters.wait) ? 
        this.DEFAULT_WAIT_TIME :  event.queryStringParameters.wait);

        try {

            const resp: object = lrs(wait);
            return MessageUtil.success({ msg: `i waited for you for ${wait}` });
        } catch (err) {
            console.error(err);

            return MessageUtil.error(err.code, err.message);
        }
    }
}