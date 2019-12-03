describe('Calendar ', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('login page is displayed correctly', () => {
    cy.contains('Log in')
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('Sign up')
  })

  it('user can log in with valid credentials', () => {
    cy.get('[data-cy=username]')
      .type('tester')
    cy.get('[data-cy=password]')
      .type('tester')
    cy.contains('Submit')
      .click()
    cy.contains('Logout')
  })
})