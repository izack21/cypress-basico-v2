/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function(){
    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function(){
        
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    
    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = "Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste "
        cy.get('#firstName').type("Izack")
        cy.get('#lastName').type("Rodrigues")
        cy.get('#email').type("email@rmai.com.br")
        cy.get('#phone').type('99999999')
        cy.get('#open-text-area').type(longText,{delay:0})
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type("Izack")
        cy.get('#lastName').type("Rodrigues")
        cy.get('#email').type("email.com.br")
        cy.get('#phone').type('99999999')
        cy.get('#open-text-area').type('Testes')
        cy.get('.button').click()
        cy.get('.error').should('be.visible')

    })
    //ex.3
    it('validar que o campo telefone aceita apenas números', function(){
        cy.get('[id="phone"]').type('ababbubuasbaus').should('be.empty')
    })

    //ex.4
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
        cy.get('#firstName').type("Izack")
        cy.get('#lastName').type("Rodrigues")
        cy.get('#email').type("email.com.br")
        cy.get('#open-text-area').type('Testes')
        cy.get('#phone-checkbox').check()
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })
    //ex.5
    it('preenche e limpa os campos nome, sobrenome, email e telefone',function(){
        cy.get('#firstName').type("Izack").should('have.value',"Izack").clear().should('be.empty')
        cy.get('#lastName').type("Rodrigues").should('have.value',"Rodrigues").clear().should('be.empty')
        cy.get('#email').type("izack@email.com.br").should('have.value',"izack@email.com.br").clear().should('be.empty')
        cy.get('#phone').type('99999999').should('have.value',"99999999").clear().should('be.empty')
        cy.get('#open-text-area').type('Testes').should('have.value',"Testes").clear().should('be.empty')

    })

    //ex.6
    it.only("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatório",function(){
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })
})
