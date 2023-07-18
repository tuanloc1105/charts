/*
 * Copyright VMware, Inc.
 * SPDX-License-Identifier: APACHE-2.0
 */

/// <reference types="cypress" />

it('visits the apache start page', () => {
  cy.visit('/');
  cy.contains('It works');
});

