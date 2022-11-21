const questData = require("../fixtures/installQue.json")
import AcceptConfirm from "../Pages/AcceptConfirm.js"
class Negotiator {    constructor() {

        this.agcTitle = "div[node_name='OfferAssessmentSection'] > div > div > div > div > div > div > table > tbody > tr > td > div > div > div[section_index='1'] > div > div:nth-child(1) > div > div > span"        this.agcBody = "div[node_name='OfferAssessmentSection'] > div > div > div > div > div > div > table > tbody > tr > td > div > div > div[section_index='2']  > div > div > div > div > span"

        this.bbType = "select[name$='BroadbandType']";        this.tvType = "select[name$='TVType']";        this.telType = "select[name$='PhoneType']";        this.contract = "select[name$='ContractType']";        this.simType = "select[name$='SIMAddon']";        this.searchOffers = "button[name^=SearchOffers]";

        this.allBundles = "div[id $= BundleComparisonListALL]> div > div.lvTableContainer > table > tbody > tr[rowindex]";        this.allPrompts = "div[class$='prompt_message'] > div > table > tbody > tr > td:nth-child(2) > span";

        this.basket = "div[datasource='DEMHandler.Basket.SelectedPropositionList_BundleDetailList_3']";        this.popup = "er local-action'] > div > div:nth-child(1) > table:nth-child(2)"    }

    getIframeDocument() {        return cy            .get('#PegaGadget0Ifr')            .its('0.contentDocument')    }

    getIframeBody() {        return this.getIframeDocument()            .its('body')            .then(cy.wrap)    }

    selectRGUs(rgus) {        this.getIframeBody().find(this.bbType).select(rgus[0])        this.getIframeBody().find(this.tvType).select(rgus[1])        cy.wait(3000)        this.getIframeBody().find(this.telType).select(rgus[2])        this.getIframeBody().find(this.contract).select(rgus[3])        this.getIframeBody().find(this.simType).select(rgus[4])        this.getIframeBody().find(this.searchOffers).click()    }

    selectBundle(bundleName, stbType) {

        let bundles = []        if (bundleName.includes('Bigger bundle')) {            this.getIframeBody().find(this.allBundles).filter(":not('+')").each((bundle) => {                bundles.push(bundle)            }).then(() => {                for (let index = 0; index < bundles.length; index++) {                    if (bundles[index].text().includes(stbType)) {                        bundles[index].find("td:nth-child(2) > input[type=radio]").click()                        cy.wait(1000).then(() => {                            bundles[index].find("td:nth-child(2) > input[pn$=pySingleSelection]").click()                        })

                    }                }            })

        }        else if (bundleName.endsWith('Oomph')) {            this.getIframeBody().find(this.allBundles).each((bundle) => {                bundles.push(bundle)            }).then(() => {                for (let index = 0; index < bundles.length; index++) {                    if (bundles[index].text().includes(stbType)) {                        bundles[index].find("td:nth-child(2) > input[type=radio]").click()                        cy.wait(1000).then(() => {                            bundles[index].find("td:nth-child(2) > input[pn$=pySingleSelection]").click()                        })

                    } else {                        bundles[0].find("td:nth-child(2) > input[type=radio]").click()                        cy.wait(1000).then(() => {                            bundles[0].find("td:nth-child(2) > input[pn$=pySingleSelection]").click()                        })                    }                }            })        } else {            this.getIframeBody().find(this.allBundles).filter(':contains(' + bundleName + ')').each((bundle) => {                bundles.push(bundle)            }).then(() => {                for (let index = 0; index < bundles.length; index++) {

                    if (bundles[index].text().includes(stbType)) {                        bundles[index].find("td:nth-child(2) > input[type=radio]").click()                        cy.wait(1000).then(() => {                            bundles[index].find("td:nth-child(2) > input[pn$=pySingleSelection]").click()                        })

                    } else {                        bundles[0].find("td:nth-child(2) > input[type=radio]").click()                        cy.wait(1000).then(() => {                            bundles[0].find("td:nth-child(2) > input[pn$=pySingleSelection]").click()                        })                    }                }            })        }        cy.wait(3000)    }

    checkPrompt(prompttxt) {

        this.getIframeBody().find(this.allPrompts).each((prompt) => {            if (prompt.text().includes(prompttxt)) {                expect(prompt.text()).to.equal(prompttxt)            }        })    }

