/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function(){
    
    
    beforeEach(function(){
        cy.visit('./src/index.html')


    })



    it('verifica o título da aplicação', function(){
        
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    /*Cypress._.times(5, () =>{
    it.only('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = "Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste "
        cy.get('#firstName').type("Izack")
        cy.get('#lastName').type("Rodrigues")
        cy.get('#email').type("email@rmai.com.br")
        cy.get('#phone').type('99999999')
        cy.get('#open-text-area').type(longText,{delay:0})
        //cy.get('button[type="submit"]').click()
        cy.clock()
        cy.contains('button','Enviar').click()
        cy.get('.success').should('be.visible')
        cy.tick(3000)
        cy.get('.success').should('not.be.visible')
        //rodar o mesmo teste 5 vezes
    })
})*/ 
it('preenche os campos obrigatórios e envia o formulário', function(){
    const longText = Cypress._.repeat('Teste',100)
    cy.get('#firstName').type("Izack")
    cy.get('#lastName').type("Rodrigues")
    cy.get('#email').type("email@rmai.com.br")
    cy.get('#phone').type('99999999')
    cy.get('#open-text-area').type(longText,{delay:0}).should('have.value', longText)
    //cy.get('button[type="submit"]').click()
    cy.clock()
    cy.contains('button','Enviar').click()
    cy.get('.success').should('be.visible')
    //cy.tick(3000)
    cy.get('.success').should('not.be.visible')
})


    //ex.2
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type("Izack")
        cy.get('#lastName').type("Rodrigues")
        cy.get('#email').type("email.com.br")
        cy.get('#phone').type('99999999')
        cy.get('#open-text-area').type('Testes')
        //cy.get('.button').click()
        cy.clock()
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(3000)
        cy.get('.error').should('not.be.visible')

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
        //cy.get('.button').click()
        cy.contains('button','Enviar').click()
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
    it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatório",function(){
        //cy.get('.button').click()
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    })

    //ex.7
    it("envia o formuário com sucesso usando um comando customizado", function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    //au 3 ex 1
    it("seleciona um produto (YouTube) por seu texto",function(){
        cy.get('#product').select('YouTube').should('have.value','youtube')
    })
    //au 3 ex ex 1
    it("seleciona um produto (Mentoria) por seu valor (value)", function(){
        cy.get('select').select('mentoria').should('have.value', 'mentoria')
    })

    //au 3 ex ex 2
    it("seleciona um produto (Blog) por seu índice",function(){
        cy.get('select').select(1).should('have.value','blog')
    })

    //au 4 ex 1
    it("marca o tipo de atendimento 'Feedback'",function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    //au 4 ex ex1
    it('Marca cada tipo de atendimento',function(){
        cy.get('input[type="radio"]')
        .should('have.length',3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
        //usando o each, cada elemento do type radio foi percorrido. usando o wrap, os elementos percorridos fazem interações.
    })

    //au 5 ex1
    it('marca ambos checkboxes, depois desmarca o último',function(){
        cy.get('input[type="checkbox"]')
        //.as('checkboxes')
        .check().should('be.checked')
        .last().uncheck().should('not.be.checked')
        
    })

    //au 6 ex1
   /* it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .then(input =>{
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })*/

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    //au 6 ex1 ex1
    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
        .selectFile('cypress/fixtures/example.json', {action:'drag-drop'})
        .then(input =>{
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    //au 6 ex1 ex2
    /*it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json',{ encoding: null}).as('exampleFile')
        cy.get('input[type="file"]')
        .selectFile({
            contents: '@exampleFile',
            fileName: 'example.json'
        })
        .then(input =>{
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })*/

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('exampleFile')
        
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('@exampleFile')
        .then(input =>{
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    //au 7 ex1
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function(){
         cy.get('#privacy a') //acessa o elemento com id privacy que tenham uma tag a
         .should('have.attr', 'target', '_blank')
    })

    //au 7 ex1 ex1
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
        .invoke('removeAttr', 'target', '_blank')
        .click()
        cy.url().should('include', '/privacy.html')
    })

    //au 7 ex1 ex2
    it('testa a página de política de privacidade de forma independente', function(){
        cy.get('a')
        .invoke('removeAttr', 'target', '_blank')
        .click()
        cy.url().should('include', '/privacy.html')
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
        cy.contains('Talking About Testing').should('be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', function(){
         cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain','Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible')
        cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
    })

    it('preenche a area de texto usando o comando invoke',()=>{
        const longText = Cypress._.repeat('Teste',200)
        cy.get('#open-text-area')
        .invoke('val', longText)
        .should('have.value', longText)
    })

    it.only('faz uma requisição HTTP', ()=>{
        cy.request({
            method:'GET',
            url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
        })
        .then((response)=>{
            expect(response.status).to.equal(200)
            expect(response.statusText).to.equal('OK')
            expect(response.body).contains('CAC TAT')

        })
    })
})

