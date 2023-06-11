beforeEach(function(){
    cy.visit('./src/privacy.html')
})

it.only('testa a página de política de privacidade de forma independente', function(){


    cy.url().should('include', '/privacy.html')
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
    cy.contains('Talking About Testing').should('be.visible')
})