    assertAgc(agc, agcText) {

        if (agc.includes('VMACN')) {            let agcArray = []            cy.wait(2000)            this.getIframeBody().find(("a[onclick^='ChangeOfferAndRefreshDetails']")).first().click()            this.getIframeBody().find(("a[onclick^='ChangeOfferAndRefreshDetails']"))                .each((action) => {                    agcArray.push(action)                }).then(() => {                    this.checkAction(agcArray, agcText)                })            cy.wait(5000)            this.getIframeBody().find("button[data-ctl='Button']").should('not.contain.text', 'Go to Discover Negotiator')        } else {            let agcArray = []            this.getIframeBody().find(("a[onclick^='ChangeOfferAndRefreshDetails']"))                .each((action) => {                    agcArray.push(action)                }).then(() => {                    this.checkGuidance(agcArray, agcText)                })        }    }

    checkAction(actionsArray, agcText) {        this.getIframeBody().should('not.contain.text', 'Go to Discover Negotiator')        for (let index = 0; index < actionsArray.length; index++) {            this.getIframeBody().find(("a[onclick^='ChangeOfferAndRefreshDetails']")).first().click()            this.getIframeBody().find(this.agcTitle).then((title) => {                if (title.text().includes(agcText[0])) {                    let titletxt = title.text()                    expect(titletxt).to.equal(agcText[0])                    this.getIframeBody().find(this.agcBody).then((steps) => {                        if (steps.text().includes(agcText[1])) {                            let stepsTxt = steps.text()                            expect(stepsTxt).to.equal(agcText[1])                            this.getIframeBody().find("button[data-ctl='Button']").should('contain.text', agcText[2])                        } else {                            cy.wait(5000)                            this.getIframeBody().find("button[data-ctl='Button']").click()                            cy.wait(5000)                        }                    })                } else {                    cy.wait(5000)                    this.getIframeBody().find("button[data-ctl='Button']").click()                    cy.wait(5000)                }            })        }    }

    checkGuidance(agcArray, agcText) {        this.getIframeBody().should('contain.text', 'Go to Discover Negotiator')

        for (let index = 0; index < agcArray.length; index++) {            this.getIframeBody().find(("a[onclick^='ChangeOfferAndRefreshDetails']")).first().click()            this.getIframeBody().find(this.agcTitle).then((title) => {                if (title.text().includes(agcText[0])) {                    let titletxt = title.text()                    expect(titletxt).to.equal(agcText[0])                    this.getIframeBody().find(this.agcBody).then((steps) => {                        if (steps.text().includes(agcText[1])) {                            let stepsTxt = steps.text()                            expect(stepsTxt).to.equal(agcText[1])                            this.getIframeBody().find("button[data-ctl='Button'][name$='pyWorkPage_1']").should('contain.text', agcText[2])                            this.getIframeBody().find("button[data-ctl='Button'][name$='pyWorkPage_2']").should('contain.text', agcText[3])                            this.getIframeBody().find("button[data-ctl='Button'][name$='pyWorkPage_3']").should('contain.text', agcText[4])

                        } else {                            this.getIframeBody().find("button[data-ctl='Button']").each((button) => {                                this.moveToNextAgc(button)                            })                        }                    })                } else {                    this.getIframeBody().find("button[data-ctl='Button']").each((button) => {                        this.moveToNextAgc(button)                    })                }            })        }

    }

