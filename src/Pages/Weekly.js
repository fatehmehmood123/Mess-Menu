import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WeekContainer from '../components/WeekContainer'
export default function Weekly() {
  const [monBreakfast, setmonBreakfast] = useState("")
  const [monLunch, setmonLunch] = useState("")
  const [monDinner, setmonDinner] = useState("")
  const [tueBreakfast, settueBreakfast] = useState("")
  const [tueLunch, settueLunch] = useState("")
  const [tueDinner, settueDinner] = useState("")
  const [wedBreakfast, setwedBreakfast] = useState("")
  const [wedLunch, setwedLunch] = useState("")
  const [wedDinner, setwedDinner] = useState("")
  const [thursBreakfast, setthursBreakfast] = useState("")
  const [thursLunch, setthursLunch] = useState("")
  const [thursDinner, setthursDinner] = useState("")
  const [friBreakfast, setfriBreakfast] = useState("")
  const [friLunch, setfriLunch] = useState("")
  const [friDinner, setfriDinner] = useState("")
  const [satBreakfast, setsatBreakfast] = useState("")
  const [satLunch, setsatLunch] = useState("")
  const [satDinner, setsatDinner] = useState("")
  const [sunBreakfast, setsunBreakfast] = useState("")
  const [sunLunch, setsunLunch] = useState("")
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
    if (week % 2 === 0) {   //week is odd
      setmonBreakfast('Fried Egg')
      setmonLunch('Aluu Matar')
      setmonDinner('Chicken Roast + Chana Daal + Raita')
      settueBreakfast('Naan Channa')
      settueLunch('Kari Pakora + Rice')
      settueDinner('Beef Pulao + Aluu Cutlets')
      setwedBreakfast('Paratha + Omellete')
      setwedLunch('Mash Daal + Salad')
      setwedDinner('Chicken Karahi + Custard')
      setthursBreakfast('Bread Butter Jam')
      setthursLunch('Aluu Palak')
      setthursDinner('Biryani')
      setfriBreakfast('Egg tomato Onion')
      setfriLunch('Daal Chawal (Yellow)')
      setfriDinner('Beef Daleem')
      setsatBreakfast('Aluu paratha')
      setsatLunch('Bhindi')
      setsatDinner('Beef Chapli kabab + Daal')
      setsunBreakfast('Halwa Poori Channa')
      setsunLunch('Red Bean')
      setsunDinner('Chicken Pulao + Aluu Cutlets + Raita')
    } else {      //week is even
      setmonBreakfast('Fried Egg')
      setmonLunch('Aluu Matar')
      setmonDinner('Beef Shami Kabab + Chana Daal + Raita')
      settueBreakfast('Naan Channa')
      settueLunch('Kari Pakora + Roti')
      settueDinner('Beef Pulao + Aluu Cutlets')
      setwedBreakfast('Paratha + Aluu Bhujia')
      setwedLunch('Mash Daal + Dahi')
      setwedDinner('Chicken Karahi + Custard')
      setthursBreakfast('Bread Butter Jam')
      setthursLunch('Aluu Palak')
      setthursDinner('Biryani')
      setfriBreakfast('Egg Tomato Onion')
      setfriLunch('Daal Chawal (Black)')
      setfriDinner('Aluu beef Curry')
      setsatBreakfast('Aluu Paratha')
      setsatLunch('Bhindi')
      setsatDinner('Aluu Cutlets + Daal')
      setsunBreakfast('Halwa Poori Channa')
      setsunLunch('Red Bean')
      setsunDinner('Chicken Pulao + Aluu Cutlets + Raita')
    }
  }, [week])
  return (
    <>
      <Navbar />
      <WeekContainer monBreakfast={monBreakfast} monLunch={monLunch} satLunch={satLunch} wedBreakfast={wedBreakfast} tueLunch={tueLunch} tueBreakfast={tueBreakfast} monDinner={monDinner} tueDinner={tueDinner} wedLunch={wedLunch} wedDinner={wedDinner} thursBreakfast={thursBreakfast} thursLunch={thursLunch} thursDinner={thursDinner} friLunch={friLunch} friBreakfast={friBreakfast} friDinner={friDinner} satDinner={satDinner} satBreakfast={satBreakfast} sunDinner={sunDinner} sunLunch={sunLunch} sunBreakfast={sunBreakfast} />
      {/* <Footer /> */}
    </>
  )
}
