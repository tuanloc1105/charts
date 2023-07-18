/*
 * Copyright VMware, Inc.
 * SPDX-License-Identifier: APACHE-2.0
 */

/// <reference types="cypress" />

it('renders landing page correctly', () => {
  cy.visit('/');
  cy.contains('instance is running');
});
