import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

// Helper functions to compute the className names
// These are kept outside the component to avoid redefining them on each render
function dotwClass(timestamp: any) {
  const dow = timestamp;
  if (dow === 7) return "el10";
  return ["el1", dow.toString()].join("");
}

function monthClass(month: number) {
  if (month > 7) {
    return ["el3", (month - 8).toString()].join("");
  }

  return ["el2", (month - 1).toString()].join("");
}

function dayClass(day: number) {
  if (day < 3) {
    return ["el3", (day + 4).toString()].join("");
  }

  const dayIdx = (day - 3) % 7;
  const dayRow = Math.floor((day - 3) / 7) + 4;

  return ["el", dayRow.toString(), dayIdx.toString()].join("");
}

function hourClass(hour: number) {
  if (hour < 6) {
    return ["el8", (hour + 1).toString()].join("");
  }

  const meridianHour = hour % 12;

  if (meridianHour < 6) {
    return ["el8", (meridianHour + 1).toString()].join("");
  }

  return ["el9", (meridianHour - 6).toString()].join("");
}

function minuteClass(minute: number) {
  if (minute == 0) {
    return "el96";
  }

  const minuteIdx = (minute - 1) % 7;
  const minuteRow = Math.floor((minute - 1) / 7) + 10;

  return ["el", minuteRow.toString(), minuteIdx.toString()].join("");
}

function secondClass(second: number) {
  if (second < 4) {
    return ["el18", (second + 3).toString()].join("");
  }
  const secondIdx = (second - 4) % 7;
  const secondRow = Math.floor((second - 4) / 7) + 19;

  return ["el", secondRow.toString(), secondIdx.toString()].join("");
}

function randomHexWithContrast(
  minContrast: number,
  bgColor1: string,
  bgColor2: string
) {
  function getLuminance(hex: string) {
    const rgb = parseInt(hex.slice(1), 16);
    const r = ((rgb >> 16) & 0xff) / 255;
    const g = ((rgb >> 8) & 0xff) / 255;
    const b = (rgb & 0xff) / 255;
    const a = [r, g, b].map((v) =>
      v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    );
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  }

  function contrastRatio(lum1: number, lum2: number) {
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  }

  let hex, contrast1, contrast2;
  do {
    hex = "#" + (Math.random().toString(16) + "000000").slice(2, 8);
    const lumHex = getLuminance(hex);
    const lumBg1 = getLuminance(bgColor1);
    const lumBg2 = getLuminance(bgColor2);
    contrast1 = contrastRatio(lumHex, lumBg1);
    contrast2 = contrastRatio(lumHex, lumBg2);
  } while (contrast1 < minContrast || contrast2 < minContrast);

  return hex;
}

