import { React, useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import TodayContainer from '../components/TodayContainer'
import TodayFooter from '../components/TodayFooter';


export default function Daily() {
  //initializing Current date using UseMemo hook to avoid re-rendering
  const currentDate = useMemo(() => new Date(), []);

  // Funtion to convert current date to week number 
  // eslint-disable-next-line
  Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() - 1) / 7);
  }
  // Getting Week Number
  let week = currentDate.getWeek();
  // Initiallizing Breakfast, Lunch, and Dinner States
  const [breakfast, setbreakfast] = useState('');
  const [lunch, setlunch] = useState('');
  const [dinner, setdinner] = useState('');
  //Useeffect Hook Starts
  useEffect(() => {
    if (week % 2 !== 0) {   //week is odd
      if (currentDate.getDay() === 0) {    //Sunday  odd
        setbreakfast("Halwa poori")
        setlunch("Red Beans")
        setdinner("Chicken Curry + Pulao")
      }
      if (currentDate.getDay() === 1) {    //Monday odd
        setbreakfast("Half/Full Fried Egg")
        setlunch("Aluu Gajar Matar")
        setdinner("Shami Kabab + Daal")
      }
      if (currentDate.getDay() === 2) {    //Tuesday odd
        setbreakfast("Naan Channa")
        setlunch(" Kari Pakora + Rice")
        setdinner("Korma + Kheer")
      }
      if (currentDate.getDay() === 3) {     //Wednesday odd
        setbreakfast(" Paratha + Omelette")
        setlunch("Mash Daal + Salad")
        setdinner("Chicken Karahi + Custard")
      }
      if (currentDate.getDay() === 4) {     //Thursday odd
        setbreakfast("Bread + Butter + Jam")
        setlunch("Aluu Palak")
        setdinner("Biryani")
      }
      if (currentDate.getDay() === 5) {     //Friday odd
        setbreakfast("Egg + Tomato + Onion")
        setlunch("Daal Chawal (Yellow)")
        setdinner("Chicken Koftay")
      }
      if (currentDate.getDay() === 6) {     //Saturday odd
        setbreakfast("Aluu Paratha")
        setlunch("Aluu Gobi")
        setdinner("Cutlets + Daal")
      }
    } else {      //week is even
      if (currentDate.getDay() === 0) {    //Sunday  even
        setbreakfast("Halwa poori")
        setlunch("Red Beans")
        setdinner("Chicken Pulao")
      }
      if (currentDate.getDay() === 1) {    //Monday even
        setbreakfast("Half/Full Fried Egg")
        setlunch("Aluu Gajar Matar")
        setdinner("Fish")
      }
      if (currentDate.getDay() === 2) {    //Tuesday even
        setbreakfast("Naan Channa")
        setlunch(" Kari Pakora + Roti")
        setdinner("Korma + Gajar Halwa")
      }
      if (currentDate.getDay() === 3) {     //Wednesday even
        setbreakfast("Paratha + Khakina")
        setlunch("Mash Daal + Yoghurt")
        setdinner("Mattar Pulao")
      }
      if (currentDate.getDay() === 4) {     //Thursday even
        setbreakfast("French Toast")
        setlunch("Aluu Palak")
        setdinner("Biryani")
      }
      if (currentDate.getDay() === 5) {     //Friday even
        setbreakfast("Paratha + Aluu Bhujia")
        setlunch("Daal Chawal (Black)")
        setdinner("Daleem")
      }
      if (currentDate.getDay() === 6) {     //Saturday even
        setbreakfast("Aluu Paratha")
        setlunch("Aluu Gobi")
        setdinner("Chapli Kabab + Daal")
      }
    }
  }, [currentDate, week])
  return (
    <>
      <Navbar />
      <TodayContainer breakfast={breakfast} lunch={lunch} dinner={dinner} />
      <TodayFooter />
    </>
  )
}
