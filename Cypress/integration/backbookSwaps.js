const testdata = require("../../fixtures/POCData.json")
import negotiator from "../../Pages/Negotiator.js"



describe("Backbook Swaps POC", () =>{



   it("TC_CR521_01_CR521",  () =>{
        cy.launchCustomerInGAU(testdata.backbookSwaps.TC_CR521_01_CR521.icoms_acc_nbr, testdata.backbookSwaps.TC_CR521_01_CR521.site_id)
        cy.login('care')
        cy.enterNegotiator()



       negotiator.selectCurrentBundle(testdata.backbookSwaps.TC_CR521_01_CR521.rgus,testdata.backbookSwaps.TC_CR521_01_CR521.bundleStb)
    })



   it("TC_CR9568_30",  () =>{
        cy.launchCustomerInGAU(testdata.backbookSwaps.TC_CR9568_30.icoms_acc_nbr, testdata.backbookSwaps.TC_CR9568_30.site_id)
        cy.login('care')
        cy.enterNegotiator()



       negotiator.selectCurrentBundle(testdata.backbookSwaps.TC_CR9568_30.rgus,testdata.backbookSwaps.TC_CR9568_30.bundleStb)
        negotiator.validateBasket_Success()
    })
})