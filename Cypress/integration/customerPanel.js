const testdata = require("../../fixtures/POCData.json")
import negotiator from "../../Pages/Negotiator.js"



describe("POC customerPanel", () => {



   it("TS_11480_12", () => {



       cy.launchCustomerInGAU(testdata.custPanel.TS_11480_12.icoms_acc_nbr, testdata.custPanel.TS_11480_12.site_id)
        cy.login('care')
        cy.enterNegotiator()



       negotiator.selectUsageTab(testdata.custPanel.TS_11480_12.connectedDevice)
    })



   it("tv2_cble_cntr_en_dte", () => {



       cy.launchCustomerInGAU(testdata.custPanel.tv2_cble_cntr_en_dte.icoms_acc_nbr, testdata.custPanel.tv2_cble_cntr_en_dte.site_id)
        cy.login('care')
        cy.enterNegotiator()



       negotiator.selectCustTab(testdata.custPanel.tv2_cble_cntr_en_dte.field, testdata.custPanel.tv2_cble_cntr_en_dte.value)
    })
})