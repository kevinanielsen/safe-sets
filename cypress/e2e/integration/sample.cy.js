/// <reference types="cypress" />

import Chance from 'chance';
const chance = new Chance();

describe('Safe Sets', () => {
  const email = chance.email();
  const pass = 'ValidPassword23';

  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  })
  
  it('has a title', () => {
    cy.contains('Safe Sets')
  })


})

