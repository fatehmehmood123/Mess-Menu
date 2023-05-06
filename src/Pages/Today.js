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
    //Ramzan
    // if (week % 2 !== 0) {   //week is odd
    //   if (currentDate.getDay() === 0) {    //Sunday  odd
    //     setbreakfast("Aluu Anda Curry")
    //     setlunch("Lobia With Channa Chaat + Mix Pakora + Rooh Afza")
    //     setdinner("Chicken Pulao + Raita + Tea")
    //   }
    //   if (currentDate.getDay() === 1) {    //Monday odd
    //     setbreakfast("Daal Mash")
    //     setlunch("Chicken vegetable Roll + Mix Pakora + Rooh Afza")
    //     setdinner("Chicken Daleem + Naan + Tea")
    //   }
    //   if (currentDate.getDay() === 2) {    //Tuesday odd
    //     setbreakfast("White Channa")
    //     setlunch("Aluu Samosa + Mix Pakora + Jaame Shireen")
    //     setdinner("Aluu Beef Curry + Tea")
    //   }
    //   if (currentDate.getDay() === 3) {     //Wednesday odd
    //     setbreakfast("Chicken Curry")
    //     setlunch("Channa Chaat + Mix Pakora + Rooh Afza")
    //     setdinner("Daal Mash + tea")
    //   }
    //   if (currentDate.getDay() === 4) {     //Thursday odd
    //     setbreakfast("Aluu Bhujia")
    //     setlunch("Chicken Vegetable Roll + Mix Pakora + Jaame Shireen")
    //     setdinner("Chicken Biryani + Raita + Cold Drinks + Green Tea")
    //   }
    //   if (currentDate.getDay() === 5) {     //Friday odd
    //     setbreakfast("Daal Channa")
    //     setlunch("Dahi Bhallay + Mix Pakora + Rooh Afza")
    //     setdinner("Aluu Gajar Matar + Tea")

    //   }
    //   if (currentDate.getDay() === 6) {     //Saturday odd
    //     setbreakfast("Onion Tomato Egg")
    //     setlunch("Aluu Samosa + Mix Pakora + Jaame Shireen")
    //     setdinner("Chicken Kofta + Tea")
    //   }
    // } else {      //week is even
    //   if (currentDate.getDay() === 0) {    //Sunday  odd
    //     setbreakfast("Aluu Anda Curry")
    //     setlunch("Lobia With Channa Chaat + Mix Pakora + Rooh Afza")
    //     setdinner("Chicken Pulao + Raita + Tea")
    //   }
    //   if (currentDate.getDay() === 1) {    //Monday odd
    //     setbreakfast("Daal Mash")
    //     setlunch("Chicken vegetable Roll + Mix Pakora + Rooh Afza")
    //     setdinner("Chicken Daleem + Naan + Tea")
    //   }
    //   if (currentDate.getDay() === 2) {    //Tuesday odd
    //     setbreakfast("White Channa")
    //     setlunch("Aluu Samosa + Mix Pakora + Jaame Shireen")
    //     setdinner("Aluu Beef Curry + Tea")
    //   }
    //   if (currentDate.getDay() === 3) {     //Wednesday odd
    //     setbreakfast("Chicken Curry")
    //     setlunch("Channa Chaat + Mix Pakora + Rooh Afza")
    //     setdinner("Daal Mash + tea")
    //   }
    //   if (currentDate.getDay() === 4) {     //Thursday odd
    //     setbreakfast("Aluu Bhujia")
    //     setlunch("Chicken Vegetable Roll + Mix Pakora + Jaame Shireen")
    //     setdinner("Biryani + Green Tea")
    //   }
    //   if (currentDate.getDay() === 5) {     //Friday odd
    //     setbreakfast("Daal Channa")
    //     setlunch("Dahi Bhallay + Mix Pakora + Rooh Afza")
    //     setdinner("Aluu Gajar Matar + Tea")

    //   }
    //   if (currentDate.getDay() === 6) {     //Saturday odd
    //     setbreakfast("Onion Tomato Egg")
    //     setlunch("Aluu Samosa + Mix Pakora + Jaame Shireen")
    //     setdinner("Chicken Kofta + Tea")
    //   }
    // }
    //Normal Days
    if (week % 2 === 0) {   //week is odd
      if (currentDate.getDay() === 0) {    //Sunday  odd
        setbreakfast("Halwa poori + Channay")
        setlunch("Red Beans")
        setdinner("Chicken Pulao + Aluu Cutlets + Raita")
      }
      if (currentDate.getDay() === 1) {    //Monday odd
        setbreakfast("Paratha + Fried Egg")
        setlunch("Aluu Mattar")
        setdinner("Beef Shami Kabab + Chana Daal + Raita")
      }
      if (currentDate.getDay() === 2) {    //Tuesday odd
        setbreakfast("Naan Channa")
        setlunch("Kari Pakora + Rice")
        setdinner("Beef Pulao + Aluu Cutlets")
      }
      if (currentDate.getDay() === 3) {     //Wednesday odd
        setbreakfast("Paratha + Aluu Bhujia")
        setlunch("Mash Daal + Salad")
        setdinner("Chicken Karahi + Custard")
      }
      if (currentDate.getDay() === 4) {     //Thursday odd
        setbreakfast("Bread + Butter + Jam")
        setlunch("Aluu Palak")
        setdinner("Biryani + Cold Drinks")
      }
      if (currentDate.getDay() === 5) {     //Friday odd
        setbreakfast("Paratha + Egg Tomato Onion")
        setlunch("Daal Chawal (Black)")
        setdinner("Aluu Beef Curry")
      }
      if (currentDate.getDay() === 6) {     //Saturday odd
        setbreakfast("Aluu Paratha")
        setlunch("Bhindi")
        setdinner("Aluu Cutlets + Daal")
      }
    } else {      //week is even
      if (currentDate.getDay() === 0) {    //Sunday  even
        setbreakfast("Halwa poori + Channay")
        setlunch("Red Beans")
        setdinner("Chicken Pulao + Aluu Cutlets + Raita")
      }
      if (currentDate.getDay() === 1) {    //Monday even
        setbreakfast("Paratha + Fried Egg")
        setlunch("Aluu Matar")
        setdinner("Chicken Roast + Chana Daal + Raita")
      }
      if (currentDate.getDay() === 2) {    //Tuesday even
        setbreakfast("Naan Channa")
        setlunch("Kari Pakora + Roti")
        setdinner("Beef Pulao + Aluu Cutlets")
      }
      if (currentDate.getDay() === 3) {     //Wednesday even
        setbreakfast("Paratha + Omellete")
        setlunch("Mash Daal + Yoghurt")
        setdinner("Chicken Karahi + Custard")
      }
      if (currentDate.getDay() === 4) {     //Thursday even
        setbreakfast("Bread + Butter + Jam")
        setlunch("Aluu Palak")
        setdinner("Biryani + Cold Drinks")
      }
      if (currentDate.getDay() === 5) {     //Friday even
        setbreakfast("Paratha + Egg Tomato Onion")
        setlunch("Daal Chawal (Yellow)")
        setdinner("Beef Daleem")
      }
      if (currentDate.getDay() === 6) {     //Saturday even
        setbreakfast("Aluu Paratha")
        setlunch("Bhindi")
        setdinner("Beef Chapli kabab + Daal")
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
