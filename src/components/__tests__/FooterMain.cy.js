import FooterMain from '../footer/FooterMain.vue'

describe('<Footermain />', () => {
  it('should mount de component', () => {
    cy.mount(FooterMain)
    cy.get('[data-cy="footer"]').contains('Company')
  })
})
