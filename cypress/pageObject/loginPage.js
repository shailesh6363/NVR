class Login{

    setUserName(){

        return cy.get('#mat-input-0')
    }

    setPassword(){
        return cy.get('#mat-input-1')
    }

    selectSignInButton(){
        return cy.xpath("//span[contains(text(),'Sign In')]")
    }
}

export default Login;