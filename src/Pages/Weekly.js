import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WeekContainer from '../components/WeekContainer'
export default function Weekly() {
  const [monDinner, setmonDinner] = useState("")
  const [tueLunch, settueLunch] = useState("")
  const [tueDinner, settueDinner] = useState("")
  const [wedBreakfast, setwedBreakfast] = useState("")
  const [wedLunch, setwedLunch] = useState("")
  const [wedDinner, setwedDinner] = useState("")
  const [friLunch, setfriLunch] = useState("")
  const [friDinner, setfriDinner] = useState("")
  const [satLunch, setsatLunch] = useState("")
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
      setmonDinner('Beef Shami Kabab / Chicken Roast + Daal')
      settueLunch('Kari Pakora + Rice')
      settueDinner('Beef Pulao + Aluu Cutlets')
      setwedBreakfast('Paratha + Omellete')
      setwedLunch('Mash Daal + Salad')
      setwedDinner('Chicken Karahi + Custard')
      setfriLunch('Daal Chawal (Yellow)')
      setfriDinner('Beef Daleem')
      setsatLunch('Aluu Gobi')
      setsatDinner('Beef Chapli kabab + Daal')
      setsunDinner('Chicken Pulao + Aluu Cutlets + Raita')
    } else {      //week is even
      setmonDinner('Beef Shami Kabab / Chicken Roast')
      settueLunch('Kari Pakora + Roti')
      settueDinner('Beef Pulao + Aluu Cutlets')
      setwedBreakfast('Paratha + Aluu Bhujia')
      setwedLunch('Mash Daal + Yoghurt')
      setwedDinner('Chicken Karahi + Custard')
      setfriLunch('Daal Chawal (Black)')
      setfriDinner('Aluu Beef Curry')
      setsatLunch('Bhindi')
      setsatDinner('Aluu Cutlets + Daal')
      setsunDinner('Chicken Pulao + Aluu Cutlets + Raita')
    }
  }, [week])
  return (
    <>
      <Navbar />
      <WeekContainer wedBreakfast={wedBreakfast} tueLunch={tueLunch} monDinner={monDinner} tueDinner={tueDinner} wedLunch={wedLunch} wedDinner={wedDinner} friLunch={friLunch} friDinner={friDinner} satDinner={satDinner} sunDinner={sunDinner} />
      <Footer />
    </>
  )
}
