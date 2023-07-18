/*
 * Copyright VMware, Inc.
 * SPDX-License-Identifier: APACHE-2.0
 */

/// <reference types="cypress" />
import { random } from '../support/utils';

it('allows adding a project and a quality gate', () => {
  cy.login();
  cy.visit('/admin/projects_management');

  // Step 1: Create a project
  cy.fixture('projects').then((projects) => {
    cy.contains('Create Project').click();
    cy.get('#create-project-name').type(`${projects.newProject.name} ${random}`);
    cy.get('#create-project-key').type(`${projects.newProject.key}${random}`);
    cy.get('[type="submit"]').contains('Create').click();

    // Step 2: Create a Quality gate
    cy.visit('/quality_gates');
    cy.fixture('quality-gates').then((qualityGates) => {
      cy.contains('Create').click();
      cy.get('#quality-gate-form-name').type(`${qualityGates.newQualityGate.name}${random}`);
      cy.get('[type="submit"]').contains('Save').click();
      cy.contains('Unlock editing').click();
      cy.contains('Add Condition').click({force: true});
      cy.get('#condition-metric').click();
      cy.contains('Lines to Cover').click({force: true});
      cy.get('#condition-threshold').type(qualityGates.newQualityGate.threshold);
      cy.get('[type="submit"]').click();

      // Step 3: Add the project to the quality gate
      cy.contains('Without').click();
      cy.contains(`${projects.newProject.name} ${random}`).click();
      cy.contains('With').click();
      cy.contains(`${projects.newProject.name} ${random}`);
      // Check that the project really has been added
      cy.contains('Without').click();
      cy.contains(`${projects.newProject.name} ${random}`).should('not.exist');
    });
  });
});