    moveToNextAgc(button) {        if (button.text().includes('Acknowledged')) {            this.getIframeBody().find("button[data-ctl='Button'][name$='pyWorkPage_11']").click()            cy.wait(5000)        } else if (button.text().includes('No Thanks')) {            this.getIframeBody().find("button[data-ctl='Button'][name$='pyWorkPage_2']").click()            cy.wait(5000)        }    

  rm_inv_pro_and_val() {



       this.getIframeBody().contains("Validate Basket").should("be.enabled").click()
        this.getIframeBody().find("div[class='modal-wrapper local-action'] > div > div:nth-child(1) > table:nth-child(2) > tbody > tr > td > div > div > div > span > div").then((validatePopup) => {
            if (validatePopup.text().includes('install')) {
                this.getIframeBody().contains('OK').click()



           }
            else {
                this.getIframeBody().find("div[class='modal-wrapper local-action'] > div > div:nth-child(1) > table:nth-child(2) > tbody > tr > td > div > div > div > span > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > label").then((validatePopup) => {



                   if (validatePopup.text().includes('invalid')) {
                        let rem_prod = validatePopup.text().split('"')
                        this.getIframeBody().contains('OK').click()
                        this.getIframeBody().find(this.basket)
                            .contains(rem_prod[1])
                            .parents('tr.cellCont').find("td:nth-child(4) > div > a").click()
                        this.rm_inv_pro_and_val()
                    } else if (validatePopup.text().includes('not compatible')) { //movers
                        let desc_array = validatePopup.text().split(" ")
                        let rem_prod = ""
                        for (let i = 0; i < desc_array.length; i++) {
                            if (desc_array[i] == 'product') {
                                for (let j = i + 1; j < desc_array.length; j++) {
                                    if (desc_array[j] == 'is') {
                                        break;
                                    } else if (desc_array[i] == 'product' && i == desc_array.length - 2) {
                                        break;
                                    }
                                    rem_prod = rem_prod + desc_array[j] + " "
                                }
                            }
                        }
                        rem_prod = rem_prod.trim()
                        this.getIframeBody().contains('OK').click()
                        this.getIframeBody().find(this.basket)
                            .contains(rem_prod)
                            .parents('tr.cellCont')
                            .find("td:nth-child(4) > div > a").click()
                        this.rm_inv_pro_and_val()
                    }
                })
            }
        })
    }




    selectAddon(addon) {
        this.getIframeBody().contains("Add-Ons ").click()
        cy.wait(3000)
        this.getIframeBody().find("div[class='yui-content tabContent sectionBodyContainerSubHead'] > table:nth-child(2)")
            .contains(addon).parent().find('td:nth-child(1) > input[type=checkbox]')
            .check({ force: true })
        this.checkProductInBasket(addon)
    }



   selectAO(ao) {



       this.getIframeBody().contains("Additional Outlet ").click()



   }



   selectDisc(discount) {



       this.getIframeBody().contains("Discounts ").click()



   }



   selectAeDisc(aediscount) {



       this.getIframeBody().contains("Additional Discounts ").click()
    }



   selectInstall() {



   }



   checkProductInBasket(product) {
        this.getIframeBody().find(this.basket).should('contain', product)
    }



   validateBasket_Success() {
        cy.wait(5000)
        this.getIframeBody().contains("Validate Basket").should("be.enabled").click()



       this.getIframeBody().find("div[class='modal-wrapper local-action']").then((validatePopup) => {



           if (validatePopup.text().includes('invalid')) {
                this.rm_inv_pro_and_val()
                this.validateBasket_Success()    
            } else if (validatePopup.text().includes('not compatible')){
                this.rm_inv_pro_and_val()
                this.validateBasket_Success()
            }else if (validatePopup.text().includes('install')) {
                this.getIframeBody().contains('OK').click()
            } else if (validatePopup.text().includes('Good News!')) {
                this.getIframeBody().contains("OK").click()
                AcceptConfirm.acceptOffer()
            }
        })
    }



   selectCustTab(field, value) {
        this.getIframeBody().find('#PEGA_TABBED1 > ul:nth-child(1) > li:nth-child(1)>span').click()



       this.getIframeBody().contains(field).parents("div[string_type='label']").next("div[string_type='field']").should('contain', value)
    }



   selectUsageTab(value) {
        this.getIframeBody().find('#PEGA_TABBED1 > ul:nth-child(1) > li:nth-child(3)>span').click()



       this.getIframeBody().find("div[param_name $='UsageDetailsBB'] > div[id='EXPAND-INNERDIV'] > div > div > div > div > table[section_index='2'] > tbody > tr > td:nth-child(13) > span")
            .should('contain', value)
    }



   selectCurrentBundle(rgus, swapPro) {




        this.getIframeBody().find(this.basket).find("div > div  > table > tbody > tr > td:nth-child(2) > div > table > tbody > tr:nth-child(2) > td > div  > div > div > div > div:nth-child(1) >  div > div > span")
            .then((bndl) => {
                let bundle = bndl.text()
                cy.log(bundle)
                this.selectRGUs(rgus)
                this.selectBundle(bundle, swapPro)
            })
    }
}



const negotiator = new Negotiator()



export default negotiator;