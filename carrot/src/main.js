let money = 0;

carrots = 0;
carrotPrice = 7;

carrotSeeds = 25; 

carrotGrowthTime = 15;

selectedItem = "cursor";

setInterval(update, 100)

// PLANTING & GROWING

function plant(event) {
  if (!event.target.classList.contains("planted") && selectedItem == "carrotSeeds") {
    event.preventDefault();
    selectedItem = "cursor";
    document.body.style.cursor = 'url("res/img/cursors/cursor.png"),auto';
    event.target.style.background = "url(res/img/soil-carrot.png)";
    carrotSeeds -= 1;
    event.target.classList.add("planted")
    event.target.childNodes[1].childNodes[2].style.display = "block"; // progress bar
    event.target.childNodes[1].childNodes[0].style.opacity = "100%"; // vegetable name
    event.target.childNodes[1].childNodes[4].style.display = "none"; // click to harvest
    growing = setInterval( function() { grow(event, "carrot") }, 500)
  }
}

function grow(event, vegetable) {
  if (selectedItem == "cursor") {
    if (event.target.classList.contains("planted")) {
      let modifier = 100 / window[vegetable+"GrowthTime"];
      let barWidth = event.target.childNodes[1].childNodes[2].childNodes[0].offsetWidth;
      if (barWidth < 96) {
        event.target.childNodes[1].childNodes[2].childNodes[0].style.width = barWidth + modifier + "px";
      } else {
        harvestReady(event)
      }
    }
  }
}

function harvestReady(event) {

  event.target.style.background = "url(res/img/soil-carrot-ready.png)";

  event.target.childNodes[1].childNodes[2].style.display = "none"; // progress bar
  event.target.childNodes[1].childNodes[0].style.opacity = "0%"; // vegetable name
  event.target.childNodes[1].childNodes[4].style.display = "block"; // click to harvest

  event.target.classList.remove("planted")
  event.target.classList.add("ready")
  console.log(event.target.classList)
}

function harvest(event, vegetable) {
  if (selectedItem == "cursor") {
    if (event.target.classList.contains("ready")) {

      event.target.style.background = "#76552B";
  
      event.target.classList.remove("ready");
      event.target.childNodes[1].childNodes[4].style.display = "none"; // click to harvest
  
      window[vegetable+"s"] += 1;
      event.target.childNodes[1].childNodes[2].childNodes[0].style.width = "0px";
    }
  }
}

// SELLING

function sell() {
  //sell = document.getElementById("sell");
  if (selectedItem == "carrot") {
    if (carrots > 0) {
      carrots--;
      money += carrotPrice;
    }
  }
}

// MENUS

function toggle(...menuIDs) {
  for (let menuID of menuIDs) {
    let menu = document.getElementById(menuID)
    if (menu.style.display == "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
    }
  }
}

// SELECT

function select(item) {
  document.body.style.cursor = 'url("res/img/cursors/'+item+'-cursor.png"),auto';
  selectedItem = item;
}

// UPDATE FUNCTION

function update() {
  document.getElementById("carrotSeeds").innerHTML = carrotSeeds;
  document.getElementById("carrots").innerHTML = carrots;
  document.getElementById("money").innerHTML = "$"+money.toFixed(2)
}