// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
let active_tab_index = 0;
let myTabs = [];
if(window.top.myTabs){
    window.top.myTabs.forEach((tab,i)=>{
        if(i===0 || !tab){
            return;
        }
        try{
            tab.close()
            window.top.myTabs[i] = null
        }catch(e){

        }
    })
}
window.top.myTabs = myTabs;
let myTabNames = [];
window.top.myTabNames = myTabNames;

// TODO: make this a nice collapsing table
function debugTabState() {
    // comment this out to silence it
    console.warn('-----debugTabState: active_tab:',active_tab_index + ' ' + myTabNames[active_tab_index])
    myTabs.forEach((_win, k) => {
        console.warn(k, {
            active_tab_index,
            name: myTabNames[k],
            win: _win,
            winATABNAME: _win? _win.ATABNAME : null,
            app_name: _win? _win.APP_NAME: null // something i use for debugging
        })
    })
}

Cypress.Commands.add('debugTabHelper',()=>{
    debugTabState();
    return {
        active_tab_index,
        myTabNames,
        myTabs,
    }
})

Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
    // support for keying the first window with a tab_name like our child windows to simplify switching windows and making it readable
    // instead of keeping track of array indexes
    // can pass options as first param too
    let tab_name = null;
    if (url && url.tab_name) {
        tab_name = url.tab_name
    }
    if (options && options.tab_name) {
        tab_name = options.tab_name
    }
    if(tab_name){
        myTabNames[0] = tab_name
    }else{
        myTabNames[0] = 'root'
    }
    myTabs[0] = cy.state('window')
    // originalFn is the existing `visit` command that you need to call
    // and it will receive whatever you pass in here.
    //
    // make sure to add a return here!
    return originalFn(url, options)
})

// note: cy.reload win.location.reload, etc break our context aware popups
// use this special visit function that maintains our context awareness when navigating on the currently active context
