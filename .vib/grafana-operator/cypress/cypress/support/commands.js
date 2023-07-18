/*
 * Copyright VMware, Inc.
 * SPDX-License-Identifier: APACHE-2.0
 */

const COMMAND_DELAY = 2000;

for (const command of ['click']) {
  Cypress.Commands.overwrite(command, (originalFn, ...args) => {
    const origVal = originalFn(...args);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(origVal);
      }, COMMAND_DELAY);
    });
  });
}

Cypress.Commands.add(
  'login',
  (username = Cypress.env('username'), password = Cypress.env('password')) => {
    cy.clearCookies();
    cy.visit('/login');
    cy.get('[aria-label*="Username"]').type(username);
    cy.get('[aria-label*="Password"]').type(password);
    cy.contains('Log in').click();
    cy.contains('Home');
  }
);

Cypress.on('uncaught:exception', (err, runnable) => {
  // we expect an error with message 'Cannot read properties of undefined (reading 'eventTrackingNamespace')'
  // and don't want to fail the test so we return false
  if (err.message.includes('Cannot read properties of undefined')) {
    return false;
  }
  // we still want to ensure there are no other unexpected
  // errors, so we let them fail the test
});
