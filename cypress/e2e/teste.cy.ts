describe('Login', () => {
  it('Successful login', () => {
    cy.login(Cypress.env('user'), Cypress.env('pass'));
  });
  it('Invalid login', () => {
    cy.login('invalidUser', 'invalidPass');
    cy.get('#toast-1-title').should('contain', 'Erro');
  });
});

describe('Favorites', () => {
  it('Add to Favorite', () => {
    cy.login(Cypress.env('user'), Cypress.env('pass'));
    cy.get(
      ':nth-child(1) > .swiper > .swiper-wrapper > .swiper-slide-active > .css-o7mtg8'
    ).click();

    cy.wait(2000);
    cy.get('.css-cww79z > .chakra-button')
      .should('contain', 'Adicionar')
      .click();
    cy.get('.css-cww79z > .chakra-button').should('contain', 'Remover').click();
  });
  it('Remove from Favorite', () => {
    cy.login(Cypress.env('user'), Cypress.env('pass'));
    cy.get(
      ':nth-child(2) > .swiper > .swiper-wrapper > .swiper-slide-active > .css-o7mtg8'
    )
      .should('be.visible')
      .click();
    cy.wait(2000);
    cy.get('.css-cww79z > .chakra-button').should('contain', 'Remover').click();
    cy.get('.css-cww79z > .chakra-button')
      .should('contain', 'Adicionar')
      .click();
  });
});
describe('Search', () => {
  it('Search for a movie', () => {
    cy.login(Cypress.env('user'), Cypress.env('pass'));
    cy.wait(2000);
    cy.get('.chakra-input').type('Vingadores');
    cy.get('.chakra-input__right-element').click();
    cy.get('.chakra-wrap__list').should('contain', 'Vingadores');
  });
});
