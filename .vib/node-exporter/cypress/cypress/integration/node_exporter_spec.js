/*
 * Copyright VMware, Inc.
 * SPDX-License-Identifier: APACHE-2.0
 */

/// <reference types="cypress" />

it('can check cluster health', () => {
  cy.request({
    method: 'GET',
    url: '/metrics',
    form: true,
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.contain('node_network_info gauge');
  });
});
