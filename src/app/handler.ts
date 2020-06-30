
import { Handler, Context } from 'aws-lambda';
import { CasesController } from '../controller/cases';

export const wait: Handler = (event: any, context: Context) => {
    return new CasesController().waitForResponse(event, context);
};