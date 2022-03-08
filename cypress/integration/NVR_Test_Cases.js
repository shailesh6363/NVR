/// <reference types="Cypress" />
 import Login from '../pageObject/loginPage'
 import Dashboard from '../pageObject/dashBoard'


describe("NVR Test Case Automation",()=>{
    const loguser=new Login()
    const dash=new Dashboard()
    it(" Validate User Login ",()=>{

        cy.visit(Cypress.env('url'))
        cy.url().should('include',"auth/login")
        loguser.setUserName().type('admin@aivid.com').should('have.value','admin@aivid.com')
        loguser.setPassword().type('Admin@123').should('have.value','Admin@123')
        loguser.selectSignInButton().click()
        cy.url().should('include',"/dashboard/home")
    })

    it("Validate Hirarchy of NVR and it's Active Chaneel",()=>{

       cy.xpath("//a[@href='#/resource/site']").invoke('attr','href').then(href=>{
           cy.visit(href);
       })
    //     //cy.request(Cypress.env('resourceURL'))
    //    // cy.openTab("https://192.168.222.210:32500/#/resource/site")

    // dash.selectMenu().click()
    // cy.wait(5000)
    // cy.contains('Resources').click()
    // //   //  cy.contains('href').should('have.a.property',"#/resource/site").click()
    // //   //cy.contains('href',"#/resource/site").click()
    // //    dash.selectResource().click()
    // //    })
    // //     //cy.url().should('include',"resource/site")
     })

})