const BlockClock: React.FC = () => {
  const hexCode = useRef<string>("#Ff1178");
  const highlighted = useRef<any[]>([]);

  const updateClassNames = () => {
    const date = new Date();

    highlighted.current.forEach((el: any) => {
      el.style.fill = null;
    });

    const classNames = [
      dotwClass(date.getDay()),
      monthClass(date.getMonth() + 1),
      dayClass(date.getDate()),
      hourClass(date.getHours()),
      minuteClass(date.getMinutes()),
      secondClass(date.getSeconds()),
    ];

    let els: any[] = [];
    classNames.forEach((className) => {
      const elements = document.querySelectorAll(`.${className}`);
      elements.forEach((element: any) => {
        if (element) {
          element.style.fill = hexCode.current;
          els.push(element);
        }
      });
    });
    highlighted.current = els;
  };

  useEffect(() => {
    updateClassNames();

    const intervalId = setInterval(() => {
      const date = new Date();
      const secs = date.getSeconds();
      if (secs == 0 || (secs % 7) - 4 === 0) {
        hexCode.current = randomHexWithContrast(4.5, "#181A18", "#504f54");
      }

      updateClassNames();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="svg-container"
      style={{
        height: "100%",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSmooth: "antialiased",
        overscrollBehavior: "none",
        background: "#181A18",
      }}
    >
      <svg
        viewBox="0 0 1024 1024"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
      >
        <rect width="100%" height="100%" fill="#181A18" />
        <text x="0" y="72" className={styles.base}>
          <tspan className="wk el10" x="46">
            SUN
          </tspan>
          <tspan className="wk el11" x="184">
            MON
          </tspan>
          <tspan className="wk el12" x="322">
            TUE
          </tspan>
          <tspan className="wk el13" x="460">
            WED
          </tspan>
          <tspan className="wk el14" x="598">
            THU
          </tspan>
          <tspan className="wk el15" x="736">
            FRI
          </tspan>
          <tspan className="wk el16" x="874">
            SAT
          </tspan>
        </text>
        <text x="0" y="108" className={styles.base}>
          <tspan className="wk el20" x="46">
            JAN
          </tspan>
          <tspan className="wk el21" x="184">
            FEB
          </tspan>
          <tspan className="wk el22" x="322">
            MAR
          </tspan>
          <tspan className="wk el23" x="460">
            APR
          </tspan>
          <tspan className="wk el24" x="598">
            MAY
          </tspan>
          <tspan className="wk el25" x="736">
            JUN
          </tspan>
          <tspan className="wk el26" x="874">
            JUL
          </tspan>
        </text>
        <text x="0" y="144" className={styles.base}>
          <tspan className="wk el30" x="46">
            AUG
          </tspan>
          <tspan className="wk el31" x="184">
            SEP
          </tspan>
          <tspan className="wk el32" x="322">
            OCT
          </tspan>
          <tspan className="wk el33" x="460">
            NOV
          </tspan>
          <tspan className="wk el34" x="598">
            DEC
          </tspan>
          <tspan className="wk el35" x="736">
            001
          </tspan>
          <tspan className="wk el36" x="874">
            002
          </tspan>
        </text>
        <text x="0" y="180" className={styles.base}>
          <tspan className="wk el40" x="46">
            003
          </tspan>
          <tspan className="wk el41" x="184">
            004
          </tspan>
          <tspan className="wk el42" x="322">
            005
          </tspan>
          <tspan className="wk el43" x="460">
            006
          </tspan>
          <tspan className="wk el44" x="598">
            007
          </tspan>
          <tspan className="wk el45" x="736">
            008
          </tspan>
          <tspan className="wk el46" x="874">
            009
          </tspan>
        </text>
        <text x="0" y="216" className={styles.base}>
          <tspan className="wk el50" x="46">
            010
          </tspan>
          <tspan className="wk el51" x="184">
            011
          </tspan>
          <tspan className="wk el52" x="322">
            012
          </tspan>
          <tspan className="wk el53" x="460">
            013
          </tspan>
          <tspan className="wk el54" x="598">
            014
          </tspan>
          <tspan className="wk el55" x="736">
            015
          </tspan>
          <tspan className="wk el56" x="874">
            016
          </tspan>
        </text>
        <text x="0" y="252" className={styles.base}>
          <tspan className="wk el60" x="46">
            017
          </tspan>
          <tspan className="wk el61" x="184">
            018
          </tspan>
          <tspan className="wk el62" x="322">
            019
          </tspan>
          <tspan className="wk el63" x="460">
            020
          </tspan>
          <tspan className="wk el64" x="598">
            021
          </tspan>
          <tspan className="wk el65" x="736">
            022
          </tspan>
          <tspan className="wk el66" x="874">
            023
          </tspan>
        </text>
        <text x="0" y="288" className={styles.base}>
          <tspan className="wk el70" x="46">
            024
          </tspan>
          <tspan className="wk el71" x="184">
            025
          </tspan>
          <tspan className="wk el72" x="322">
            026
          </tspan>
          <tspan className="wk el73" x="460">
            027
          </tspan>
          <tspan className="wk el74" x="598">
            028
          </tspan>
          <tspan className="wk el75" x="736">
            029
          </tspan>
          <tspan className="wk el76" x="874">
            030
          </tspan>
        </text>
        <text x="0" y="324" className={styles.base}>
          <tspan className="wk el80" x="46">
            031
          </tspan>
          <tspan className="wk el81" x="184">
            012
          </tspan>
          <tspan className="wk el82" x="322">
            001
          </tspan>
          <tspan className="wk el83" x="460">
            002
          </tspan>
          <tspan className="wk el84" x="598">
            003
          </tspan>
          <tspan className="wk el85" x="736">
            004
          </tspan>
          <tspan className="wk el86" x="874">
            005
          </tspan>
        </text>
        <text x="0" y="360" className={styles.base}>
          <tspan className="wk el90" x="46">
            006
          </tspan>
          <tspan className="wk el91" x="184">
            007
          </tspan>
          <tspan className="wk el92" x="322">
            008
          </tspan>
          <tspan className="wk el93" x="460">
            009
          </tspan>
          <tspan className="wk el94" x="598">
            010
          </tspan>
          <tspan className="wk el95" x="736">
            011
          </tspan>
          <tspan className="wk el96" x="874">
            000
          </tspan>
        </text>
        <text x="0" y="396" className={styles.base}>
          <tspan className="wk el100" x="46">
            001
          </tspan>
          <tspan className="wk el101" x="184">
            002
          </tspan>
          <tspan className="wk el102" x="322">
            003
          </tspan>
          <tspan className="wk el103" x="460">
            004
          </tspan>
          <tspan className="wk el104" x="598">
            005
          </tspan>
          <tspan className="wk el105" x="736">
            006
          </tspan>
          <tspan className="wk el106" x="874">
            007
          </tspan>
        </text>
        <text x="0" y="432" className={styles.base}>
          <tspan className="wk el110" x="46">
            008
          </tspan>
          <tspan className="wk el111" x="184">
            009
          </tspan>
          <tspan className="wk el112" x="322">
            010
          </tspan>
          <tspan className="wk el113" x="460">
            011
          </tspan>
          <tspan className="wk el114" x="598">
            012
          </tspan>
          <tspan className="wk el115" x="736">
            013
          </tspan>
          <tspan className="wk el116" x="874">
            014
          </tspan>
        </text>
        <text x="0" y="468" className={styles.base}>
          <tspan className="wk el120" x="46">
            015
          </tspan>
          <tspan className="wk el121" x="184">
            016
          </tspan>
          <tspan className="wk el122" x="322">
            017
          </tspan>
          <tspan className="wk el123" x="460">
            018
          </tspan>
          <tspan className="wk el124" x="598">
            019
          </tspan>
          <tspan className="wk el125" x="736">
            020
          </tspan>
          <tspan className="wk el126" x="874">
            021
          </tspan>
        </text>
        <text x="0" y="504" className={styles.base}>
          <tspan className="wk el130" x="46">
            022
          </tspan>
          <tspan className="wk el131" x="184">
            023
          </tspan>
          <tspan className="wk el132" x="322">
            024
          </tspan>
          <tspan className="wk el133" x="460">
            025
          </tspan>
          <tspan className="wk el134" x="598">
            026
          </tspan>
          <tspan className="wk el135" x="736">
            027
          </tspan>
          <tspan className="wk el136" x="874">
            028
          </tspan>
        </text>
        <text x="0" y="540" className={styles.base}>
          <tspan className="wk el140" x="46">
            029
          </tspan>
          <tspan className="wk el141" x="184">
            030
          </tspan>
          <tspan className="wk el142" x="322">
            031
          </tspan>
          <tspan className="wk el143" x="460">
            032
          </tspan>
          <tspan className="wk el144" x="598">
            033
          </tspan>
          <tspan className="wk el145" x="736">
            034
          </tspan>
          <tspan className="wk el146" x="874">
            035
          </tspan>
        </text>
        <text x="0" y="576" className={styles.base}>
          <tspan className="wk el150" x="46">
            036
          </tspan>
          <tspan className="wk el151" x="184">
            037
          </tspan>
          <tspan className="wk el152" x="322">
            038
          </tspan>
          <tspan className="wk el153" x="460">
            039
          </tspan>
          <tspan className="wk el154" x="598">
            040
          </tspan>
          <tspan className="wk el155" x="736">
            041
          </tspan>
          <tspan className="wk el156" x="874">
            042
          </tspan>
        </text>
        <text x="0" y="612" className={styles.base}>
          <tspan className="wk el160" x="46">
            043
          </tspan>
          <tspan className="wk el161" x="184">
            044
          </tspan>
          <tspan className="wk el162" x="322">
            045
          </tspan>
          <tspan className="wk el163" x="460">
            046
          </tspan>
          <tspan className="wk el164" x="598">
            047
          </tspan>
          <tspan className="wk el165" x="736">
            048
          </tspan>
          <tspan className="wk el166" x="874">
            049
          </tspan>
        </text>
        <text x="0" y="648" className={styles.base}>
          <tspan className="wk el170" x="46">
            050
          </tspan>
          <tspan className="wk el171" x="184">
            051
          </tspan>
          <tspan className="wk el172" x="322">
            052
          </tspan>
          <tspan className="wk el173" x="460">
            053
          </tspan>
          <tspan className="wk el174" x="598">
            054
          </tspan>
          <tspan className="wk el175" x="736">
            055
          </tspan>
          <tspan className="wk el176" x="874">
            056
          </tspan>
        </text>
        <text x="0" y="684" className={styles.base}>
          <tspan className="wk el180" x="46">
            057
          </tspan>
          <tspan className="wk el181" x="184">
            058
          </tspan>
          <tspan className="wk el182" x="322">
            059
          </tspan>
          <tspan className="wk el183" x="460">
            000
          </tspan>
          <tspan className="wk el184" x="598">
            001
          </tspan>
          <tspan className="wk el185" x="736">
            002
          </tspan>
          <tspan className="wk el186" x="874">
            003
          </tspan>
        </text>
        <text x="0" y="720" className={styles.base}>
          <tspan className="wk el190" x="46">
            004
          </tspan>
          <tspan className="wk el191" x="184">
            005
          </tspan>
          <tspan className="wk el192" x="322">
            006
          </tspan>
          <tspan className="wk el193" x="460">
            007
          </tspan>
          <tspan className="wk el194" x="598">
            008
          </tspan>
          <tspan className="wk el195" x="736">
            009
          </tspan>
          <tspan className="wk el196" x="874">
            010
          </tspan>
        </text>
        <text x="0" y="756" className={styles.base}>
          <tspan className="wk el200" x="46">
            011
          </tspan>
          <tspan className="wk el201" x="184">
            012
          </tspan>
          <tspan className="wk el202" x="322">
            013
          </tspan>
          <tspan className="wk el203" x="460">
            014
          </tspan>
          <tspan className="wk el204" x="598">
            015
          </tspan>
          <tspan className="wk el205" x="736">
            016
          </tspan>
          <tspan className="wk el206" x="874">
            017
          </tspan>
        </text>
        <text x="0" y="792" className={styles.base}>
          <tspan className="wk el210" x="46">
            018
          </tspan>
          <tspan className="wk el211" x="184">
            019
          </tspan>
          <tspan className="wk el212" x="322">
            020
          </tspan>
          <tspan className="wk el213" x="460">
            021
          </tspan>
          <tspan className="wk el214" x="598">
            022
          </tspan>
          <tspan className="wk el215" x="736">
            023
          </tspan>
          <tspan className="wk el216" x="874">
            024
          </tspan>
        </text>
        <text x="0" y="828" className={styles.base}>
          <tspan className="wk el220" x="46">
            025
          </tspan>
          <tspan className="wk el221" x="184">
            026
          </tspan>
          <tspan className="wk el222" x="322">
            027
          </tspan>
          <tspan className="wk el223" x="460">
            028
          </tspan>
          <tspan className="wk el224" x="598">
            029
          </tspan>
          <tspan className="wk el225" x="736">
            030
          </tspan>
          <tspan className="wk el226" x="874">
            031
          </tspan>
        </text>
        <text x="0" y="864" className={styles.base}>
          <tspan className="wk el230" x="46">
            032
          </tspan>
          <tspan className="wk el231" x="184">
            033
          </tspan>
          <tspan className="wk el232" x="322">
            034
          </tspan>
          <tspan className="wk el233" x="460">
            035
          </tspan>
          <tspan className="wk el234" x="598">
            036
          </tspan>
          <tspan className="wk el235" x="736">
            037
          </tspan>
          <tspan className="wk el236" x="874">
            038
          </tspan>
        </text>
        <text x="0" y="900" className={styles.base}>
          <tspan className="wk el240" x="46">
            039
          </tspan>
          <tspan className="wk el241" x="184">
            040
          </tspan>
          <tspan className="wk el242" x="322">
            041
          </tspan>
          <tspan className="wk el243" x="460">
            042
          </tspan>
          <tspan className="wk el244" x="598">
            043
          </tspan>
          <tspan className="wk el245" x="736">
            044
          </tspan>
          <tspan className="wk el246" x="874">
            045
          </tspan>
        </text>
        <text x="0" y="936" className={styles.base}>
          <tspan className="wk el250" x="46">
            046
          </tspan>
          <tspan className="wk el251" x="184">
            047
          </tspan>
          <tspan className="wk el252" x="322">
            048
          </tspan>
          <tspan className="wk el253" x="460">
            049
          </tspan>
          <tspan className="wk el254" x="598">
            050
          </tspan>
          <tspan className="wk el255" x="736">
            051
          </tspan>
          <tspan className="wk el256" x="874">
            052
          </tspan>
        </text>
        <text x="0" y="972" className={styles.base}>
          <tspan className="wk el260" x="46">
            053
          </tspan>
          <tspan className="wk el261" x="184">
            054
          </tspan>
          <tspan className="wk el262" x="322">
            055
          </tspan>
          <tspan className="wk el263" x="460">
            056
          </tspan>
          <tspan className="wk el264" x="598">
            057
          </tspan>
          <tspan className="wk el265" x="736">
            058
          </tspan>
          <tspan className="wk el266" x="874">
            059
          </tspan>
        </text>
      </svg>
    </div>
  );
};

export default BlockClock;
