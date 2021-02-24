import { expect } from 'chai';
import 'chai-http';
import { createClient } from '../sourceBooksApis/clientApi';
import * as chai from 'chai';
chai.use(require('chai-Http'));
export let clientName;

describe('Client create test suite', async () => {
    it('should test that possible to create new client @debug', async () => {
        const timeStamp = Date.now();
        clientName = `Name of organization ${timeStamp}`;
        const responseFromClientCreate = await createClient(clientName);
        //console.log(responseFromClientCreate);
        expect(responseFromClientCreate).to.have.status(200);
        expect(responseFromClientCreate.data).to.haveOwnProperty('clientId').to.be.not.null;
    });

    it('Should test that it is not possible to create new client', async () => {
        const notValidClientName = '';
        const responseFromClientCreate = await createClient(notValidClientName);
        expect(responseFromClientCreate).to.have.status(400);
        expect(responseFromClientCreate.data)
          .to.haveOwnProperty('message')
          .equals('Invalid body, check \'errors\' property for more info.');
      });
});