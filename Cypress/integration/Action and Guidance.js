const testdata = require("../../fixtures/POCData.json")
import negotiator from "../../Pages/Negotiator.js"



describe('AGC POC', () =>{



   //Health and safety action
    it('CR12738_TS_122', () =>{
        cy.launchCustomerInGAU(testdata.AGC.CR12738_TS_122.icoms_acc_nbr, testdata.AGC.CR12738_TS_122.site_id)
        cy.login('care')



       negotiator.assertAgc(testdata.AGC.CR12738_TS_122.agc, testdata.AGC.CR12738_TS_122.agcText)



   })



   //sky sports  interest guidance
    it('TS_12618_58', () =>{
        cy.launchinMovers(testdata.AGC.TS_12618_58.icoms_acc_nbr, testdata.AGC.TS_12618_58.site_id, testdata.AGC.TS_12618_58.target_site_id, testdata.AGC.TS_12618_58.target_premise_id)
        cy.login('moversin')



       negotiator.assertAgc(testdata.AGC.TS_12618_58.agc, testdata.AGC.TS_12618_58.agcText)



   })
})