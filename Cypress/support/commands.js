// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })



//



const getIframeDocument = () => {
    return cy
        .get('#PegaGadget0Ifr')
        .its('0.contentDocument')
}



const getIframeBody = () => {
    return getIframeDocument()
        .its('body')
        .then(cy.wrap)
}



Cypress.Commands.add('launchCustomerInGAU', (accountId, siteId) => {



   //SIT 1



   //SIT 2



   //SIT 3
    //cy.visit("url)
    //SIT 4
    cy.visit("url")



   //PP 2
    cy.clearCookies()
    cy.clearLocalStorage()
})



Cypress.Commands.add('launchinMovers', (accountId, siteId, targetSiteId, targetPremiseId) => {



   //SIT 1



   //SIT 2



   //SIT 3
    //cy.visit("url")
    //SIT 4
    cy.visit("url")



   //PP 2
    cy.clearCookies()
    cy.clearLocalStorage()
})



Cypress.Commands.add('login', (profile) => {
    //Pega Login
    if (profile == ('care')) {
        cy.get("#txtUserID").type("S7788966")
        cy.get("#txtPassword").type("login")
        cy.get('#sub').click()
        cy.frameLoaded()
    } else if (profile == ('retout')) {
        cy.get("#txtUserID").type("M7892887")
        cy.get("#txtPassword").type("login")
        cy.get('#sub').click()
        cy.frameLoaded()
    } else if (profile == ('retin')) {
        cy.get("#txtUserID").type("N7887977")
        cy.get("#txtPassword").type("login")
        cy.get('#sub').click()
        cy.frameLoaded()
    } else if (profile == ('moversin')) {
        cy.get("#txtUserID").type("K7883104")
        cy.get("#txtPassword").type("login")
        cy.get('#sub').click()
        cy.frameLoaded()
    } else if (profile == ('moversout')) {
        cy.get("#txtUserID").type("P7861504")
        cy.get("#txtPassword").type("login")
        cy.get('#sub').click()
        cy.frameLoaded()
    } else if (profile == ('telesales')) {
        cy.get("#txtUserID").type("B7893508")
        cy.get("#txtPassword").type("login")
        cy.get('#sub').click()
        cy.frameLoaded()
    } else if (profile == ('tier 1')) {
        cy.get("#txtUserID").type("Y7860500")
        cy.get("#txtPassword").type("login")
        cy.get('#sub').click()
        cy.frameLoaded()
    }
})



Cypress.Commands.add('enterNegotiator', () => {
    let actionsArray = []



   // Check if Discover Negotiator button is present
    getIframeBody().then(($body) => {
        if ($body.text().includes('Go to Discover Negotiator')) {



       }
        //if not present achnowledge all the actions until button gets displayed
        else {
            getIframeBody().find(("a[onclick^='ChangeOfferAndRefreshDetails']"))
                .each((action) => {
                    actionsArray.push(action)
                }).then(() => {
                    //loop to achnowldge all the actions
                    for (let index = 0; index < actionsArray.length; index++) {
                        getIframeBody().find(("a[onclick^='ChangeOfferAndRefreshDetails']")).first().click()
                        getIframeBody().find("button[data-ctl='Button']").click()//acknowldge button
                        cy.wait(5000)
                    }
                })
        }
    })
    getIframeBody().find("button[data-ctl='Button']").click()//GN button
    cy.wait(8000)



})
