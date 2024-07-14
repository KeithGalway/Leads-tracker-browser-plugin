let myLeads = []                                                             // myLeads array - holds list of saved leads
const inputEl = document.getElementById('input-el')                          // get input element - for entering leads manually
const inputBtn = document.getElementById('input-btn')                        // get input-btn element - save lead to list from input field
const tabBtn = document.getElementById('tab-btn')                            // get tab-btn element - save lead from url tab
const deleteBtn = document.getElementById('delete-btn')                      // get delete-btn element - clear all the leads
const ulEl = document.getElementById('ul-el')                                // get list element - display list on UI
const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'))    // get leads from cached local storage using getItem function

// if leads exists
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage                                          // assign leads to myLeads array
    render(myLeads)                                                          // display list of leads on browser UI
}

// click event listener for input-btn element
inputBtn.addEventListener('click', () => { 
    myLeads.push(inputEl.value)                                              // add input element value to myLeads array using push function
    inputEl.value = ''                                                       // clear input element value      
    localStorage.setItem('myLeads', JSON.stringify(myLeads))                 // set myLeads array in local storage using setItem function
    render(myLeads)                                                          // display list of leads on browser UI
})

// click event listener for tab-btn element
tabBtn.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {       // get url using chrome tabs API query function
        myLeads.push(tabs[0].url)                                            // add tab url to my myLeads array using push function
        localStorage.setItem('myLeads', JSON.stringify(myLeads))             // set meLeads array in local strorage using setItem function
        render(myLeads)                                                      // display list of leads on browser UI
    })
})

// double click event listener for delete-btn element
deleteBtn.addEventListener('dblclick', () => {
    localStorage.clear()                                                     // clear leads from cached local storage
    myLeads = []                                                             // clear myLeads array
    render(myLeads)                                                          // display list of leads on browser UI
})

// render function displays list of leads on browser UI
function render(leads) {
    let listItems = ''                                                       // create listItems to hold html content
    for (let i = 0; i < leads.length; i++) {                                 // iterate over leads array
        listItems += `                                                         
            <li>
                <a target="_blank" href="${myLeads[i]}">
                    ${myLeads[i]}
                </a>
            </li>
        `                                                                    // concatenate list item of links of each lead in html
    }
    ulEl.innerHTML = listItems                                               // set listItems HTML content to HTML content list element                               
}