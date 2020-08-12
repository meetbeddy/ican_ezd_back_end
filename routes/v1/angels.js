const express = require("express");
const router = express.Router();


router.get("/engels", (req, res) => {
  res.json({
    logoURL: "https://i.ibb.co/VwbM4YJ/logo.png",
    flierURL: "https://i.ibb.co/5L4GXZ5/flyerr.jpg",
    landingPage: {
      banner: [
        {
          venue: "The Conference Will Now Hold Virtually",
          theme: "PREPARING FOR THE 4TH INDUSTRIAL REVOLUTION IN NIGERIA",
          year: "3RD SOUTHERN ZONAL ACCOUNTANTS' CONFERENCE.",
          dateNTime: "Wednesday 7th - Thursday 8th October, 2020",
          imageURL: "https://i.ibb.co/J5Sgzn8/banner1.jpg"
        },
        {
          venue: "The Conference Will Now Hold Virtually",
          theme: "PREPARING FOR THE 4TH INDUSTRIAL REVOLUTION IN NIGERIA",
          year: "3RD SOUTHERN ZONAL ACCOUNTANTS' CONFERENCE.",
          dateNTime: "Wednesday 7th - Thursday 8th October, 2020",
          imageURL: "https://i.ibb.co/h8h5JTv/banner2.jpg"
        },
        {
          venue: "The Conference Will Now Hold Virtually",
          theme: "",
          year: "Glimpse Of The Conference venue",
          dateNTime: "Wednesday 7th - Thursday 8th October, 2020",
          imageURL: "https://i.ibb.co/Ny06twZ/banner3.jpg"
        },
        {
          venue: "The Conference Will Now Hold Virtually",
          theme: "",
          year: "Glimpse Of The Conference venue",
          dateNTime: "Wednesday 7th - Thursday 8th October, 2020",
          imageURL: "https://i.ibb.co/n1r48mx/banner4.jpg"
        },
        // {
        //   venue: "The Conference Will Now Hold Virtually",
        //   theme: "WEALTH CREATION AND SUSTAINABLE DEVELOPMENT IN NIGERIA",
        //   year: "2ND SOUTHERN ZONAL ACCOUNTANTS' CONFERENCE.",
        //   dateNTime: "8th April - 11th April, 2019",
        //   imageURL: "assets/images/hero_area/banner5.jpg"
        // }
      ],
      about: {
        year: "2020",
        theme: "PREPARING FOR THE 4TH INDUSTRIAL REVOLUTION IN NIGERIA",
        details: [
          {
            detail:
              "It is our pleasure to welcome you to the 3rd Southern Zonal Districts Conference of the Institute of Chartered Accountants of Nigeria (ICAN). The Institute of Chartered Accountants of Nigeria (ICAN) is Nigeria’s foremost professional accountancy body established by Act of Parliament No. 15 of 1965.  The Institute established Zonal Districts comprising of District Societies in the respective zones for the effective coordination of the professional activities of Chartered Accountants in all parts of the country in order to also enhance their frontier of knowledge in the field of accounting and other related disciplines. The Institute’s continued drive for Excellence prompted the inception and subsequent sustenance of this Annual conference."
          },
          {
            detail:
              "For the year 2020, the conference theme is “Preparing for the 4th Industrial Revolution in Nigeria”. There are also two captivating sub-themes slated for Days 2 & 3 of the conference."
          },
          {
            detail:
              "The conference is organized on a non-residential basis and attracts a flat-rate of N30,000 for members and N35,000 for non-members and attracts a Mandatory Continuous Professional Education of 16 hours for Members of the Institute of Chartered Accountants of Nigeria."
          },
          {
            detail:
              "The Conference Will Now Hold Virtually"
          }
        ]
      },
      speakers: {
        theme: "PREPARING FOR THE 4TH INDUSTRIAL REVOLUTION IN NIGERIA",
        speakers: [
          // {
          //   name: "DR. TONY O ELUMELU, CON",
          //   position: "CEO, Zenith Bank",
          //   imageURL: "assets/images/speakers/speaker1.jpg",
          //   details: [
          //     {
          //       detail:
          //         "a visionary entrepreneur and a philanthropist. Born, raised and educated in Africa, Mr. Elumelu has been responsible for creating businesses across the continent, in sectors critical to Africa’s economic development.Tony O. Elumelu is a visionary entrepreneur and a philanthropist. Born, raised and educated in Africa, Mr. Elumelu has been responsible for creating businesses across the continent, in sectors critical to Africa’s economic development"
          //     }
          //   ],
          //   sessions: [
          //     {
          //       day: "Day 1",
          //       from: "10:30",
          //       to: "11:30",
          //       period: "AM",
          //       topic: "Marketing Matters"
          //     }
          //   ]
          // },{
          //   name: "DR. TONY O ELUMELU, CON",
          //   position: "CEO, Zenith Bank",
          //   imageURL: "assets/images/speakers/speaker2.jpg",
          //   details: [
          //     {
          //       detail:
          //         "a visionary entrepreneur and a philanthropist. Born, raised and educated in Africa, Mr. Elumelu has been responsible for creating businesses across the continent, in sectors critical to Africa’s economic development.Tony O. Elumelu is a visionary entrepreneur and a philanthropist. Born, raised and educated in Africa, Mr. Elumelu has been responsible for creating businesses across the continent, in sectors critical to Africa’s economic development"
          //     }
          //   ],
          //   sessions: [
          //     {
          //       day: "Day 1",
          //       from: "10:30",
          //       to: "11:30",
          //       period: "AM",
          //       topic: "Marketing Matters"
          //     }
          //   ]
          // }
        ]
      },
      schedules: {
        days: [
          // {
          //   day: "Day 01",
          //   date: "Monday",
          //   schedule: [
          //     {
          //       time: "9.30 - 10.30 AM",
          //       session: "Arrival",
          //       description: "Arival And Registration of Guest",
          //       imageURL: null
          //     },
          //     {
          //       time: "9.30 - 10.30 AM",
          //       session: "Depature",
          //       description: "Arival And Registration of Guest",
          //       imageURL: null
          //     }
          //   ]
          // },
          // {
          //   day: "Day 02",
          //   date: "Tuesday",
          //   schedule: [
          //     {
          //       time: "9.30 - 10.30 AM",
          //       session: "Arrival",
          //       description: "Arival And Registration of Guest"
          //     }
          //   ]
          // },
          // {
          //   day: "Day 03",
          //   date: "Wednesday",
          //   schedule: [
          //     {
          //       time: "9.30 - 10.30 AM",
          //       session: "Arrival",
          //       description: "Arival And Registration of Guest"
          //     }
          //   ]
          // }
        ]
      },
      travelInfo: {
        theme: "PREPARING FOR THE 4TH INDUSTRIAL REVOLUTION IN NIGERIA",
        venue:
          "The 3rd ICAN Southern Zonal Conference will be holding at the heart of The The Conference Will Now Hold Virtually",
        transport:
          "Attendees who would not be staying around the conference venue are advised to include a little extra budget for their daily transport.",
        hotel:
          "The conference is organized on a non-residential basis. Affordable accommodations are however available within and around the Conference venue."
      },

    },
    pastPresident: {
      AAN: [
        {
          name: "Akintola WILLIAMS, CBE, CFR, B.Com., FCA",
          year: "1960 – 61"
        },
        {
          name: "Akintola WILLIAMS, CBE, CFR, B.Com., FCA",
          year: "1961 – 62"
        },
        {
          name: "Frank Cuthbert Oladipo COKER, CFR, B.Com., FCA (Deceased)",
          year: "1962 – 63"
        },
        {
          name: "Frank Cuthbert Oladipo COKER, CFR, B.Com., FCA (Deceased)",
          year: "1963 – 64"
        },
        {
          name: "Frank Cuthbert Oladipo COKER, CFR, B.Com., FCA (Deceased)",
          year: "1964 – 65"
        },
        {
          name: "Frank Cuthbert Oladipo COKER, CFR, B.Com., FCA (Deceased)",
          year: "1964 – 65"
        }
      ],
      ICAN: [
        {
          name: "Frank Cuthbert Oladipo COKER, CFR, B.Com., FCA (Deceased)",
          year: "1965 – 66"
        },
        {
          name: "Ephraim Adekunle OSINDERO, (Otunba) MON, FCA (Deceased)",
          year: ""
        },
        {
          name: "Herbert William BOND, FCA (Deceased)",
          year: "1966 – 67"
        },
        {
          name: "Zacchaeus Oludayo OSOSANYA, FCA (Deceased)",
          year: "1967 – 68"
        },
        {
          name: "Alfred EHREN, FCA",
          year: "1968 – 69"
        },
        {
          name: "Felix Bankole CARDOSO, FCA (Deceased)",
          year: "1969 – 70"
        },
        {
          name: "Emmanuel Ayodele ODUKOYA, (Archdeacon), FCA, (Deceased)",
          year: "1970 – 71"
        },
        {
          name: "Musiliu Olaiya ANIBABA, (Chief), FCA",
          year: "1971 – 72"
        },
        {
          name: "Vincent Obajimi Adebisi OGUNBA, FCA, (Deceased)",
          year: "1973 – 74"
        },
        {
          name: "Julius Akinyokun OWOSENI, (Chief) FCA, (Deceased)",
          year: "1974 – 75"
        },
        {
          name: "Michael Adepoju ADEYEMO, (Prof.), M.Sc., (ECONS), FCA (Deceased)",
          year: "1975 – 76"
        },
        {
          name: "Cecil Oyeniyi Olurotimi OYEDIRAN, B.Sc., (ECONS),MFR, FCA",
          year: "1976 – 77"
        },
        {
          name: "Anthony Asuquo ANI, (Chief) MON, FCA",
          year: "1977 – 78"
        },
        {
          name: "Arthur Christopher Izuegbunam MBANEFO, (Amb. Chief) (Odu III) MFR, CON, FCA",
          year: "1978 – 79"
        },
        {
          name: "Joseph Akintunde Alaba ADEBAYO, (Prince), FCA",
          year: "1979 – 80"
        },
        {
          name: "John Adepoju BALOGUN (Sir), FCA (Deceased)",
          year: "1980 – 81"
        },
        {
          name: "Idris Onaolapo SULAIMON, (Alhaji), FCA",
          year: "1981 – 82"
        },
        {
          name: "Olusola FALEYE, (Chief), FCA",
          year: "1982 – 83"
        },
        {
          name: "Dolanimi Babafemi Olabamidele OGUTUGA, FCA",
          year: "1983 – 84"
        },
        {
          name: "Johnson Kayode Osiyemi OSINAIKE, FCA",
          year: "1984 – 85"
        },
        {
          name: "Otunba Adedoyin Olayide OGUNDE, FCA, (Deceased)",
          year: "1985 – 86"
        },
        {
          name: "Samie Aremu, WILLIAMS, FCA, (Deceased)",
          year: "1986 – 87"
        },
        {
          name: "Johnson Olaobaju Olabisi OMIDIORA, (Balogun) B.Sc., OON, FCA",
          year: "1987 – 88"
        },
        {
          name: "Ebenezer Folorunsho OKE, (Chief) B.Sc., FCA (Deceased)",
          year: "1988 – 89"
        },
        {
          name: "HH. The Otunba Ayora (Dr.) Bola KUFORIJI-OLUBI, B.Sc, FCA, OON, MON, (Deceased)",
          year: "1989 – 90"
        },
        {
          name: "Michael Ayodeji ONI, B.Sc., FCA",
          year: "1990 – 91"
        },
        {
          name: "Cornelius Oladipupo Sunday OSENI, B.Sc., FCA",
          year: "1991 – 92"
        },
        {
          name: "Oluwole Alani ADEOSUN, (Chief) B.Sc. OON, FCA (Deceased)",
          year: "1992 – 93"
        },
        {
          name: "Ismaila USMAN, (Mallam), FCA",
          year: "1993 – 94"
        },
        {
          name: "Olutoyin Olusola OLAKUNRI, (Chief, Mrs.), OFR, FCA",
          year: "1994 – 95"
        },
        {
          name: "Simeon Olusola OGUNTIMEHIN, (Sir) OON, FCA",
          year: "1995 – 96"
        },
        {
          name: "Emmanuel Itoya IJEWERE, FCA",
          year: "1996 – 97"
        },
        {
          name: "Agnes Adenike ADENIRAN (Princess), FCA",
          year: "1997–98"
        },
        {
          name: "Ike NWOKOLO, (Sir), OFR, KSC, FCA",
          year: "1998–99"
        },
        {
          name: "Adeboye Olugboyega, BADEJO (Chief), FCA",
          year: "1999–2000"
        },
        {
          name: "Herbert Adewole AGBEBIYI, FCA",
          year: "2000-2001"
        },
        {
          name: "Ugochukwu Stephen NWANKWO (Chief), FCA",
          year: "2001-2002"
        },
        {
          name: "Felix Kolawole BAJOMO (Chief), mni, FCA",
          year: "2002-2003"
        },
        {
          name: "Jaiye Kofolaran, RANDLE, (Bashorun), FCA",
          year: "2003-2004"
        },
        {
          name: "Ibironke Mojisola Osiyemi (Mrs), FCA",
          year: "2004-2005"
        },
        {
          name: "Abdul Lateef Adebayo Owoyemi (Alhaji, Otunba), FCA",
          year: "2005-2006"
        },
        {
          name: "Catherine Ginikanwa Okpareke, (Chief, Dr., Mrs.), B.A, MBA, D (Lit), MNIM, mni, FCA",
          year: "2006-2007"
        },
        {
          name: "Abiodun Babington-Ashaye, (Prince), FCA (Deceased)",
          year: "2007-2008"
        },
        {
          name: "Richard Uchechukwu Uche, (Chief, Dr.), PhD, FCA",
          year: "2008-2009"
        },
        {
          name: "Elizabeth Omeresan Adegite, (Chief, Mrs), B.Sc., MBA, FCA",
          year: "2009-2010"
        },
        {
          name: "Sebastian Achulike Owuama (Major General) (rtd), B.Sc, FCA",
          year: "2010-2011"
        },
        {
          name: "Francis Ojaide (Professor) MSc., PhD, OON, FCA",
          year: "2011-2012"
        },
        {
          name: "Doyin Owolabi, B.Sc. (Econs.), MILR, FNIM, FCA",
          year: "2012-2013"
        },
        {
          name: "Alhaji Kabir Alkali Mohammed, mni, FCIS, CGMA, FCA",
          year: "2013-2014"
        },
        {
          name: "Mr. Chidi Onyeukwu Ajaegbu, FCS, MBF, Dip. (Polygraph), FCA",
          year: "2014-2015"
        },
        {
          name: "Otunba Samuel Olufemi Deru, FNIM, JP, FCA",
          year: "2015-2016"
        },
        {
          name: "Deacon Titus Alao Soetan",
          year: "2016-2017"
        },
        {
          name: "Isma`ila Muhammadu ZAKARI (Mallam), mni, FBR, FCA (IPP*)",
          year: "2017-2018"
        },
        {
          name: "Razak JAIYEOLA (Alhaji), BSc, ACFE, CRISC, FCA (IPP*)",
          year: "2018-2019"
        },
        {
          name: "MAZI NNAMDI OKWUADIGBO FCA",
          year: "Till Date"
        }
      ]
    },
    presidency: [
      {
        name: "MAZI NNAMDI OKWUDIGBO",
        position: "PRESIDENT",
        imageURL: "https://i.ibb.co/TrfyZfC/president.jpg"
      },
      {
        name: "MRS. ONOME JOY ADEWUYI",
        position: "VICE-PRESIDENT",
        imageURL: "https://i.ibb.co/Bsmmsmn/vice.jpg"
      },
      {
        name: "MRS. COMFORT EYITAYO",
        position: "1ST DEPUTY VICE-PRESIDENT",
        imageURL: "https://i.ibb.co/Qbhzn36/1-deputy-vice.jpg"
      },
      {
        name: "MALLAM TIJJANI MUSA ISA, FCA",
        position: "2ND DEPUTY VICE-PRESIDENT",
        imageURL: "https://i.ibb.co/Tt36XRq/2-deputy-vice.jpg"
      },
      {
        name: "ALHAJI RAZAK JAIYEOLA FCA",
        position: "IMMEDIATE PAST PRESIDENT",
        imageURL: "https://i.ibb.co/PcjCxvD/past-president.jpg"
      },
      {
        name: "CHIEF OYE AKINSULIRE",
        position: "HONOURARY TREASURER",
        imageURL: "https://i.ibb.co/d0gBk1n/treasurer.jpg"
      },
      {
        name: "PROF. AHMED MODU KUMSHE",
        position: "REGISTRAR/CEO",
        imageURL: "https://i.ibb.co/2SGw21x/ceo.jpg"
      }
    ],
    councilMembers: [
      {
        name: "Alhaja Mrs. Queensly Seghosime FCA",
        position: "",
        imageURL: "https://i.ibb.co/q5QPTtF/Alhaja-Mrs-Queensly-Seghosime-FCA.jpg"
      },
      {
        name: "Mr. Gaddaffi Ekhoragbon",
        position: "",
        imageURL: "https://i.ibb.co/XbbGpFQ/Mr-Gaddaffi-Ekhoragbon.jpg"
      },
      {
        name: "Mrs. Felicia Aina Bamgbose FCA",
        position: "",
        imageURL: "https://i.ibb.co/ZMX8922/Mrs-Felicia-Aina-Bamgbose-FCA.jpg"
      },
      {
        name: "Mrs. Hilda Ozoh FCA",
        position: "",
        imageURL: "https://i.ibb.co/gthSvrs/Mrs-Hilda-Ozoh-FCA-1.jpg"
      },
    ],
    pastChairmen: [
      {
        name: "KELLY AYAMBA FCA",
        position: "1ST CHAIRMAN, SOUHTERN ZONAL DISTRICTS",
        imageURL: "https://i.ibb.co/6J26N2M/KELLY-AYAMBA-FCA-1-ST-CHAIRMAN-SOUTHERN-ZONAL-DISTRICTS.jpg"

      },
      {
        name: "EKERUCHE ONYEMAECHI FCA",
        position: "2ND CHAIRMAN SOUTHERN ZONAL DISTRICTS",
        imageURL: "https://i.ibb.co/3Y7yC98/EKERUCHE-ONYEMAECHI-FCA-2-ND-CHAIR-MAN-SOUTHERN-ZONAL-DISTRICTS.jpg",

      },
    ],
    executiveMenbers: [
      {
        name: "ONYENAJU OGHENERO COSMAS FCA",
        position: "CHAIRMAN ",
        imageURL: "https://i.ibb.co/rbrSysq/ONYENAJU-OGHENERO-COSMAS-FCA-CHAIRMAN-SOUTHERN-ZONAL-DISTRICTS.jpg"
      },
      {
        name: "MRS. TABOWEI PHILOMENA FCA",
        position: "VICE-CHAIRMAN",
        imageURL: "https://i.ibb.co/DQpG0d0/TABOWEI-PHILOMENA-FCA-VICE-CHAIRMAN-SOUTHERN-ZONAL-DISTRICTS.jpg"
      },
      {
        name: "EKERUCHE ONYEMAECHI, FCA",
        position: "IMMEDIATE PAST CHAIRMAN",
        imageURL: "https://i.ibb.co/3Y7yC98/EKERUCHE-ONYEMAECHI-FCA-2-ND-CHAIR-MAN-SOUTHERN-ZONAL-DISTRICTS.jpg"
      },
      {
        name: "ETEYEN SUNDAY IKPONG FCA",
        position: "SECRETARY",
        imageURL: "https://i.ibb.co/X4VgBF1/ETEYEN-SUNDAY-IKONG-FCA-GENERAL-SECRATARY-SOUTHERN-ZONAL-DISTRICTS.jpg"
      },
      {
        name: "OKEY NWOGU FCA",
        position: "IMMEDIATE PAST SECRETARY",
        imageURL: "https://i.ibb.co/yf60y8h/OKEY-NWOGU-FCA-IMMEDIATE-PAST-SECREYARY-SOUTHERN-ZONAL-DISTRICTS.jpg"
      },
      {
        name: "FRANCIS CHAVWUKO OKORO FCA",
        position: "ASSISTANT SECRETARY",
        imageURL: "https://i.ibb.co/1X02dr3/FRANCIS-CHAVWUKO-OKORO-FCA-ASST-SECRETARY-SOUTHERN-ZONAL-DISTRICTS.jpg"
      },
      {
        name: "PRINCE ELENDU FCA",
        position: "TREASURER ",
        imageURL: "https://i.ibb.co/H7762Rk/PRINCE-ELENDU-FCA-TREASURER-SOUTHERN-ZONAL-DISTRITS.jpg"
      },
      {
        name: "Elder Sunday Omini Eloma FCA",
        position: "CONFERENCE ACCOUNTANT ",
        imageURL: "https://i.ibb.co/80g5TvN/Elder-Sunday-Omini-Eloma-FCA.jpg"
      },
    ],
    hotels: [
      { name: "AXARI HOTEL", rooms: "20", oldRate: "₦ 30,000", newRate: "₦ 12, 000", benefits: "INTERNET", location: "M/M HIGHWAY", distance: "ABOUT 1KM", contactPerson: "TOM", phone: "0817 605 1608" },
      { name: "DANNIC HOTEL", rooms: "50", oldRate: "VARIOUS RATES", newRate: "₦ 12,000 / ₦ 10,000", benefits: "WITH / WITHOUT BREAKFAST", location: "OFF M/M HIGHWAY", distance: "ABOUT 1KM", contactPerson: "NKANTA ELEAZER", phone: "0803 293 5616" },
      { name: "FORMULAR EXECUTIVE SUITES", rooms: "30", oldRate: "₦ 15,000 / ₦ 20,000", newRate: "₦ 8,000 / ₦ 10,000", benefits: "WITH BREAKFAST", location: "STATE HOUSING ESTATE", distance: "ABOUT 2KM", contactPerson: "INYANG", phone: "0803 415 5852" },
      { name: "CALABAR HARBOUR RESORT", rooms: "13", oldRate: "VARIOUS RATES", newRate: "₦ 16,500 / ₦ 20,000 / ₦ 22,000 / ₦ 26,000 / ₦ 33,000 / ₦ 54,000", benefits: "WITH BREAKFAST SWIMMING POOL; INTERNET", location: "ASARI ESO, OFF MCC ROAD", distance: "ABOUT 1KM", contactPerson: "MV MADOKE", phone: "0817 003 0305 / 0901 503 1221" },
      { name: "MANGEL SUITES", rooms: "20", oldRate: "₦ 25,000 / ₦ 30,000", newRate: "₦ 8,000 / ₦ 10,000", benefits: "BUS RIDE TO & FRO CICC", location: "FED. HOUSING ESTATE", distance: "ABOUT 2KM", contactPerson: "MIKE ASHABA", phone: "0806 836 6683" },
      { name: "JORANNY HOTEL", rooms: "12", oldRate: "₦ 25,000", newRate: "₦ 13,000", benefits: "WITH BREAKFAST", location: "MCC BY TIMBER MARKET", distance: "ABOUT 2KM", contactPerson: "PATRICK", phone: "0706 822 7022" },
      { name: "CYTARO HOTEL", rooms: "18", oldRate: "VARIOUS RATES", newRate: "₦ 10,000 / ₦ 12,000 / ₦ 20,000 / ₦ 25,000", benefits: "", location: "STATE HOUSING ESTATE", distance: "ABOUT 2KM", contactPerson: "TOM", phone: "0803 721 3847" },
      { name: "PYRAMID HOTEL", rooms: "30", oldRate: "₦ 25,000", newRate: "₦ 10,000", benefits: "", location: "M/M HIGHWAY", distance: "ABOUT 1KM", contactPerson: "CY", phone: "0818 885 7000" },
      { name: "XCAPE SUITES", rooms: "10", oldRate: "₦ 20,000 / ₦ 30,000", newRate: "₦ 8,000  / ₦ 10,000", benefits: "WITH BREAKFAST", location: "STATE HOUSING ESTATE", distance: "ABOUT 1KM", contactPerson: "JOE", phone: "0803 595 6326" },
      { name: "NAKS HOTEL", rooms: "100", oldRate: "₦ 25,000 / ₦ 30,000", newRate: "₦ 10,000", benefits: "", location: "MARIAN ROAD", distance: "ABOUT 1KM", contactPerson: "JOE", phone: "0703 299 4683 / 0803 924 3902" },
      { name: "ADRIANS PLACE", rooms: "6", oldRate: "₦ 12,000", newRate: "₦ 8,000", benefits: "", location: "MCC ROAD", distance: "ABOUT 1KM", contactPerson: "UJU", phone: "0807 529 1001" },
      { name: "GOMAYS PLAZA SUITE", rooms: "30", oldRate: "₦ 25,000", newRate: "₦ 10,000", benefits: "WITH CONTINENTAL BREAKFAST", location: "STATE HOUSING ESTATE", distance: "ABOUT 1KM", contactPerson: "TONY", phone: "0803 532 1145" },
      { name: "5-2-HO", rooms: "20", oldRate: "₦ 30,000", newRate: "₦ 13,000", benefits: "WITH BREAKFAST", location: "STATE HOUSING ESTATE", distance: "ABOUT 1KM", contactPerson: "MIKE OGAR", phone: "0703 079 5745" },
      { name: "SPECS SUITES", rooms: "13", oldRate: "VARIOUS RATES", newRate: "₦ 9,000 / ₦ 7,000", benefits: "WITH  / WITHOUT BREAKFAST", location: "STATE HOUSING ESTATE", distance: "ABOUT 1KM", contactPerson: "EMMA", phone: "0803 962 5495" },
      { name: "KEVES INN / SUITES", rooms: "30", oldRate: "VARIOUS RATES", newRate: "₦ 12,000 / ₦ 10,000", benefits: "WITH  / WITHOUT BREAKFAST", location: "M/M HIGHWAY", distance: "ABOUT 1KM", contactPerson: "ABE SAMUEL", phone: "0806 939 6024" },
      { name: "CHANNEL VIEW", rooms: "40", oldRate: "₦ 30,000 - ₦ 60,000", newRate: "₦ 25,000", benefits: "WITH  BREAKFAST", location: "MCC ROAD", distance: "ABOUT 1KM", contactPerson: "EMMANUEL EKPENYONG", phone: "0803 730 5559" },
      { name: "TINAPA HOTEL", rooms: "100+", oldRate: "VARIOUS RATES", newRate: "₦ 13,000", benefits: "WITHOUT BREAKFAST", location: "TINAPA RESORT", distance: "OPPOSITE THE VENUE", contactPerson: "GBENGA", phone: "0818 508 8176" },
      { name: "ROYAL BIT", rooms: "20", oldRate: "VARIOUS RATES", newRate: "₦ 9,000", benefits: "", location: "BARRACKS ROAD", distance: "ABOUT 2KM", contactPerson: "DAVID", phone: "0803 918 2591" },
    ]
  })
});


module.exports = router