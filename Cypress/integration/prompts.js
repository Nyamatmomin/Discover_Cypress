const testdata = require("../../fixtures/POCData.json")
import negotiator from "../../Pages/Negotiator.js"
import intallTab from "../../Pages/Install.js"



describe("POC Prompts", () => {



   it("v6_vtv_prompt", () =>{



       cy.launchCustomerInGAU(testdata.prompt.v6_vtv_prompt.icoms_acc_nbr, testdata.prompt.v6_vtv_prompt.site_id)
        cy.login('care')
        cy.enterNegotiator()



       negotiator.selectRGUs(testdata.prompt.v6_vtv_prompt.rgus)
        negotiator.selectBundle(testdata.prompt.v6_vtv_prompt.select_bundle,testdata.prompt.v6_vtv_prompt.bundleStb)
        negotiator.checkPrompt(testdata.prompt.v6_vtv_prompt.prompttxt)



   })



   it.only("Inbound_TC_23", () =>{



       cy.launchinMovers(testdata.prompt.Inbound_TC_23.icoms_acc_nbr, testdata.prompt.Inbound_TC_23.site_id,testdata.prompt.Inbound_TC_23.target_site_id, testdata.prompt.Inbound_TC_23.target_premise_id)
        cy.login('moversin')
        cy.enterNegotiator()



       negotiator.selectRGUs(testdata.prompt.Inbound_TC_23.rgus)
        negotiator.selectBundle(testdata.prompt.Inbound_TC_23.select_bundle,testdata.prompt.Inbound_TC_23.bundleStb)
        negotiator.rm_inv_pro_and_val()
        intallTab.tocvFlow()



       negotiator.checkPrompt(testdata.prompt.Inbound_TC_23.prompttxt)



   })
})