console.log("hello world")

let currentDate = new Date();
console.log(currentDate);

// Funtion to convert current date to week number 

Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
  }

//   Getting the DOM element  main container

let mainContainer = document.getElementById("mainContainer");
// Getting Week Number
let week = currentDate.getWeek();
console.log(week);

// Main Funtion Starts

if (week % 2 === 0) { // If the current week is even
    // Perform actions for even weeks
    console.log("week is even");
    if(currentDate.getDay()===0){
        console.log("halwa puri, Lobia, Chicken Pulao");
        mainContainer.innerHTML = `        
        <div class="container my-4" id="mainContainer">
    <ol class="list-group list-group-numbered">
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">BreakFast</div>
            Halwa Poori 
          </div>
         
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Lunch</div>
          Red Beans
          </div>
          
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Dinner</div>
              Chicken Pulao
          </div>
          
        </li>
      </ol>
  </div>
        `
    }
    if(currentDate.getDay()===1){
        console.log("paratha Omellete, Aluu Teenday, Shami kabab");
        mainContainer.innerHTML = `        
        <div class="container my-4" id="mainContainer">
    <ol class="list-group list-group-numbered">
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">BreakFast</div>
            Paratha + Omelette
          </div>
         
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Lunch</div>
           Aluu Teenday
          </div>
          
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Dinner</div>
              Fish
          </div>
          
        </li>
      </ol>
  </div>
        `
    }
    if(currentDate.getDay()===2){
        console.log("naan channa, Kari Pakora rice, Korma kheer");
        mainContainer.innerHTML = `        
        <div class="container my-4" id="mainContainer">
    <ol class="list-group list-group-numbered">
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">BreakFast</div>
            Naan Channa
          </div>
         
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Lunch</div>
           Kari Pakora + Rice
          </div>
          
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Dinner</div>
              Korma + Kheer
          </div>
          
        </li>
      </ol>
  </div>
        `
    }
    if(currentDate.getDay()===3){
        console.log("paratha khakina, daal Salad,  Manchurian ");
        mainContainer.innerHTML = `        
        <div class="container my-4" id="mainContainer">
    <ol class="list-group list-group-numbered">
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">BreakFast</div>
            Paratha + Khakina
          </div>
         
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Lunch</div>
            Mash Daal + Salad 
          </div>
          
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Dinner</div>
              Manchurian + Fried Rice
          </div>
          
        </li>
      </ol>
  </div>
        `
    }
    if(currentDate.getDay()===4){
        console.log("french toast, Aluu palak ,Biryani"); 
        mainContainer.innerHTML = `        
        <div class="container my-4" id="mainContainer">
    <ol class="list-group list-group-numbered">
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">BreakFast</div>
            French Toast
          </div>
         
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Lunch</div>
            Aluu Palak
          </div>
          
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Dinner</div>
               Biryani
          </div>
          
        </li>
      </ol>
  </div>
        `
    }
    if(currentDate.getDay()===5){
        console.log("paratha aluu,daal chawal yellow, Koftay");
        mainContainer.innerHTML = `        
        <div class="container my-4" id="mainContainer">
    <ol class="list-group list-group-numbered">
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">BreakFast</div>
            Paratha + Aluu Bhujia
          </div>
         
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Lunch</div>
            Daal Chawal (Yellow)
          </div>
          
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Dinner</div>
                Koftay
          </div>
          
        </li>
      </ol>
  </div>
        `
    }
    if(currentDate.getDay()===6){
        console.log("aluu paratha, Aluu gobi, Chapli kabab ");
         menu.innerHTML = `<h1 id="Menu">
         aluu paratha, Aluu gobi, Chapli kabab
        </h1>`;
    }
} else { // If the current week is odd
    // Perform actions for odd weeks
    console.log("week is odd");
    if(currentDate.getDay()===0){
        console.log("halwa puri, Lobia, Curry Pulao");
        mainContainer.innerHTML = `        
        <div class="container my-4" id="mainContainer">
    <ol class="list-group list-group-numbered">
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">BreakFast</div>
            Halwa Poori 
          </div>
         
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Lunch</div>
          Red Beans
          </div>
          
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Dinner</div>
              Chicken Curry + Pulao
          </div>
          
        </li>
      </ol>
  </div>
        `
    }
    if(currentDate.getDay()===1){
        console.log("paratha Omellete, Aluu Teenday, Shami kabab");
        mainContainer.innerHTML = `        
        <div class="container my-4" id="mainContainer">
    <ol class="list-group list-group-numbered">
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">BreakFast</div>
            Paratha + Omelette
          </div>
         
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Lunch</div>
           Aluu Teenday
          </div>
          
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Dinner</div>
              Shami Kabab
          </div>
          
        </li>
      </ol>
  </div>
        `
    }
    if(currentDate.getDay()===2){
        console.log("naan channa, Kari Pakora roti, Korma Gajar halwa");
        mainContainer.innerHTML = `        
        <div class="container my-4" id="mainContainer">
    <ol class="list-group list-group-numbered">
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">BreakFast</div>
            Naan Channa
          </div>
         
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Lunch</div>
           Kari Pakora + Roti
          </div>
          
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Dinner</div>
              Korma + Gajar Halwa
          </div>
          
        </li>
      </ol>
  </div>
        `
    }
    if(currentDate.getDay()===3){
        console.log("paratha khakina, daal Dahi,  Chana Pulao ");
        mainContainer.innerHTML = `        
        <div class="container my-4" id="mainContainer">
    <ol class="list-group list-group-numbered">
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">BreakFast</div>
            Paratha + Khakina
          </div>
         
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Lunch</div>
            Mash Daal + Yoghurt 
          </div>
          
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Dinner</div>
              Chana Pulao
          </div>
          
        </li>
      </ol>
  </div>
        `
    }
    if(currentDate.getDay()===4){
        console.log("french toast, Aluu palak ,Biryani"); 
        mainContainer.innerHTML = `        
        <div class="container my-4" id="mainContainer">
    <ol class="list-group list-group-numbered">
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">BreakFast</div>
            French Toast
          </div>
         
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Lunch</div>
            Aluu Palak
          </div>
          
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Dinner</div>
               Biryani
          </div>
          
        </li>
      </ol>
  </div>
        `
    }
    if(currentDate.getDay()===5){
        console.log("paratha aluu,daal chawal Black, Daleem");
        mainContainer.innerHTML = `        
        <div class="container my-4" id="mainContainer">
    <ol class="list-group list-group-numbered">
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">BreakFast</div>
            Paratha + Aluu Bhujia
          </div>
         
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Lunch</div>
            Daal Chawal (Black)
          </div>
          
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Dinner</div>
                Daleem
          </div>
          
        </li>
      </ol>
  </div>
        `
    }
    if(currentDate.getDay()===6){
        console.log("aluu paratha, Aluu gobi,Cutlets Daal");
        mainContainer.innerHTML = `        
        <div class="container my-4" id="mainContainer">
    <ol class="list-group list-group-numbered">
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">BreakFast</div>
            Aluu Paratha
          </div>
         
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Lunch</div>
            Aluu Gobi
          </div>
          
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">Dinner</div>
            Cutlets + Daal
          </div>
          
        </li>
      </ol>
  </div>
        `
    }
  }
