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
        lyrics: `[Verse 1]
In the jungle, waiting for the sun
The adventure has begun
Mandy leading through the trees
Feel the rhythm in the breeze

[Chorus]
Mandy and the jungle, hand in hand
Running wild across the land
Every step a new surprise
Magic shining in their eyes

[Verse 2]
Through the vines and canopy
Spirits wild and free
Echoes of a distant drum
Calling out to overcome

[Chorus]
Mandy and the jungle, hand in hand
Running wild across the land
Every step a new surprise
Magic shining in their eyes

[Outro]
Oh-oh-oh, Mandy
Oh-oh-oh, the jungle
Mandy and the jungle forever`,
      },
      {
        name: "BMF",
        cover: "../images/BMF.png",
        artiste: "Sarz ft Bryon messia,fireboy",
        audio: BMF,
        id: uuidv4(),
        active: true,
      },
      {
        name: "Happy hour",
        cover: "../images/happyHour.png",
        artiste: "Odunsi",
        audio: happyHour,
        id: uuidv4(),
        active: false,
      },
      {
        name: "Lie",
        cover: "../images/Lie.png",
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
        cover: "../images/koffee.png",
        artiste: "Gunna ft koffee",
        audio: W,
        id: uuidv4(),
        active: false,
      },
      {
        name: "wait",
        cover: "../images/wait.png",
        artiste: "Yarden",
        audio: wait,
        id: uuidv4(),
        active: false,
      },
    ];
}

export default chillhop;