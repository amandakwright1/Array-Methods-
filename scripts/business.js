import { getBusiness } from "./database.js";

const businesses = getBusiness()

const outputContainer = document.querySelector("#output")
export const business = () => {

  outputContainer.innerHTML = "<h1>Active Businesses</h1>"
businesses.forEach(business => {
  outputContainer.innerHTML += `
  <h2>${business.companyName}</h2>
    <section>
    ${business.addressFullStreet}
    </section>
    <section>
    ${business.addressCity},
    ${business.addressStateCode}
    ${business.addressZipCode}
    </section>
    
    `
    outputContainer.innerHTML += "<hr/>"
  });
  const manufacturingBusinesses = businesses.filter(business => {
    let IndustryType = false
  
    if (business.companyIndustry === "Manufacturing") {
        IndustryType = true
    }
  
    return IndustryType
  })
  outputContainer.innerHTML += "<h1>Manufacturing Businesses</h1>"
  manufacturingBusinesses.forEach(business => {
    outputContainer.innerHTML += `
    <h2>${business.companyName}</h2>
      <section>
      ${business.addressFullStreet}
      </section>
      <section>
      ${business.addressCity},
      ${business.addressStateCode}
      ${business.addressZipCode}
      </section>
      
      `
      outputContainer.innerHTML += "<hr/>"
    });


// Array to contain all the New York businesses
  const newYorkBusinesses = businesses.filter(business => {
    let inNewYork = false
  
    if (business.addressStateCode === "NY") {
        inNewYork = true
    }
  
    return inNewYork
  })
  
  outputContainer.innerHTML += `<h1>New York Area Businesses</h1>
                                <section>`
  newYorkBusinesses.forEach(business => {
    outputContainer.innerHTML += `
      <h2>${business.companyName}
          ($${totalOrders})   </h2>
      <section>
        ${business.addressFullStreet}
        </section>
      <section>
        ${business.addressCity},
        ${business.addressStateCode}
        ${business.addressZipCode}
      </section>
      
    `
    outputContainer.innerHTML += "</section>"
  
  }) 
  /*
      Using map(), you extract the purchasing agent object
      from each business and store it in a new array
  */
  const agents = businesses.map(business => {
      return business.purchasingAgent
  })
  
  
  const agentsInfo = businesses.map(business => {
   
    let agent = { 
      nameFirst:`${business.purchasingAgent.nameFirst}`,
      nameLast: `${business.purchasingAgent.nameLast}`,
      companyName: `${business.companyName}`,
      phoneWork: `${business.phoneWork}`

    }
    return agent
})

  console.table(agents)
  
  agentsInfo.forEach(agent => {
    outputContainer.innerHTML += `<h2>${agent.nameFirst} ${agent.nameLast} <br>${agent.companyName}<br> ${agent.phoneWork}</h2>`;
    outputContainer.innerHTML += "<hr/>";
  });


document
    .querySelector("#companySearch")
    .addEventListener("keypress", keyPressEvent => {
        if (keyPressEvent.charCode === 13) {
            /* WHEN  USER PRESSES ENTER, FIND MATCHING BUSINESS */
            const foundBusiness = businesses.find(
                business =>
                    business.companyName.includes(keyPressEvent.target.value)
            );

            outputContainer.innerHTML = `
                <h2>
                ${foundBusiness.companyName}
                </h2>
                <section>
                ${foundBusiness.addressFullStreet}

                </section>
                <section>
                ${foundBusiness.addressCity},
                ${foundBusiness.addressStateCode}
                ${foundBusiness.addressZipCode}
                </section>
            `;
        }
    });



    document
    .querySelector("#agentSearch")
    .addEventListener("keypress", keyPressEvent => {
        if (keyPressEvent.charCode === 13) {
            /* WHEN  USER PRESSES ENTER, FIND MATCHING AGENT */
            const foundAgent = businesses.find(
                business =>
                    business.purchasingAgent.nameFirst.includes(keyPressEvent.target.value) ||
                    business.purchasingAgent.nameLast.includes(keyPressEvent.target.value)
        )
 
            outputContainer.innerHTML = `
                <h2>
                ${foundAgent.purchasingAgent.nameFirst}
                ${foundAgent.purchasingAgent.nameLast}
                </h2>
                <section>
                ${foundAgent.phoneWork}

                </section>
                <section>
                ${foundAgent.addressCity},
                ${foundAgent.addressStateCode}
                ${foundAgent.addressZipCode}
                </section>
            `;
        }
    });

/* CALCULATE ORDER SUMMARY */
let totalOrders = business.orders.reduce(
  (currentTotal, nextValue) => currentTotal += nextValue,
  0
)

}



