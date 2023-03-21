/// <reference types="cypress" />

import Chance from "chance";
const chance = new Chance();

describe("Safe Sets", () => {
  const username = "testProfil";
  const pass = "130503";

  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  describe("User features of Safe Sets", () => {
    it("hides new user text", () => {
      cy.contains("It seems like you're not logged in!");

      cy.login(username, pass);
      cy.get("#guest").should("be.empty");
    });

    it("loads your first name", () => {
      cy.login(username, pass);
      cy.contains("Homepage").click();
      cy.get("h1").contains("Test");
    });

    it("can create a new workout", () => {
      cy.login(username, pass);
      cy.get(':nth-child(4) > a').click();
      cy.pause();
      cy.get(".text-main").click();

      cy.get('body')
        .should("contain", "End workout")
        .and('not.contain', 'div.w-full.mb-2');
    });

    it("can add an exercise", () => {
      cy.pause();
      cy.login(username, pass);
      cy.get(':nth-child(4) > a').click();

      cy.contains("Add exercise").click();
      cy.contains("Deadlift (Barbell)").click({force: true});
      cy.should("contain", "Deadlift (Barbell)")
    });

    it("can load an active workout", () => {
      cy.pause()
      cy.login(username, pass);
      cy.get(':nth-child(4) > a').click();

      cy.get('body')
        .should("contain", "End workout")
        .and("contain", "Deadlift (Barbell)");
    });

    it("can end the active workout", () => {
      cy.login(username, pass);
      cy.get(':nth-child(4) > a').click();

      cy.get('input.text-xl').type('Cypress Test');

      cy.get('body')
        .contains("End workout")
        .click();
      
      cy.get('body').should("contain", "Successfully saved workout");
    })
  });
});
