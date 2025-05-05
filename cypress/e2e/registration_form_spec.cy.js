// registration-form.spec.js
describe('Registration Form Tests', () => {
  beforeEach(() => {
    // Visit the page before each test
    cy.visit('index.html');
  });

  // Test 1: Check if form elements are displayed when the page loads 
  it('should display all form elements correctly', () => {
    cy.get('h2.form-title').should('contain', 'Create New Account');
    cy.get('#firstName').should('be.visible');
    cy.get('#lastName').should('be.visible');
    cy.get('#email').should('be.visible');
    cy.get('#dob').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.get('#confirmPassword').should('be.visible');
    cy.get('#terms').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  // Test 2: Enter a valid email address 
  it('should validate a valid email address', () => {
    cy.get('#email')
      .type('test@example.com')
      .blur();
    
    // Email field should be valid (should not have invalid class)
    cy.get('#email').invoke('prop', 'validity').its('valid').should('be.true');
  });

  // Test 3: Submit empty form 
  it('can submit an empty form', () => {
    // Submit the form
    cy.get('button[type="submit"]').click();
    
    // Form should have 'was-validated' class (validation triggered)
    cy.get('#registrationForm').should('have.class', 'was-validated');
    
    // Test results should be visible
    cy.get('#testResults').should('be.visible');
    
    // There should be at least one failing test result
    cy.get('.test-result.invalid').should('exist');
  });
});
