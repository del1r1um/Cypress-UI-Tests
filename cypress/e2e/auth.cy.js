describe('Authorization Form Tests', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('AUTH_HOST')}`)
  })

  it('Valid login and password', () => {
    cy.login('german@dolnikov.ru', 'iLoveqastudio1')
    cy.get('#messageHeader').should('have.text', 'Авторизация прошла успешно')
    cy.get('.exitIcon').should('be.visible')
  }),
    it('Restore password', () => {
      cy.get('#forgotEmailButton').click()
      cy.get('#mailForgot').type('test@test.ru')
      cy.get('#restoreEmailButton').click()
      cy.get('#messageHeader').should('have.text', 'Успешно отправили пароль на e-mail')
      cy.get('.exitIcon').should('be.visible')
    }),
    it('Valid login and invalid password', () => {
      cy.login('german@dolnikov.ru', 'invalid_password')
      cy.get('#messageHeader').should('have.text', 'Такого логина или пароля нет')
      cy.get('.exitIcon').should('be.visible')
    }),
    it('Invalid login and valid password', () => {
      cy.login('invalid@login.ru', 'iLoveqastudio1')
      cy.get('#messageHeader').should('have.text', 'Такого логина или пароля нет')
      cy.get('.exitIcon').should('be.visible')
    }),
    it('Invalid login (w/o @) and valid password', () => {
      cy.login('invalidlogin.ru', 'iLoveqastudio1')
      cy.get('#messageHeader').should('have.text', 'Нужно исправить проблему валидации')
      cy.get('.exitIcon').should('be.visible')
    }),
    it('Valid login (with uppercase) and valid password', () => {
      cy.login('GerMan@Dolnikov.ru', 'iLoveqastudio1')
      cy.get('#messageHeader').should('have.text', 'Авторизация прошла успешно')
      cy.get('.exitIcon').should('be.visible')
    })
})
