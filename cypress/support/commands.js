Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () =>{
    cy.get('#firstName').type("Izack")
    cy.get('#lastName').type("Rodrigues")
    cy.get('#email').type("izack@email.com.br")
    cy.get('#phone').type('99999999')
    cy.get('#open-text-area').type('Testes')
    //cy.get('button[type="submit"]').click()
    cy.contains('button','Enviar').click()
})

/*Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (nome) =>{
    cy.get('#firstName').type(nome)
    cy.get('#lastName').type("Rodrigues")
    cy.get('#email').type("izack@email.com.br")
    cy.get('#phone').type('99999999')
    cy.get('#open-text-area').type('Testes')
    cy.get('button[type="submit"]').click()
})*/