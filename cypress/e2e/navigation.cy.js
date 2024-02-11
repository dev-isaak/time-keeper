// https://on.cypress.io/api

describe('Navigation', () => {
  it('T1: Should navigate to login page when visiting a private route', () => {
    cy.visit('/settings')
    cy.contains('Login')
  })
  it('T2: Should navigate to home when click on the navbar logo', () => {
    cy.visit('/settings')
    cy.get('[alt="logo-timekeeper"]').click()
    cy.contains(/stop wasting your time counting hours/i)
  })
  it('T3: Should navigate to register page when click on start now', () => {
    cy.visit('/')
    cy.get('[data-cy="start-now-button"]').click()
    cy.contains(/register/i)
  })
  // test@test.com - testuser
  it('T3: Should navigate to user dashboard when login', () => {
    cy.visit('/login')
    cy.get('[data-cy="email-field"]').type('isaak_1992@hotmail.es')
    cy.get('[data-cy="password-field"]').type('123456')
    cy.get('[data-cy="login-button"]').click()
    cy.then(() => {
      cy.contains(/start/i)
    })
  })
})
