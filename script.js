// ==UserScript==
// @name     Unnamed Script 389680
// @version  1
// @grant         GM.xmlHttpRequest
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js 
// ==/UserScript==

//Gets destination from the HTML
const dest = $("span.fullName")[0].innerText;



//Get tiles of activities
const tiles = $(".activity-tile");



//$(t).click(function(e) {
//  console.log("Here", e);
//  e.stopPropagation();
//})

//tiles.append(t);

//tiles.after(t);


console.log(tiles);
for(let i =0; i < tiles.length; i++) {
  let tile = tiles[i];
  const t = document.createElement("input");
  $(t).addClass("my-checkbox");
  t.type="checkbox"
  t.style.margin = "auto"
  t.id = "checkbox-" + tile.id;
  tile.after(t);
  console.log(tile.id);
}


const mainSection = $("[role='main']")[0];
console.log(mainSection);

const makeItineraryBtn = document.createElement('button');
makeItineraryBtn.innerText = "Make Itinerary";
makeItineraryBtn.style.marginLeft = "300px";
makeItineraryBtn.style.marginBottom = "10px";
makeItineraryBtn.style.fontSize = "30px";
makeItineraryBtn.style.backgroundColor = "green";
makeItineraryBtn.style.padding = "10px";
$(makeItineraryBtn).click(function(e) {
  
	let query = "";
  const data = [];
//  window.open('http://localhost:3000/itinerary?q=', '_blank');
  console.log("HEREE");
  const checkboxes = $(".my-checkbox");
  console.log(checkboxes);
  for(let i =0; i < checkboxes.length; i++) {
    const cb = checkboxes[i];
    console.log(cb);
    console.log(cb.checked);
    if(cb.checked) {
      const acId = cb.id.split("-")[1];
			query = query + ";" + acId;
      
      
      const link = $(`#${acId}`).find('.flex-link')[0];
      console.log(link);
      
      const activityName = $(`#${acId}`).find('.tile-name')[0].innerText;
      
      const imageUrl = $(`#${acId}`).find('.tile-media')[0].src;
      
      data.push({ acId: acId, url: link.href, activityName, imageUrl});
    }
  }
  
	console.log('query:', query);
  console.log('data:', data);
  
  /*
  var request = new GM.xmlHttpRequest()

  // Open a new connection, using the GET request on the URL endpoint
  request.open('GET', 'http://localhost:3000/itinerary?q=' + query, true)

  request.onload = function () {
    // Begin accessing JSON data here
    	console.log(this.response);
    }
  }

  // Send request
  request.send()
  */
  
  console.log({data, dest});

GM.xmlHttpRequest({
  method: "POST",
  url: `http://localhost:3000/itinerary`,
  data: JSON.stringify({activities: data, dest}),
  headers: {
    "Content-Type": "application/json"
  },
  onload: function(response) {

    console.log([
      response.status,
      response.statusText,
      response.readyState,
      response.responseHeaders,
      response.responseText,
      response.finalUrl
    ].join("\n"));
    
    console.log(JSON.parse(response.responseText));
    
    const res = JSON.parse(response.responseText);
    
    
    const viewIt = document.createElement("button");
    viewIt.innerText = "View Itinerary";
    viewIt.style.marginLeft = "300px";
    viewIt.style.marginBottom = "10px";
    viewIt.style.fontSize = "30px";
    viewIt.style.backgroundColor = "blue";
    viewIt.style.padding = "10px"; 
    $(viewIt).click(function(e) {
      
			window.open(res.url, '_blank');
    })
    
    $(makeItineraryBtn).after(viewIt);
  }
});
})

mainSection.prepend(makeItineraryBtn);
