[15:52] Nyamat Allah Momin
const testdata = require("../../fixtures/POCData.json")
import negotiator from "../../Pages/Negotiator.js"

describe("POC AddonsTab", () => {

    it("CR12711_TS_04", () => {        cy.launchCustomerInGAU(testdata.addonsTab.CR12711_TS_04.icoms_acc_nbr, testdata.addonsTab.CR12711_TS_04.site_id)        cy.login('care')        cy.enterNegotiator()

        negotiator.selectAddon(testdata.addonsTab.CR12711_TS_04.addon)        negotiator.checkProductInBasket('Starzplay')        negotiator.validateBasket_Success()    })

    it("TS_19_RETOUT", () => {        cy.log(testdata.addonsTab.TS_19_RETOUT.icoms_acc_nbr)        cy.log(testdata.addonsTab.TS_19_RETOUT.site_id)        cy.launchCustomerInGAU(testdata.addonsTab.TS_19_RETOUT.icoms_acc_nbr, testdata.addonsTab.TS_19_RETOUT.site_id)        cy.login('retout')        cy.enterNegotiator()

        negotiator.selectRGUs(testdata.addonsTab.TS_19_RETOUT.rgus)        negotiator.selectBundle(testdata.addonsTab.TS_19_RETOUT.select_bundle,            testdata.addonsTab.TS_19_RETOUT.bundleStb)        negotiator.selectAddon(testdata.addonsTab.TS_19_RETOUT.addon[0])        negotiator.checkProductInBasket(testdata.addonsTab.TS_19_RETOUT.addon[0])        negotiator.selectAddon(testdata.addonsTab.TS_19_RETOUT.addon[1])        negotiator.checkProductInBasket(testdata.addonsTab.TS_19_RETOUT.addon[1])        negotiator.selectAddon(testdata.addonsTab.TS_19_RETOUT.addon[2])        negotiator.checkProductInBasket(testdata.addonsTab.TS_19_RETOUT.addon[2])        negotiator.validateBasket_Success()    })

    it("recontracting_addon", () => {        cy.launchCustomerInGAU(testdata.addonsTab.recontracting_addon.icoms_acc_nbr, testdata.addonsTab.recontracting_addon.site_id)        cy.login('retin')        cy.enterNegotiator()

        negotiator.selectRGUs(testdata.addonsTab.recontracting_addon.rgus)        negotiator.selectBundle(testdata.addonsTab.recontracting_addon.select_bundle,            testdata.addonsTab.recontracting_addon.bundleStb)        negotiator.selectAddon(testdata.addonsTab.recontracting_addon.addon)        negotiator.validateBasket_Success()    })
})

