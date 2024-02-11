// https://on.cypress.io/api

describe('E2E', () => {
  it('Should navigate to / when visiting a private route', () => {
    cy.visit('/settings')
    // cy.contains('h1', 'You did it!')
  })
})
