const questData = require("../fixtures/installQue.json")
class Install {



   constructor() {



       this.question = "div[node_name='InstallTypeInTabStaticMessage'] > span > div > span > div > div > div > div > div:nth-child(2) > div > div > span"
        this.yesRadio = "div[role='radiogroup'] > div > span:nth-child(1) > input"
        this.noRadio = "div[role='radiogroup'] > div > span:nth-child(2) > input"
        this.dnkRadio = "div[role='radiogroup'] > div > span:nth-child(3) > input"
        this.installType = "div[id$='InstallComparisonListALL'] > div > div.lvTableContainer > table > tbody > tr[class='listTableRowShadedStyle']"
    }



   getIframeDocument() {
        return cy
            .get('#PegaGadget0Ifr')
            .its('0.contentDocument')
    }



   getIframeBody() {
        return this.getIframeDocument()
            .its('body')
            .then(cy.wrap)
    }



   selectInstall () {



   }



   tocvFlow (){
        this.getIframeBody().contains('Install Type').click()
        cy.wait(3000)
        this.getIframeBody().find(this.question).contains(questData.toCVQue.specialServices)
        this.getIframeBody().find(this.noRadio).click()
        cy.wait(3000)
        this.getIframeBody().find("button[name^='InstallQuestions_InstallPage']").last().click()
        cy.wait(3000)
        this.getIframeBody().find("button[name^='InstallQuestions_InstallPage']").last().click()
        cy.wait(3000)
        this.getIframeBody().contains('May Be Later').click()
        cy.wait(3000)



       this.getIframeBody().find(this.question).then((qs)=>{
            if(qs.text().includes(questData.cvQS.extension)){
                this.getIframeBody().find("button[name^='InstallQuestions_InstallPage']").last().click()
                cy.wait(3000)
                this.getIframeBody().find("button[name^='InstallQuestions_InstallPage']").first().click()
            }
        })
        // this.getIframeBody().find("button[name^='InstallQuestions_InstallPage']").first().click()
        // cy.wait(3000)
        // this.getIframeBody().find("button[name^='InstallQuestions_InstallPage']").first().click()
        // cy.wait(3000)
        // this.getIframeBody().find("button[name^='InstallQuestions_InstallPage']").first().click()
        // cy.wait(3000)
        this.getIframeBody().find(this.yesRadio).click()




        cy.wait(3000)



       this.getIframeBody().find(this.installType).each((type) =>{



               expect(type.find('td:nth-child(4)').text().includes('X21CVQS')).to.be.true
        
                type.find('td:nth-child(1) > input').click()
                cy.wait(1000).then(()=>{
                    type.find("td:nth-child(1) > input[pn $='pySingleSelection']").click()
                })
        })



       cy.wait(2000)



       this.getIframeBody().find("div[node_name='pyModalTemplate'] > table:nth-child(1)").then((popup)=>{
            if(popup.text().includes('Quickstart')){
                this.getIframeBody().find("button[name='QuickStartsHomeDelivery_pyWorkPage_5']").click()
            }
        })
    }
}



const install = new Install()



export default install;