describe('Formulario de Registro', () => {
  beforeEach(() => {
    cy.visit('/register');
    cy.wait(1000);
  });

  it('Debe permitir crear un nuevo usuario', () => {

    cy.get('input[name="name"]').type('Juan');
    cy.get('input[name="dni"]').type('12345678');
    cy.get('input[name="email"]').type('juan@example.com');
    cy.get('input[name="phone"]').type('0123456789');
    cy.get('input[name="address"]').type('Av. Siempre Viva 123');


    cy.get('button.btn-gender').contains('M').click(); 

    cy.get('select[name="province"]').select('Santa Fe'); 

    cy.get('select[name="locality"]').select('Rosario');

    cy.get('input[name="birthdate"]').type('1990-01-01');

    cy.get('input[name="password"]').type('contraseña123');
    cy.get('input[name="confirmPassword"]').type('contraseña123');

    cy.get('button[type="submit"]').click({ force: true });

  cy.get('.error-message').should('not.exist');
  
});

  it('Debe mostrar un error si las contraseñas no coinciden', () => {
    cy.get('input[name="name"]').type('Juan');
    cy.get('input[name="dni"]').type('12345678');
    cy.get('input[name="email"]').type('juan@example.com');
    cy.get('input[name="phone"]').type('0123456789');
    cy.get('input[name="address"]').type('Av. Siempre Viva 123');

    cy.get('button.btn-gender').contains('M').click(); 

    cy.get('select[name="province"]').select('Santa Fe'); 

    cy.get('select[name="locality"]').select('Rosario'); 

    cy.get('input[name="birthdate"]').type('1990-01-01');

    cy.get('input[name="password"]').type('contraseña12');
    cy.get('input[name="confirmPassword"]').type('contraseña123');

    cy.get('button[type="submit"]').click({ force: true });

    cy.contains('Las contraseñas no coinciden').should('exist');
  });

  it('Debe mostrar un error si el correo electrónico no es válido', () => {
    cy.get('input[name="name"]').type('Juan');
    cy.get('input[name="dni"]').type('12345678');

    cy.get('input[name="email"]').focus().blur();
    cy.get('input[name="email"]').type('sadd');
    
    cy.get('input[name="phone"]').type('0123456789');
    cy.get('input[name="address"]').type('Av. Siempre Viva 123');


    cy.get('button.btn-gender').contains('M').click(); 

    cy.get('select[name="province"]').select('Santa Fe');

    cy.get('select[name="locality"]').select('Rosario'); 

    cy.get('input[name="birthdate"]').type('1990-01-01');

    cy.get('input[name="password"]').type('contraseña123');
    cy.get('input[name="confirmPassword"]').type('contraseña123');

    cy.get('button[type="submit"]').click({ force: true });

    cy.contains('Correo electrónico inválido.').should('be.visible');
  });
});
