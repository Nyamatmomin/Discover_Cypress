[15:56] Nyamat Allah Momin
const testdata = require("../../fixtures/POCData.json")
import negotiator from "../../Pages/Negotiator.js"
import intallTab from "../../Pages/Install.js"
import acceptConfirm from "../../Pages/AcceptConfirm.js"

describe("install Tab POC", () => {

    it("21cv", ()=>{

        cy.launchCustomerInGAU(testdata.installTab.tocv.icoms_acc_nbr, testdata.installTab.tocv.site_id)        cy.login('care')        cy.enterNegotiator()

        negotiator.selectRGUs(testdata.installTab.tocv.rgus)        negotiator.selectBundle(testdata.installTab.tocv.select_bundle,testdata.installTab.tocv.bundleStb)        negotiator.rm_inv_pro_and_val()        intallTab.tocvFlow()        negotiator.validateBasket_Success()        acceptConfirm.checkIcoms('X21CVQS')    })
})

