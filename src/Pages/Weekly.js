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
    if (week % 2 !== 0) {   //week is odd
      setmonBreakfast('Beef Shami Kabab + Chana Daal + Raita')
      setmonLunch('Beef Shami Kabab + Chana Daal + Raita')
      setmonDinner('Beef Shami Kabab + Chana Daal + Raita')
      settueBreakfast('Kari Pakora + Rice')
      settueLunch('Kari Pakora + Rice')
      settueDinner('Beef Pulao + Aluu Cutlets')
      setwedBreakfast('Paratha + Omellete')
      setwedLunch('Mash Daal + Salad')
      setwedDinner('Chicken Karahi + Custard')
      setthursBreakfast('Bread Butter Jam')
      setthursLunch('Aluu Palak')
      setthursDinner('Biryani')
      setfriBreakfast('Daal Chawal (Yellow)')
      setfriLunch('Daal Chawal (Yellow)')
      setfriDinner('Beef Daleem')
      setsatBreakfast('Aluu Gobi')
      setsatLunch('Aluu Gobi')
      setsatDinner('Beef Chapli kabab + Daal')
      setsunBreakfast('Chicken Pulao + Aluu Cutlets + Raita')
      setsunLunch('Chicken Pulao + Aluu Cutlets + Raita')
      setsunDinner('Chicken Pulao + Aluu Cutlets + Raita')

      // Ramzan 
      // console.log("week is odd");

      // setmonBreakfast('Daal Mash')
      // setmonLunch('Chicken vegetable Roll + Mix Pakora + Rooh Afza')
      // setmonDinner('Chicken Daleem + Naan + Tea')
      // settueBreakfast('White Channa')
      // settueLunch('Aluu Samosa + Mix Pakora + Jaame Shireen')
      // settueDinner('Aluu Beef Curry + Tea')
      // setwedBreakfast('Chicken Curry')
      // setwedLunch('Channa Chaat + Mix Pakora + Rooh Afza')
      // setwedDinner('Daal Mash + Tea')
      // setthursBreakfast('Aluu Bhujia')
      // setthursLunch('Chicken Vegatable Roll + Mix Pakora + Jaame Shireen')
      // setthursDinner('Biryani + Green Tea')
      // setfriBreakfast('Daal Channa')
      // setfriLunch('Dahi Bhallay + Mix Pakora + Rooh Afza')
      // setfriDinner('Aluu Gajar Matar + Tea')
      // setsatBreakfast('Onion Tomato Egg')
      // setsatLunch('Aluu Samosa + Mix Pakora + Jaame Shireen')
      // setsatDinner('Chicken Kofta + Tea')
      // setsunBreakfast('Aluu Anda Curry')
      // setsunLunch('Lobia With Channa Chaat + Mix Pakora + Rooh Afza')
      // setsunDinner('Chicken Pulao + Raita + Tea')
    } else {      //week is even
      setmonBreakfast('Beef Shami Kabab + Chana Daal + Raita')
      setmonLunch('Beef Shami Kabab + Chana Daal + Raita')
      setmonDinner('Beef Shami Kabab + Chana Daal + Raita')
      settueBreakfast('Kari Pakora + Rice')
      settueLunch('Kari Pakora + Rice')
      settueDinner('Beef Pulao + Aluu Cutlets')
      setwedBreakfast('Paratha + Omellete')
      setwedLunch('Mash Daal + Salad')
      setwedDinner('Chicken Karahi + Custard')
      setthursBreakfast('Bread Butter Jam')
      setthursLunch('Aluu Palak')
      setthursDinner('Biryani')
      setfriBreakfast('Daal Chawal (Yellow)')
      setfriLunch('Daal Chawal (Yellow)')
      setfriDinner('Beef Daleem')
      setsatBreakfast('Aluu Gobi')
      setsatLunch('Aluu Gobi')
      setsatDinner('Beef Chapli kabab + Daal')
      setsunBreakfast('Chicken Pulao + Aluu Cutlets + Raita')
      setsunLunch('Chicken Pulao + Aluu Cutlets + Raita')
      setsunDinner('Chicken Pulao + Aluu Cutlets + Raita')

      //Ramzan
      // console.log("week is even");
      // setmonBreakfast('Daal Mash')
      // setmonLunch('Chicken vegetable Roll + Mix Pakora + Rooh Afza')
      // setmonDinner('Chicken Daleem + Naan + Tea')
      // settueBreakfast('White Channa')
      // settueLunch('Aluu Samosa + Mix Pakora + Jaame Shireen')
      // settueDinner('Aluu Beef Curry + Tea')
      // setwedBreakfast('Chicken Curry')
      // setwedLunch('Channa Chaat + Mix Pakora + Rooh Afza')
      // setwedDinner('Daal Mash + Tea')
      // setthursBreakfast('Aluu Bhujia')
      // setthursLunch('Chicken Vegatable Roll + Mix Pakora + Jaame Shireen')
      // setthursDinner('Biryani + Green Tea')
      // setfriBreakfast('Daal Channa')
      // setfriLunch('Dahi Bhallay + Mix Pakora + Rooh Afza')
      // setfriDinner('Aluu Gajar Matar + Tea')
      // setsatBreakfast('Onion Tomato Egg')
      // setsatLunch('Aluu Samosa + Mix Pakora + Jaame Shireen')
      // setsatDinner('Chicken Kofta + Tea')
      // setsunBreakfast('Aluu Anda Curry')
      // setsunLunch('Lobia With Channa Chaat + Mix Pakora + Rooh Afza')
      // setsunDinner('Chicken Pulao + Raita + Tea')
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
