/// <reference types="cypress" />
Cypress.Commands.add('login', (user: string, pass: string) => {
  cy.visit('/');
  cy.get('#email').type(user, { log: false });
  cy.get('#password').type(pass, { log: false });
  cy.get('.chakra-button').click();
});
