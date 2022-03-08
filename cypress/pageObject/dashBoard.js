class Dashboard{

    selectMenu(){
        return cy.get('#menu')
    }

    selectResource(){

        return cy.xpath("/html/body/app-root/app-content-layout/section/app-nav/mat-sidenav-container/mat-sidenav/div/mat-nav-list/a[2]")
    }
}


export default Dashboard;