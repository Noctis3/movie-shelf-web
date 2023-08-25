/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(user, pass): Chainable<any>;
  }
}
