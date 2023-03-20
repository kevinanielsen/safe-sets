/// <reference types="cypress" />

import Chance from 'chance';
const chance = new Chance();

describe('Safe Sets', () => {
  const username = 'testProfil';
  const pass = '130503';

  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  })

  it('displays a title', () => {
    cy.contains('Safe Sets')
  })

  it('blocks protected routes', () => {
    cy.contains('Homepage').click()

    cy.get('.Toastify').children()
      .should('contain', 'You must be logged in!')
      .and('be.visible')

    cy.contains('Workout History').click()

    cy.get('.Toastify').children()
      .should('contain', 'You must be logged in!')
      .and('be.visible')

    cy.contains('Stats').click()

    cy.get('.Toastify').children()
      .should('contain', 'You must be logged in!')
      .and('be.visible')

    cy.contains('New Workout').click()

    cy.get('.Toastify').children()
      .should('contain', 'You must be logged in!')
      .and('be.visible')
  });
  
  it('logs in a user', () => {

    // Click log in
    cy.contains('log in').click()

    // Assert URL
    cy.url().should('include', 'login');

    // Fill out the form
    cy.get('input[name=username]').type(username);
    cy.get('input[name=password').type(pass);
    cy.get('input[type=submit]').click();

    // Assert that user is greeted 
    cy.get('.Toastify').children()
      .should('contain', 'Welcome back')
      .and('be.visible')
  });

  it('signs up a new user', () => {
    cy.contains('create an account').click();

    cy.get('input[name=username]').type(chance.first());
    cy.get('input[name=password]').type(chance.string({ length: 8 }));
    cy.get('input[name=name]').type(chance.name());
    cy.get('input[name=email]').type(chance.email({ length: 8, domain: 'example.com' }));

    cy.get('input[type=submit').click();

    cy.get('.Toastify').children()
      .should('contain', 'Account created!')
      .and('be.visible')
  })
  


})

