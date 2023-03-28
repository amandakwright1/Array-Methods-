import {business} from "./business.js"

const mainContainer = document.querySelector("#container")


// renderallhtml puts all the info back into the DOM
const renderAllHTML = () => { 
   business()
}

renderAllHTML()