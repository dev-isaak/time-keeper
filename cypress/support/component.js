// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import Vuetify
import { Vuetify } from '../../src/main'
import { mount } from 'cypress/vue'
// Import global styles
import '@/assets/main.css'
import '@/assets/variables.css'
// Import commands.js using ES2015 syntax:
import './commands'

Cypress.Commands.add('mount', (component, ...args) => {
  args.global = args.global || {}
  args.global.plugins = args.global.plugins || []
  args.global.plugins.push({
    install(app) {
      app.use(Vuetify) //import vuetify from you vuetify config
    }
  })

  return mount(component, args)
})

// Example use:
// cy.mount(MyComponent)
