describe('Pokemon Battle Tests', () => {
  it('Buy avatar for trainer (E2E)', () => {
    cy.visit(`${Cypress.env('POKEMON_HOST')}/login`)
    cy.get('input[type=email]').type(`${Cypress.env('POKEMON_LOGIN')}`)
    cy.get('input[type=password]').type(`${Cypress.env('POKEMON_PASSWORD')}`)
    cy.get('button[type=submit]').click()
    cy.url().should('eq', 'https://pokemonbattle.me/')
    cy.get('.header__btn[href="/shop"]').click()
    cy.url().should('eq', 'https://pokemonbattle.me/shop')
    cy.get('.pokemon__title').should('have.text', 'Магазин')
    cy.contains('button', 'Купить').click({ force: true })
    cy.url().should('eq', 'https://pokemonbattle.me/payment/1')
    cy.get('.pay__main-header').should('have.text', 'Пикачунькофф')
    cy.get('.credit').type('2200705977433240')
    cy.get('.k_input_date').type('1225')
    cy.get('.k_input_ccv').type('125')
    cy.get('.k_input_name').type('Aleksandr Samsonov')
    cy.contains('button', 'Оплатить').click({ force: true })
    cy.get('.payment__fielheader').should('have.text', 'Подтверждение покупки')
    cy.get('#cardnumber').type('56456')
    cy.contains('button', 'Отправить').click({ force: true })
    cy.url().should('eq', 'https://pokemonbattle.me/success')
    cy.get('.payment__fielheader-for-success').should('have.text', 'Покупка прошла успешно')
  })
})
