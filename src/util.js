import { v4 as uuidv4 } from "uuid";
import RX from "./audio/RX.mp3";

function chillhop() {
    return [
      {
        name: "RX-64",
        cover: "https://e.snmc.io/i/1200/s/733515804fdcd9c99d0211f45c30e752/7574267",
        artiste: "Cruel santino",
        audio:RX,
        id: uuidv4 (),
        active: true, 
        color: [],
      },
    ];
}

export default chillhop;