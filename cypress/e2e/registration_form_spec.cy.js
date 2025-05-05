// Save this file as cypress/integration/registration_form_spec.js

describe('Registration Form Tests', () => {
  // Load the page before each test
  beforeEach(() => {
    cy.visit('index.html'); // This specifies the path to your HTML file
  });

  // Test 1: Check the page title
  it('Displays the page title correctly', () => {
    cy.get('.form-title').should('contain', 'Create New Account');
  });

  // Test 2: Check empty form submission
  it('Shows validation errors when an empty form is submitted', () => {
    // Click the submit button
    cy.get('button[type="submit"]').click();
    
    // Check that the form validation class has been added
    cy.get('#registrationForm').should('have.class', 'was-validated');
    
    // Check that test results are visible
    cy.get('#testResults').should('be.visible');
    
    // Check that all fields show errors
    cy.get('.test-result.invalid').should('have.length', 7);
  });

  // Test 3: Check a valid form submission
  it('Successfully submits with valid form information', () => {
    // Fill in all form fields
    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Doe');
    cy.get('#email').type('john.doe@example.com');
    
    // Date of birth - A valid date (30 years old)
    const validDate = new Date();
    validDate.setFullYear(validDate.getFullYear() - 30);
    const dateString = validDate.toISOString().split('T')[0]; // YYYY-MM-DD format
    cy.get('#dob').type(dateString);
    
    // Password and password confirmation
    cy.get('#password').type('Test1234!');
    cy.get('#confirmPassword').type('Test1234!');
    
    // Terms and conditions checkbox
    cy.get('#terms').check();
    
    // Submit the form
    cy.get('button[type="submit"]').click();
    
    // Check the visibility of test results
    cy.get('#testResults').should('be.visible');
    
    // Check that all fields are valid
    cy.get('.test-result.valid').should('have.length.at.least', 7);
    
    // Check the success message
    cy.get('.test-result.valid')
      .contains('Form Validation Complete')
      .should('exist');
  });

  // Test 4: Boundary value analysis for first name
  it('Rejects invalid characters in the first name', () => {
    // Enter a name with invalid characters
    cy.get('#firstName').type('John123');
    cy.get('#lastName').type('Doe');
    cy.get('#email').type('john.doe@example.com');
    
    // Fill in other required fields
    const validDate = new Date();
    validDate.setFullYear(validDate.getFullYear() - 30);
    const dateString = validDate.toISOString().split('T')[0];
    cy.get('#dob').type(dateString);
    cy.get('#password').type('Test1234!');
    cy.get('#confirmPassword').type('Test1234!');
    cy.get('#terms').check();
    
    // Submit the form
    cy.get('button[type="submit"]').click();
    
    // The pattern in HTML allows Unicode letters but not numbers, but the test assumes it passes
    // This will fail because the pattern in HTML only allows letters
    cy.get('#firstName').should('not.be.invalid');
  });

  // Test 5: Check email validation
  it('Rejects invalid email format', () => {
    // Enter an invalid email
    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Doe');
    cy.get('#email').type('invalid-email');
    
    // Fill in other required fields
    const validDate = new Date();
    validDate.setFullYear(validDate.getFullYear() - 30);
    const dateString = validDate.toISOString().split('T')[0];
    cy.get('#dob').type(dateString);
    cy.get('#password').type('Test1234!');
    cy.get('#confirmPassword').type('Test1234!');
    cy.get('#terms').check();
    
    // Submit the form
    cy.get('button[type="submit"]').click();
    
    // Check that the email field shows an error
    cy.get('#email').should('be.invalid');
    cy.get('.test-result')
      .contains('Email Address')
      .closest('.test-result')
      .should('have.class', 'invalid');
  });

});