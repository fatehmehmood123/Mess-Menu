import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WeekContainer from '../components/WeekContainer'
export default function Weekly() {
  const [monDinner, setmonDinner] = useState("")
  const [tueLunch, settueLunch] = useState("")
  const [tueDinner, settueDinner] = useState("")
  const [wedLunch, setwedLunch] = useState("")
  const [wedDinner, setwedDinner] = useState("")
  const [friLunch, setfriLunch] = useState("")
  const [friDinner, setfriDinner] = useState("")
  const [satDinner, setsatDinner] = useState("")
  const [sunDinner, setsunDinner] = useState("")

   //initializing Current date
   let currentDate = new Date();
  
   // Funtion to convert current date to week number 
   // eslint-disable-next-line
   Date.prototype.getWeek = function () {
     var onejan = new Date(this.getFullYear(), 0, 1);
     return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() - 1) / 7);
   }
   // Getting Week Number
   let week = currentDate.getWeek();
//Useeffect Hook Starts
useEffect(() => {
  if (week % 2 !== 0) {   //week is odd
    setmonDinner('Shami Kabab + Daal')
    settueLunch('Kari Pakora + Rice')
    settueDinner('Korma + Kheer')
    setwedLunch('Mash Daal + Salad')
    setwedDinner('Manchurian + Fried Rice')
    setfriLunch('Daal Chawal (Yellow)')
    setfriDinner('Chicken Koftay')
    setsatDinner('Cutlets + Daal')
    setsunDinner('Chicken Curry + Pulao')
  } else {      //week is even
    setmonDinner('Fish')
    settueLunch(' Kari Pakora + Roti')
    settueDinner('Korma + Gajar Halwa')
    setwedLunch('Mash Daal + Yoghurt')
    setwedDinner('Mattar Pulao')
    setfriLunch('Daal Chawal (Black)')
    setfriDinner('Daleem')
    setsatDinner('Chapli Kabab + Daal')
    setsunDinner('Chicken Pulao')
  }
}, [week])
  return (
    <>
    <Navbar/>
    <WeekContainer tueLunch={tueLunch} monDinner={monDinner} tueDinner={tueDinner} wedLunch={wedLunch} wedDinner={wedDinner} friLunch={friLunch} friDinner={friDinner} satDinner={satDinner} sunDinner={sunDinner}/>
    <Footer/>
    </>
  )
}
