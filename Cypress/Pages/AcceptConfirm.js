class AcceptConfirm {
    constructor() {



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




    acceptOffer() {
        cy.wait(3000)
        this.getIframeBody().find("div[node_name='ResponsePanel'] > div:nth-child(4) > div > div > div:nth-child(1)  > div > div > span > button").click()
        this.ofcomPopup()



   }



   ofcomPopup() {
        cy.wait(3000)



       this.getIframeBody().find("input[class ='checkbox chkBxCtl ']").each((checkBox)=>{
            checkBox.trigger('click')
            cy.wait(1000)
        })
       
        this.getIframeBody().contains('OK').click()
        this.confirmOffer()
    }




    confirmOffer() {
        cy.wait(3000)
        this.getIframeBody().find("button[name='ConfirmButtonsSection_pyWorkPage_7']").click()



   }



   checkIcoms(icomsCode){
        cy.wait(3000)
        this.getIframeBody().find("div[node_name='NegotiatedOfferDetailsInternal'] > table[role='presentation'][section_index='2'] > tbody")
        .should("contain", icomsCode)
    }
}



const acceptConfirm = new AcceptConfirm()



export default acceptConfirm;