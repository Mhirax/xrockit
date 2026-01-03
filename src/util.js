import { v4 as uuidv4 } from "uuid";
import RX from "./audio/RX.mp3";
import BMF from "./audio/BMF.mp3";
import happyHour from "./audio/happyHour.mp3";
import Lie from "./audio/Lie.mp3"
import Lockdown from "./audio/Lockdown.mp3"
import rapidFire from "./audio/rapidFire.mp3"
import themBellyFull from "./audio/themBellyFull.mp3"
import W from "./audio/W.mp3"
import wait from "./audio/wait.mp3"

function chillhop() {
    return [
      {
        name: "RX-64",
        cover:
          "https://e.snmc.io/i/1200/s/733515804fdcd9c99d0211f45c30e752/7574267",
        artiste: "Cruel santino,Krisirie",
        audio: RX,
        id: uuidv4(),
        active: false,
      },
      {
        name: "BMF",
        cover:
          "https://tse3.mm.bing.net/th/id/OIP.EBBy6fgl0OLVm_Cfkpw_YgHaHa?pid=Api&P=0&h=220 ",
        artiste: "Sarz ft Bryon messia,fireboy",
        audio: BMF,
        id: uuidv4(),
        active: true,
      },
      {
        name: "Happy hour",
        cover:
          "https://tse2.mm.bing.net/th/id/OIP.xJnS9b6uPjM4Lvu7v62XtgHaF_?pid=Api&P=0&h=220",
        artiste: "Odunsi",
        audio: happyHour,
        id: uuidv4(),
        active: false,
      },
      {
        name: "Lie",
        cover:
          " https://tse4.mm.bing.net/th/id/OIP.1RZzMLQKfZ61cH32Fy_BzAHaEK?pid=Api&P=0&h=220",
        artiste: "Shallou,Riah ",
        audio: Lie,
        id: uuidv4(),
        active: false,
      },
      {
        name: "Lockdown",
        cover:
          " https://tse2.mm.bing.net/th/id/OIP.cOJv_N0uluElmZ9VlNZZXgHaHa?pid=Api&P=0&h=220",
        artiste: "Koffee",
        audio: Lockdown,
        id: uuidv4(),
        active: false,
      },
      {
        name: "Rapid fire",
        cover:
          "https://e.snmc.io/i/1200/s/733515804fdcd9c99d0211f45c30e752/7574267 ",
        artiste: "Cruel santino,Krisirie",
        audio: rapidFire,
        id: uuidv4(),
        active: false,
      },
      {
        name: "Them belly full",
        cover:
          "https://tse4.mm.bing.net/th/id/OIP.U8euAhySHn1TqR-ffkMvEgHaHa?pid=Api&P=0&h=220 ",
        artiste: "Bob marley ft rema",
        audio: themBellyFull,
        id: uuidv4(),
        active: false,
      },
      {
        name: "W",
        cover:
          "https://tse3.mm.bing.net/th/id/OIP.IcD5r84muUrk8byGdAfx2QHaFj?pid=Api&P=0&h=220 ",
        artiste: "Gunna ft koffee",
        audio: W,
        id: uuidv4(),
        active: false,
      },
      {
        name: "wait",
        cover:
          "https://tse2.mm.bing.net/th/id/OIP.FRhLyVgmKLfmwXODCYCafQHaEK?pid=Api&P=0&h=220 ",
        artiste: "Yarden",
        audio: wait,
        id: uuidv4(),
        active: false,
      },
    ];
}

export default chillhop;