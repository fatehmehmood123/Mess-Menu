let currentDate = new Date();
Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
  }
let week = currentDate.getWeek();
let weekData = document.getElementById("weekData");
if (week % 2 !== 0) {;
weekData.innerHTML = `
<h3 id="weekHeading">This Week Menu</h3>
<table>
  <tr>
    <th>Day</th>
    <th>Breakfast</th>
    <th>Lunch</th>
    <th>Dinner</th>
  </tr>
  <tr>
    <td>Saturday</td>
    <td>Aluu Paratha</td>
    <td>Aluu Gobi</td>
    <td>Chapli Kabab</td>
  </tr>
  <tr>
    <td>Sunday</td>
    <td>Halwa Poori</td>
    <td>Red Beans</td>
    <td>Chicken Pulao</td>
  </tr>
  <tr>
    <td>Monday</td>
    <td>Paratha Omelette</td>
    <td>Aluu Gajar Matar</td>
    <td>Shami Kabab + Daal channa</td>
  </tr>
  <tr>
    <td>Tuesday</td>
    <td>Naan Channay</td>
    <td>Curry + Rice</td>
    <td>Korma + Kheer</td>
  </tr>
  <tr>
    <td>Wednesday</td>
    <td>Paratha Khakina</td>
    <td>Daal Mash + Salad </td>
    <td>Manchurian + Fried rice</td>
  </tr>
  <tr>
    <td>Thursday</td>
    <td>French toast</td>
    <td>Aluu Palak</td>
    <td>Biryani</td>
  </tr>
  <tr>
    <td>Friday</td>
    <td>Paratha Aluu Bhujia</td>
    <td>Daal Chawal (Yellow) </td>
    <td>Koftay</td>
  </tr>
  
  
</table>
</div> 
    `;

}else{
    weekData.innerHTML = `
<h3 id="weekHeading">This Week Menu</h3>
<table>
  <tr>
    <th>Day</th>
    <th>Breakfast</th>
    <th>Lunch</th>
    <th>Dinner</th>
  </tr>
  <tr>
    <td>Saturday</td>
    <td>Aluu Paratha</td>
    <td>Aluu Gobi</td>
    <td>Cutlets</td>
  </tr>
  <tr>
    <td>Sunday</td>
    <td>Halwa Poori</td>
    <td>Red Beans</td>
    <td>Chicken Curry + Pulao</td>
  </tr>
  <tr>
    <td>Monday</td>
    <td>Paratha Omelette</td>
    <td>Aluu Gajar Matar</td>
    <td>Fish + Daal channa</td>
  </tr>
  <tr>
    <td>Tuesday</td>
    <td>Naan Channay</td>
    <td>Curry + Roti</td>
    <td>Korma + Gajar Halwa</td>
  </tr>
  <tr>
    <td>Wednesday</td>
    <td>Paratha Khakina</td>
    <td>Daal Mash + Yoghurt </td>
    <td>Channa Pulao</td>
  </tr>
  <tr>
    <td>Thursday</td>
    <td>French toast</td>
    <td>Aluu Palak</td>
    <td>Biryani</td>
  </tr>
  <tr>
    <td>Friday</td>
    <td>Paratha Aluu Bhujia</td>
    <td>Daal Chawal (Black) </td>
    <td>Daleem</td>
  </tr>
  
  
</table>
</div> 
    `;
}