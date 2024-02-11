import NavbarMain from '../navbar/NavbarMain.vue'

describe('<NavbarMain />', () => {
  it('should mount Navbar', () => {
    cy.mount(NavbarMain)
    cy.get('[alt="logo-timekeeper"]').should('be.visible')
  })
  it('should open menu when hamburger menu is clicked and have dark background', () => {
    cy.mount(NavbarMain)
    cy.get('[data-cy="menu-button"]').click()
    cy.get('[data-cy="menu-container"]').should('be.visible')
  })
})
