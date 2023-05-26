/// <reference types="cypress" />
import axios from 'axios';

context('Location', () => {
  it('Dummy Query Should Pass', () => {
    cy.intercept(
      {
        method: 'GET', // The HTTP method of the call you're stubbing.
        url: '/dummy-url', // The URL of the call you're stubbing.
      },
      {
        // The stubbed response data.
        body: {
          success: true,
        },
        headers: {
          'access-control-allow-origin': '*',
        },
        statusCode: 200,
      }
    ).as('dummyQuery');

    cy.wrap('Axios Call').then(() => {
      axios.get('/dummy-url').then((response) => {
        expect(response.data.success).to.be.true;
      });
    });
  });
});
