describe('WebCalendar app', function() {
  before(function() {
    cy.request(
      'POST', 
      'http://localhost:3001/api/testing/reset/2dk3iq15mf88mf82hk7n8rp43s@group.calendar.google.com'
    )
  })

  it('login page is displayed correctly', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Log in')
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('Sign up')
  })

  it('user can log in with valid credentials', function() {
    cy.get('[data-cy=username]')
      .type('tester')
    cy.get('[data-cy=password]')
      .type('tester')
    cy.contains('Submit')
      .click()
    cy.contains('Logout')
  })

  it('user can open event creation form', function() {
    cy.get('[data-time="10:30:00"] > :nth-child(2)')
      .click()
    cy.wait(1000)
    cy.contains('Create event')
  })

  it('user can create event', function() {
    cy.get('[data-cy=title]')
      .type('test')
    cy.get(`:nth-child(3) 
      > .react-datetime-picker 
      > .react-datetime-picker__wrapper 
      > .react-datetime-picker__inputGroup 
      > .react-datetime-picker__inputGroup__hour`)
        .type(11)
    cy.contains('Save')
      .click()
    cy.wait(1000)
    cy.contains('test')
  })

  it('user can modify event', function() {
    cy.get('.fc-time-grid-event')
      .click()
    cy.contains('Edit event')
    cy.get('[data-cy=title]')
      .type('(edit)')
    cy.contains('Save')
      .click()
    cy.wait(1000)
    cy.contains('test(edit)')
  })

  it('user can delete event', function() {
    cy.get('.fc-time-grid-event')
      .click()
    cy.contains('Edit event')
    cy.contains('Delete')
      .click()
    cy.wait(1000)
    cy.contains('test(edit)')
      .should('not.exist')
  })
})