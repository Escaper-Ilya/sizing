import React, {useState, useEffect} from 'react';
import { FlexboxGrid, Uploader, CustomProvider, Container, Tabs, Divider, InputPicker, Row, Button } from 'rsuite';
import * as XLSX from 'xlsx';
import 'rsuite/dist/rsuite.min.css';
import './App.css';
import Table from 'rsuite/Table'
import TableColumn from 'rsuite/TableColumn'
import TableHeaderCell from 'rsuite/TableHeaderCell'
import TableCell from 'rsuite/TableCell'
import ColumnGroup from 'rsuite/TableColumnGroup'

const girthinput = [110, 116, 122, 128, 134, 140, 146, 152, 158, 164, 170, 176, 182, 188, 194, 200, 206, 212].map(item => ({ label: item, value: item }));
const sizeinput = [28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78].map(item => ({ label: item, value: item }));

function App() {
  
  const [groupExtensibilityUp, setGroupExtensibilityUp] = useState(null);
  const [group__ExtensibilityUp, setGroup__ExtensibilityUp] = useState([]);

  const [groupExtensibilityDown, setGroupExtensibilityDown] = useState(null);
  const [group__ExtensibilityDown, setGroup__ExtensibilityDown] = useState([]);
  
  const [dataTeam, setDataTeam] = useState(null);
  const [fileTeamName, setFileTeamName] = useState(null);

  const [dataTableUp, setDataTableUp] = useState(null);
  const [fileTableNameUp, setFileTableNameUp] = useState(null);
  const [incrementUp, setIncrementUp] = useState(null);

  const [dataTableDown, setDataTableDown] = useState(null);
  const [fileTableNameDown, setFileTableNameDown] = useState(null);
  const [incrementDown, setIncrementDown] = useState(null);

  const [lettersUp, setLettersUp] = useState(null);
  const [lettersDown, setLettersDown] = useState(null);

  const handleFileUploadTableUp = (files, e) => {
    setFileTableNameUp(files[0].name)
    const fileTable = e.target.files[0];
    if(fileTable) {
      const reader = new FileReader();
      reader.onload = (eventTable) => {
        const workbookTable = XLSX.read(eventTable.target.result, { type: 'binary' });
        const sheetNameTable = workbookTable.SheetNames[0];
        const sheetTable = workbookTable.Sheets[sheetNameTable];
        const sheetDataTable = XLSX.utils.sheet_to_json(sheetTable);
  
        const sheetNameTableInc = workbookTable.SheetNames[1];
        const sheetTableInc = workbookTable.Sheets[sheetNameTableInc];
        const sheetDataTableInc = XLSX.utils.sheet_to_json(sheetTableInc);
  
        const groupFabrics = sheetDataTableInc.map((row) =>{
          return row.Group
        })
        const uniqueGroupFabrics = Array.from(new Set(groupFabrics));
        setGroup__ExtensibilityUp(uniqueGroupFabrics)
  
        const letters = sheetDataTable.map((row) =>{
          const keysArray = Object.keys(row);
          if(keysArray.length >= 3) {
            return row.Letter
          }
          return null
        }).filter(element => element !== null)
        
        const uniqueLetters = Array.from(new Set(letters));
        setLettersUp(uniqueLetters)
  
        setDataTableUp(sheetDataTable);
        setIncrementUp(sheetDataTableInc)
      };
      reader.readAsBinaryString(fileTable);
    }
    
  };
  const handleFileDownloadTableDown = (files, e) => {

    setFileTableNameDown(files[0].name)
    const fileTable = e.target.files[0];

    if(fileTable){
      const reader = new FileReader();
      reader.onload = (eventTable) => {
        const workbookTable = XLSX.read(eventTable.target.result, { type: 'binary' });
        const sheetNameTable = workbookTable.SheetNames[0];
        const sheetTable = workbookTable.Sheets[sheetNameTable];
        const sheetDataTable = XLSX.utils.sheet_to_json(sheetTable);
  
        const sheetNameTableInc = workbookTable.SheetNames[1];
        const sheetTableInc = workbookTable.Sheets[sheetNameTableInc];
        const sheetDataTableInc = XLSX.utils.sheet_to_json(sheetTableInc);
  
        const groupFabrics = sheetDataTableInc.map((row) =>{
        return row.Group
        })
        const uniqueGroupFabrics = Array.from(new Set(groupFabrics));
        setGroup__ExtensibilityDown(uniqueGroupFabrics)
  
        const letters = sheetDataTable.map((row) =>{
        const keysArray = Object.keys(row);
        if(keysArray.length >= 3) {
            return row.Letter
        }
        return null
        }).filter(element => element !== null)
        
        const uniqueLetters = Array.from(new Set(letters));
        setLettersDown(uniqueLetters)
        setDataTableDown(sheetDataTable);
        setIncrementDown(sheetDataTableInc)
      };
      reader.readAsBinaryString(fileTable);
    }
  };

  useEffect(() => {
    if(dataTeam && dataTableUp) {
      countSizeUp()
    }
    if(dataTableDown) {
      countSizeDown()
    }
  }, [groupExtensibilityUp]);

  useEffect(() => {
    if(dataTeam && dataTableDown) {
      countSizeDown()
    }
  }, [groupExtensibilityDown]);

  const handleFileUploadTeam = (files, e) => {
    setFileTeamName(files[0].name)
    const file = e.target.files[0];
    if(file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const workbook = XLSX.read(event.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const sheetData = XLSX.utils.sheet_to_json(sheet);
  
        const sheetDataNew = sheetData.map((person, index) => {
          let girth
          const height = person.Height
          if( 90 <= height && height <= 93) (girth = 92)
          if( 94 <= height && height <= 99) (girth = 98)
          if( 100 <= height && height <= 105) (girth = 104)
          if( 106 <= height && height <= 111) (girth = 110)
          if( 112 <= height && height <= 117) (girth = 116)
          if( 118 <= height && height <= 123) (girth = 122)
          if( 124 <= height && height <= 129) (girth = 128)
          if( 130 <= height && height <= 135) (girth = 134)
          if( 136 <= height && height <= 141) (girth = 140)
          if( 142 <= height && height <= 147) (girth = 146)
          if( 148 <= height && height <= 153) (girth = 152)
          if( 154 <= height && height <= 159) (girth = 158)
          if( 160 <= height && height <= 165) (girth = 164)
          if( 166 <= height && height <= 172) (girth = 170)
          if( 173 <= height && height <= 177) (girth = 176)
          if( 178 <= height && height <= 184) (girth = 182)
          if( 185 <= height && height <= 190) (girth = 188)
          if( 191 <= height && height <= 195) (girth = 194)
          if( 196 <= height && height <= 202) (girth = 200)
          if( 203 <= height && height <= 208) (girth = 206)
          if( 209 <= height && height <= 213) (girth = 212)
          return {
            ...person,
            id: index,
            Girth: girth,
            countSizeUp: null,
            countSizeUpDown: null,
            MyGirthUp: null,
            MySizeUp: null,
            MyGirthDown: null,
            MySizeDown: null,
            WorkSizeUp: null,
            WorGirthUp: null,
            Work_S_G_Up: null,
            WorkSizeDown: null,
            WorGirthDown: null,
            Work_S_G_Down: null,
            IncChestUp: null,
            IncWaistUp: null,
            IncHipUp: null,
            IncWaistDown: null,
            IncHipDown: null,
            A: null, B: null, C: null, D: null, E: null, F: null, G: null, H: null, I: null, J: null, K: null, L: null, M: null, N: null, O: null, P: null, Q: null, R: null
          }
        });
  
        setDataTeam(sheetDataNew);
      };
      reader.readAsBinaryString(file);
    }
  };

  const [height, setHeight] = useState(window.innerHeight);
  useEffect(() => {
    const updateHeight = () => setHeight(window.innerHeight);
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  function countSizeUp() {

    dataTeam.map((person, index) => {

      var Girth
      if (!person.MyGirthUp) {Girth = person.Girth} else {Girth = person.MyGirthUp}

      const Chest = person.Chest
      const Waist = person.Waist
      const Hip   = person.Hip

      const ArrChest = Object.entries(dataTableUp.find(obj => {
        return obj.Height === Girth && obj.Letter === 'A';
      })).slice(0, -2);

      const ArrWaist = Object.entries(dataTableUp.find(obj => {
        return obj.Height === Girth && obj.Letter === 'B';
      })).slice(0, -2);

      const ArrHip = Object.entries(dataTableUp.find(obj => {
        return obj.Height === Girth && obj.Letter === 'C';
      })).slice(0, -2);
      // _________________________________________

      const ExtensibilitChest = incrementUp.find((obj) => {
        return obj.Group === groupExtensibilityUp && obj.Measure === "Chest"
      })
      const ExtensibilitWaist = incrementUp.find((obj) => {
        return obj.Group === groupExtensibilityUp && obj.Measure === "Waist"
      })
      const ExtensibilitHip = incrementUp.find((obj) => {
        return obj.Group === groupExtensibilityUp && obj.Measure === "Hip"
      })
      // _________________________________________

      if(groupExtensibilityUp) {

        const findSizeChestArr = ArrChest.map((size)=>{
          const doubleSize = size[1] * 2
          const inc = doubleSize - Chest
          if (ExtensibilitChest.From <= inc && inc <= ExtensibilitChest.To) {
            return Number(size[0])
          } 
          return null
        }).filter(element => element !== null)
        // const sizeChest = Math.min(...findSizeChestArr)
        var sizeChest
        if(findSizeChestArr.length === 0) {sizeChest = 0} else {sizeChest = Math.min(...findSizeChestArr)}
        // _________________________________________
        const findSizeWaistArr = ArrWaist.map((size)=>{
          const doubleSize = size[1] * 2
          const inc = doubleSize - Waist
          if (ExtensibilitWaist.From <= inc && inc <= ExtensibilitWaist.To) {
            return Number(size[0])
          } 
          return null
        }).filter(element => element !== null)
        var sizeWaist
        if(findSizeWaistArr.length === 0) {sizeWaist = 0} else {sizeWaist = Math.min(...findSizeWaistArr)}
        // const sizeWaist = Math.min(...findSizeWaistArr)
        
        // _________________________________________
        const findSizeHipArr = ArrHip.map((size)=>{
          const doubleSize = size[1] * 2
          const inc = doubleSize - Hip
          if (ExtensibilitHip.From <= inc && inc <= ExtensibilitHip.To) {
            return Number(size[0])
          } 
          return null
        }).filter(element => element !== null)

        var sizeHip
        if(findSizeHipArr.length === 0) {sizeHip = 0} else {sizeHip = Math.min(...findSizeHipArr)}
        // _________________________________________
  
        const sizeUpArr = [sizeChest, sizeWaist, sizeHip].filter(element => element !== 0)
        console.log(sizeUpArr.length)
        console.log(["Грудь "+ sizeChest + "/   Тал " + sizeWaist + "/   Бедр " + sizeHip])

        const noSize = sizeUpArr.length < 3

        var noSizeWhy = ''

        var sizeUp = 0

        if(sizeChest === 0){
          const SizeChestArr = Object.keys(dataTableUp.find(obj => {
            return obj.Height === Girth && obj.Letter === 'A';
          })).slice(0, -2).map(obj =>{
            return Number(obj)
          })
          const maxSizeChest = Math.max(...SizeChestArr)
          const minSizeChest = Math.min(...SizeChestArr)

          const incChestMax = parseFloat((dataTableUp.find(obj => {
            return obj.Height === Girth && obj.Letter === 'A';
          })[maxSizeChest] * 2 - person.Chest).toFixed(2));
          const incChestMin = parseFloat((dataTableUp.find(obj => {
            return obj.Height === Girth && obj.Letter === 'A';
          })[minSizeChest] * 2 - person.Chest).toFixed(2));

          if(incChestMin < ExtensibilitChest.From ) {noSizeWhy = 'Макс'; sizeUp = maxSizeChest}
          if(incChestMax > ExtensibilitChest.To && sizeUpArr.length === 0) {noSizeWhy = 'Мин'; sizeUp = minSizeChest}
          if(sizeUpArr.length >= 1) {console.log('dfhdrhdsrhdsrhdsrh')}
          console.log([minSizeChest, maxSizeChest,  incChestMin  + '<'+ ExtensibilitChest.From,incChestMax   + '>'+ ExtensibilitChest.To])
          
        }
        if(sizeWaist === 0){
          const SizeWaistArr = Object.keys(dataTableUp.find(obj => {
            return obj.Height === Girth && obj.Letter === 'B';
          })).slice(0, -2).map(obj =>{
            return Number(obj)
          })
          const maxSizeWaist = Math.max(...SizeWaistArr)
          const minSizeWaist = Math.min(...SizeWaistArr)

          const incWaistMax = parseFloat((dataTableUp.find(obj => {
            return obj.Height === Girth && obj.Letter === 'B';
          })[maxSizeWaist] * 2 - person.Waist).toFixed(2));
          const incWaistMin = parseFloat((dataTableUp.find(obj => {
            return obj.Height === Girth && obj.Letter === 'B';
          })[minSizeWaist] * 2 - person.Waist).toFixed(2));

          if(incWaistMax < ExtensibilitWaist.From) {noSizeWhy = 'Макс'; sizeUp = maxSizeWaist}
          console.log([minSizeWaist, maxSizeWaist, incWaistMax + '<'+ ExtensibilitWaist.From])
          
        }
        if(sizeHip === 0){
          const SizeHipArr = Object.keys(dataTableUp.find(obj => {
            return obj.Height === Girth && obj.Letter === 'C';
          })).slice(0, -2).map(obj =>{
            return Number(obj)
          })
          const maxSizeHip = Math.max(...SizeHipArr)
          const minSizeHip = Math.min(...SizeHipArr)

          const incHipMax = parseFloat((dataTableUp.find(obj => {
            return obj.Height === Girth && obj.Letter === 'C';
          })[maxSizeHip] * 2 - person.Hip).toFixed(2));
          const incHipMin = parseFloat((dataTableUp.find(obj => {
            return obj.Height === Girth && obj.Letter === 'C';
          })[minSizeHip] * 2 - person.Hip).toFixed(2));

          
          console.log(dataTableUp.find(obj => {
            return obj.Height === Girth && obj.Letter === 'C';
          })[maxSizeHip])

          if(incHipMin < ExtensibilitHip.From) {noSizeWhy = 'Макс'; sizeUp = maxSizeHip}
          if(incHipMax > ExtensibilitHip.To && sizeUpArr.length === 0) {noSizeWhy = 'Мин'; sizeUp = minSizeHip}
          console.log([minSizeHip, maxSizeHip,incHipMin  + '<'+ ExtensibilitHip.From, incHipMax + '>'+ ExtensibilitHip.To])
          
        }

        var sizeCountUp
        
        console.log(sizeUp)
        if (sizeUpArr.length === 3 || sizeUp === 0)  {sizeCountUp = Math.max(...sizeUpArr); console.log(sizeCountUp)} 
        else {sizeCountUp=sizeUp; console.log(sizeCountUp)}
        
        if (!person.MySizeUp) {sizeUp = sizeCountUp} 
        else {sizeUp = person.MySizeUp}
        
        const incChest = parseFloat((dataTableUp.find(obj => {
          return obj.Height === Girth && obj.Letter === 'A';
        })[sizeUp] * 2 - person.Chest).toFixed(2));
  
        const incWaist = parseFloat((dataTableUp.find(obj => {
          return obj.Height === Girth && obj.Letter === 'B';
        })[sizeUp] * 2 - person.Waist).toFixed(2));
  
        const incHip = parseFloat((dataTableUp.find(obj => {
          return obj.Height === Girth && obj.Letter === 'C';
        })[sizeUp] * 2 - person.Hip).toFixed(2));
        const nextSizes = dataTeam.map((c, i) => {
          if (i === index) {
            const newItem = c
            if (!person.MyGirthUp) {c.countSizeUp = sizeCountUp}
            if (person.MySizehUp) {c.WorkSizeUp = sizeUp} else {c.WorkSizeUp = sizeCountUp}
            
            c.WorGirthUp = Girth
              if (person.MyGirthUp || person.MySizeUp) {c.Work_S_G_Up = sizeUp + '-' + Girth} else {c.Work_S_G_Up = (noSize &&  noSizeWhy + ' ')  + c.countSizeUp + '-' + Girth}
            if(isNaN(incChest)) {c.IncChestUp = 'Нет размера'} else {c.IncChestUp = incChest}
            if(isNaN(incWaist)) {c.IncWaistUp = 'Нет размера'} else {c.IncWaistUp = incWaist}
            if(isNaN(incHip)) {c.IncHipUp = 'Нет размера'} else {c.IncHipUp = incHip}

            lettersUp.map((letter) => {
              const letterVal = dataTableUp.find(obj => {
                return obj.Height === Girth && obj.Letter === letter;
              })[sizeUp]
              c[letter] = letterVal
            })

            return newItem;
          } else { return c }
        });
        setDataTeam(nextSizes);

      } else {
        const nextSizes = dataTeam.map((c, i) => {
          if (i === index) {
            const newItem = c
            c.countSizeUp = null
            c.WorkSizeUp = null
            c.WorGirthUp = null
            c.Work_S_G_Up = null
            c.IncChestUp = null
            c.IncWaistUp = null
            c.IncHipUp = null
            lettersUp.map((letter) => {
              c[letter] = null
            })
            return newItem;
          } else { return c }
        });
        setDataTeam(nextSizes);
      }
    });
  };
  function countSizeDown() {

    dataTeam.map((person, index) => {

      var Girth
      if (!person.MyGirthDown) {Girth = person.Girth} else {Girth = person.MyGirthDown}
      const Waist = person.Waist
      const Hip   = person.Hip

      const ArrWaist = Object.entries(dataTableDown.find(obj => {
        return obj.Height === Girth && obj.Letter === 'J';
      })).slice(0, -2);

      const ArrHip = Object.entries(dataTableDown.find(obj => {
        return obj.Height === Girth && obj.Letter === 'K';
      })).slice(0, -2);
      // _________________________________________
      const ExtensibilitWaist = incrementDown.find((obj) => {
        return obj.Group === groupExtensibilityDown && obj.Measure === "Waist"
      })
      const ExtensibilitHip = incrementDown.find((obj) => {
        return obj.Group === groupExtensibilityDown && obj.Measure === "Hip"
      })
      // _________________________________________
      if(groupExtensibilityDown) {
        const findSizeWaistArr = ArrWaist.map((size)=>{
          const doubleSize = size[1] * 2
          const inc = doubleSize - Waist
          if (ExtensibilitWaist.From <= inc && inc <= ExtensibilitWaist.To) {
            return Number(size[0])
          } 
          return null
        }).filter(element => element !== null)
        const sizeWaistInc = Math.min(...findSizeWaistArr)
        var sizeWaist
        if(!isNaN(sizeWaistInc)) {sizeWaist = 0} else {sizeWaist = sizeWaistInc}
        // _________________________________________
        const findSizeHipArr = ArrHip.map((size)=>{
          const doubleSize = size[1] * 2
          const inc = doubleSize - Hip
          if (ExtensibilitHip.From <= inc && inc <= ExtensibilitHip.To) {
            return Number(size[0])
          } 
          return null
        }).filter(element => element !== null)

        var sizeHip

        // if(dataTableUp) {sizeHip = Math.max(...findSizeHipArr)} else {sizeHip = Math.min(...findSizeHipArr)}
        if(person.WorkSizeUp === null || person.WorkSizeUp < Math.max(...findSizeHipArr)) {sizeHip = Math.min(...findSizeHipArr)} else {sizeHip = Math.max(...findSizeHipArr)}
        if((person.WorkSizeUp - sizeHip) >= 6) {sizeHip = person.WorkSizeUp - 4}
        // _________________________________________+ 2
  
        const sizeDownArr = [ sizeWaist, sizeHip ]
  
        var sizeDown
        
        if (!person.MySizeDown) {sizeDown = Math.max(...sizeDownArr)} else {sizeDown = person.MySizeDown}
        const sizeCountDown = Math.max(...sizeDownArr)
  
        const incWaist = parseFloat((dataTableDown.find(obj => {
          return obj.Height === Girth && obj.Letter === 'J';
        })[sizeDown] * 2 - person.Waist).toFixed(2));
  
        const incHip = parseFloat((dataTableDown.find(obj => {
          return obj.Height === Girth && obj.Letter === 'K';
        })[sizeDown] * 2 - person.Hip).toFixed(2));
  
        const nextSizes = dataTeam.map((c, i) => {
          if (i === index) {
            const newItem = c
            if (!person.MyGirthDown) {c.countSizeDown = sizeCountDown} 
            c.WorkSizeDown = sizeDown
            c.WorGirthDown = Girth
            if (!person.MyGirthDown) {c.Work_S_G_Down = sizeDown + '-' + Girth} else {c.Work_S_G_Down = c.WorkSizeDown + '-' + Girth}
            if(isNaN(incWaist) || incWaist < ExtensibilitWaist.From) {c.IncWaistDown = null} else {c.IncWaistDown = incWaist}
            if(isNaN(incHip) || incHip < ExtensibilitHip.From) {c.IncHipDown = 'Нет размера'} else {c.IncHipDown = incHip}
            // if(isNaN(incChest) && incChest < ExtensibilitChest.From) {c.IncChestUp = 'Нет размера'} else {c.IncChestUp = incChest}

            lettersDown.map((letter) => {
              const letterVal = dataTableDown.find(obj => {
                return obj.Height === Girth && obj.Letter === letter;
              })[sizeDown]
              c[letter] = letterVal
            })
            return newItem;
          } else { return c }
        });
        setDataTeam(nextSizes);

      } else {
        const nextSizes = dataTeam.map((c, i) => {
          if (i === index) {
            const newItem = c
            c.countSizeDown = null
            c.WorkSizeDown = null
            c.WorGirthDown = null
            c.Work_S_G_Down = null
            c.IncWaistDown = null
            c.IncHipDown = null
            lettersDown.map((letter) => {
              c[letter] = null
            })
            return newItem;
          } else { return c }
        });
        setDataTeam(nextSizes);
      }
    });
  };

  const MyGirthUpCell = ({ rowData, dataKey, ...props }) => (
    <TableCell {...props} style={{ padding: 0 }}>
      <div style={{ alignItems: 'center' }} >
        <InputPicker size="xs" data={girthinput}
        disabled={!groupExtensibilityUp ? true : false}
        onChange={obj => {
          const nextInput = dataTeam.map((c, i) => {
            if (i === rowData.id) {
              const newItem = c
              newItem.MyGirthUp = obj
              return newItem;
            } else { return c }
          });
          setDataTeam(nextInput);
          countSizeUp()
          if(groupExtensibilityDown){countSizeDown()}
        }}
        style={{ margin: '0 7px', width: 70}}
        placeholder=" "
        defaultValue={rowData.MyGirthUp}
         />
      </div>
    </TableCell>
  );
  const MySizeUpCell = ({ rowData, dataKey, ...props }) => (
    <TableCell {...props} style={{ padding: 0 }}>
      <div style={{ alignItems: 'center' }} >
         <InputPicker size="xs" data={sizeinput}
         disabled={!groupExtensibilityUp ? true : false}
         style={{ margin: '0 7px', width: 70}} placeholder=" "
         defaultValue={rowData.MySizeUp}
         onChange={obj => {
          const nextInput = dataTeam.map((c, i) => {
            if (i === rowData.id) {
              const newItem = c
              newItem.MySizeUp = obj
              return newItem;
            } else { return c }
          });
          setDataTeam(nextInput);
          countSizeUp()
          if(groupExtensibilityDown){countSizeDown()}
        }}
         />
      </div>
    </TableCell>
  );
  const MyGirthDownCell = ({ rowData, dataKey, ...props }) => (
    <TableCell {...props} style={{ padding: 0 }}>
      <div style={{ alignItems: 'center' }} >
        <InputPicker size="xs" data={girthinput}
        disabled={!groupExtensibilityDown ? true : false}
        onChange={obj => {
          const nextInput = dataTeam.map((c, i) => {
            if (i === rowData.id) {
              const newItem = c
              newItem.MyGirthDown = obj
              return newItem;
            } else { return c }
          });
          setDataTeam(nextInput);
          countSizeDown()
        }}
        style={{ margin: '0 7px', width: 70}}
        placeholder=" "
        defaultValue={rowData.MyGirthDown}
         />
      </div>
    </TableCell>
  );
  const MySizeDownCell = ({ rowData, dataKey, ...props }) => (
    <TableCell {...props} style={{ padding: 0 }}>
      <div style={{ alignItems: 'center' }} >
         <InputPicker size="xs" data={sizeinput}
         disabled={!groupExtensibilityDown ? true : false}
         style={{ margin: '0 7px', width: 70}} placeholder=" "
         defaultValue={rowData.MySizeDown}
         onChange={obj => {
          const nextInput = dataTeam.map((c, i) => {
            if (i === rowData.id) {
              const newItem = c
              newItem.MySizeDown = obj
              return newItem;
            } else { return c }
          });
          setDataTeam(nextInput);
          countSizeDown()
        }}
         />
      </div>
    </TableCell>
  );

  const handleFileDownload = () => {

    const TableData = Array.from(dataTeam)
    const newList = TableData.map(function(col){
      delete col['id'];
      delete col['countSizeUp'];
      delete col['countSizeUpDown'];
      delete col['Girth'];
      delete col['MyGirthUp'];
      delete col['MySizeUp'];
      delete col['MySizeDown'];
      delete col['MyGirthDown'];
      delete col['countSizeDown'];
      ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'N', 'O', 'P', 'Q', 'R'].map((letter)=> {
        if (!lettersUp.concat(lettersDown).includes(letter)) {
          delete col[letter];
        }
      })
      return col;
   });
    var wb = XLSX.utils.book_new()
    var ws = XLSX.utils.json_to_sheet(newList)
    XLSX.utils.book_append_sheet(wb, ws, 'Размеры команды')
    XLSX.utils.sheet_add_aoa(ws, [
      [
      "Фамилия (Имя)", "Номер", "Рост", "Грудь", "Талия", "Бедра",
      "Размер ВЕРХА", "Ростовка ВЕРХА", "Размер в работу ВЕРХА",
      "Размер НИЗА", "Ростовка НИЗА", "Размер в работу НИЗА",
      "Прибавки ВЕРХА по груди", "Прибавки ВЕРХА по талии", "Прибавки ВЕРХА по бедрам",
      "Прибавки НИЗА по талии", "Прибавки НИЗА по бедрам",
      ]], { origin: "A1" });

    const date = new Date();
    const fileTeamNameTo = fileTeamName.split('.').shift();
    
    XLSX.writeFile(wb, `${fileTeamNameTo}-Размеры-${date.toLocaleDateString('ru-RU')}.xlsx`)
  }

  return (
    <CustomProvider theme="light">
      <Container className="app" style={{margin: '15px'}}>
        <FlexboxGrid justify="space-between">

          <FlexboxGrid.Item as={Row} colspan={8} md={3}>
            <Uploader
            action=''
            multiple={false}
            fileListVisible={false}
            autoUpload={false}
            onChange={(files, event) => handleFileUploadTeam(files, event)}
            accept=".xls,.xlsx" draggable>
              <div style={{ height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{fontSize: '20px', fontWeight: '600', textAlign: 'center', color: '#1675e0'}}>Файл о команде</span>
              </div>
            </Uploader>
            {fileTeamName &&
            <div style={{fontSize: '15px', textAlign: 'center', marginTop: '10px', backgroundColor: '#f7f7fa', border: '1px solid #d9d9d9', borderRadius: '5px', padding: '7px'}}> 
              {fileTeamName}
            </div>
            }
          </FlexboxGrid.Item>
          
          <FlexboxGrid.Item as={Row} colspan={8} md={3}>
            <Uploader
            action=''
            multiple={false}
            fileListVisible={false}
            autoUpload={false}
            onChange={(files, event) => handleFileUploadTableUp(files, event)}
            accept=".xls,.xlsx" draggable>
              <div style={{ height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{fontSize: '20px', fontWeight: '600', textAlign: 'center', color: '#1675e0'}}>Файл размеров верха</span>
              </div>
            </Uploader>
            {fileTableNameUp &&
            <div style={{fontSize: '15px', textAlign: 'center', marginTop: '10px', backgroundColor: '#f7f7fa', border: '1px solid #d9d9d9', borderRadius: '5px', padding: '7px'}}> 
              {fileTableNameUp}
            </div>
            }
          </FlexboxGrid.Item>

          <FlexboxGrid.Item as={Row} colspan={8} md={3}>
            <Uploader
            action=''
            multiple={false}
            fileListVisible={false}
            autoUpload={false}
            onChange={(files, event) => handleFileDownloadTableDown(files, event)}
            accept=".xls,.xlsx" draggable>
              <div style={{ height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{fontSize: '20px', fontWeight: '600', textAlign: 'center', color: '#1675e0'}}>Файл размеров низа</span>
              </div>
            </Uploader>
            {fileTableNameDown &&
            <div style={{fontSize: '15px', textAlign: 'center', marginTop: '10px', backgroundColor: '#f7f7fa', border: '1px solid #d9d9d9', borderRadius: '5px', padding: '7px'}}> 
              {fileTableNameDown}
            </div>
            }
          </FlexboxGrid.Item>
          
        </FlexboxGrid>
      </Container>
      <Divider />
      <div style={{display: 'flex', flexDirection: 'row', margin: '0 15px', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          {group__ExtensibilityUp.length>0 &&
            <div>
              <span style={{margin: '0 10px'}}>Группа растяжимости ткани ВЕРХА:</span>
              <InputPicker size="sm" data={group__ExtensibilityUp.map(item => ({ label: item, value: item }))}
                onChange={e => {
                  setGroupExtensibilityUp(e);
                }}
                style={{ margin: '0 7px', width: 70}}
                placeholder=" "
                defaultValue={groupExtensibilityUp}
              />
            </div>
          }
          {group__ExtensibilityDown.length>0 &&
            <div>
              <span style={{margin: '0 10px'}}>Группа растяжимости ткани НИЗА:</span>
              <InputPicker size="sm" data={group__ExtensibilityDown.map(item => ({ label: item, value: item }))}
                onChange={e => setGroupExtensibilityDown(e)}
                style={{ margin: '0 7px', width: 70}}
                placeholder=" "
                defaultValue={groupExtensibilityDown}
              />
            </div>
          }
          <a href='/Шаблон_для_размеров.xlsx' download style={{lineHeight: '2', margin: '0 10px'}}>Скачать файл шаблона</a>
        </div>
        <Button
        appearance="primary"
        onClick={handleFileDownload}
        disabled={groupExtensibilityUp || groupExtensibilityDown ? false : true}
        >Скачать таблицу</Button>
      </div>
        
      
      <Container className="app" style={{margin: '15px'}}>
        <Tabs defaultActiveKey="1">
          <Tabs.Tab eventKey="1" title="Список команды с размерами">
            {dataTeam && (
              <>
                <Table
                  // height={height-325}
                  autoHeight
                  data={dataTeam}
                  hover={true}
                  bordered={true}
                  cellBordered={true}
                  headerHeight={100}
                  virtualized
                  rowHeight={30}
                  verticalAlign='middle'
                >
                  <TableColumn width={180} align="start" fixed resizable>
                    <TableHeaderCell verticalAlign='middle'>Фамилия (Имя)</TableHeaderCell>
                    <TableCell style={{ padding: 4 }}  dataKey="Name" />
                  </TableColumn>
                  <TableColumn width={50} align="center">
                    <TableHeaderCell verticalAlign='middle'>Номер</TableHeaderCell>
                    <TableCell style={{ padding: 4 }}  dataKey="Nomber" />
                  </TableColumn>
                  <ColumnGroup header="Мерки клиента" align="center">
                    <TableColumn width={50} align="center">
                      <TableHeaderCell>Рост</TableHeaderCell>
                      <TableCell dataKey="Height" style={{backgroundColor: '#bcbccb14', padding: 4}} />
                    </TableColumn>
                    <TableColumn width={50} align="center">
                      <TableHeaderCell>Грудь</TableHeaderCell>
                      <TableCell dataKey="Chest" style={{backgroundColor: '#bcbccb14', padding: 4}} />
                    </TableColumn>
                    <TableColumn width={50} align="center">
                      <TableHeaderCell>Талия</TableHeaderCell>
                      <TableCell dataKey="Waist" style={{backgroundColor: '#bcbccb14', padding: 4}} />
                    </TableColumn>
                    <TableColumn width={50} align="center">
                      <TableHeaderCell>Бедра</TableHeaderCell>
                      <TableCell  dataKey="Hip" style={{backgroundColor: '#bcbccb14', padding: 4}} />
                    </TableColumn>
                  </ColumnGroup>
                  <ColumnGroup header="Расчетные размеры" align="center" verticalAlign='middle' style={{textAlign: 'center'}}>
                    <TableColumn width={70} align="center">
                      <TableHeaderCell>Ростовка</TableHeaderCell>
                      <TableCell dataKey="Girth" style={{fontWeight: '600', padding: 4}} />
                    </TableColumn>
                    <TableColumn width={50} align="center">
                      <TableHeaderCell>ВЕРХ</TableHeaderCell>
                      <TableCell dataKey="countSizeUp" style={{fontWeight: '600', padding: 4}} />
                    </TableColumn>
                    <TableColumn width={50} align="center">
                      <TableHeaderCell>НИЗ</TableHeaderCell>
                      <TableCell dataKey="countSizeDown" style={{fontWeight: '600', padding: 4}} />
                    </TableColumn>
                  </ColumnGroup>
                  <ColumnGroup header="Корректировка ВЕРХА" align="center">
                    <TableColumn width={80} verticalAlign='middle' align="center">
                      <TableHeaderCell>Ростовка</TableHeaderCell>
                      <MyGirthUpCell dataKey="MyGirthUp" />
                    </TableColumn>
                    <TableColumn width={80} verticalAlign='middle' align="center">
                      <TableHeaderCell>Размер</TableHeaderCell>
                      <MySizeUpCell dataKey="MySizeUp" />
                    </TableColumn>
                  </ColumnGroup>
                  <ColumnGroup header="Корректировка НИЗА" align="center">
                    <TableColumn width={80} verticalAlign='middle' align="center">
                      <TableHeaderCell>Ростовка</TableHeaderCell>
                      <MyGirthDownCell dataKey="MyGirthDown" />
                    </TableColumn>
                    <TableColumn width={80} verticalAlign='middle' align="center">
                      <TableHeaderCell>Размер</TableHeaderCell>
                      <MySizeDownCell dataKey="MySizeDown" />
                    </TableColumn>
                  </ColumnGroup>
                    <TableColumn width={110} align="center">
                      <TableHeaderCell><div style={{display:'flex', alignItems: 'center', textAlign: 'center'}}>Размер ВЕРХА <br/> в работу</div></TableHeaderCell>
                      <TableCell dataKey="Work_S_G_Up" style={{fontWeight: '600', padding: 4, backgroundColor: '#3498ff1c', textAlign: 'center', boxShadow: 'rgb(4 135 231 / 15%) 0px 0px 10px inset'}} />
                    </TableColumn>
                    <TableColumn width={110} align="center">
                      <TableHeaderCell><div style={{display:'flex', alignItems: 'center', textAlign: 'center'}}>Размер НИЗА <br/> в работу</div></TableHeaderCell>
                      <TableCell dataKey="Work_S_G_Down" style={{fontWeight: '600', padding: 4, backgroundColor: '#3498ff1c', textAlign: 'center', boxShadow: 'rgb(4 135 231 / 15%) 0px 0px 10px inset'}} />
                    </TableColumn>
                  <ColumnGroup header="Прибавки ВЕРХА" align="center">
                    <TableColumn width={90} align="center">
                      <TableHeaderCell>По груди</TableHeaderCell>
                      <TableCell dataKey="IncChestUp" style={{backgroundColor: '#bcbccb14', padding: 4}} />
                    </TableColumn>
                    <TableColumn width={90} align="center">
                      <TableHeaderCell>По талии</TableHeaderCell>
                      <TableCell dataKey="IncWaistUp" style={{backgroundColor: '#bcbccb14', padding: 4}} />
                    </TableColumn>
                    <TableColumn width={90} align="center">
                      <TableHeaderCell>По бедрам</TableHeaderCell>
                      <TableCell dataKey="IncHipUp" style={{backgroundColor: '#bcbccb14', padding: 4}} />
                    </TableColumn>
                  </ColumnGroup>
                  <ColumnGroup header="Прибавки НИЗА" align="center">
                    <TableColumn width={90} align="center">
                      <TableHeaderCell>По талии</TableHeaderCell>
                      <TableCell  dataKey="IncWaistDown" style={{backgroundColor: '#bcbccb14', padding: 4}} />
                    </TableColumn>
                    <TableColumn width={90} align="center">
                      <TableHeaderCell>По бедрам</TableHeaderCell>
                      <TableCell dataKey="IncHipDown" style={{backgroundColor: '#bcbccb14', padding: 4}} />
                    </TableColumn>
                  </ColumnGroup>
                  <ColumnGroup header="Мерки ВЕРХА" align="center">
                    {lettersUp &&
                      (lettersUp.map((letCol, i) => {
                        return <TableColumn key={'LetterUp' + i} width={70} align="center">
                          <TableHeaderCell>{letCol}</TableHeaderCell>
                          <TableCell dataKey={letCol} style={{padding: 4}} />
                      </TableColumn>
                      }))
                    }
                  </ColumnGroup>
                  <ColumnGroup header="Мерки НИЗА" align="center">
                    {lettersDown &&
                      (lettersDown.map((letCol, i) => {
                        return <TableColumn key={'LetterUp' + i} width={70} align="center">
                          <TableHeaderCell>{letCol}</TableHeaderCell>
                          <TableCell dataKey={letCol} style={{padding: 4}} />
                      </TableColumn>
                      }))
                    }
                  </ColumnGroup>
                </Table>
                <pre>{JSON.stringify(dataTeam, null, 2)}</pre>
              </>
            )}
          </Tabs.Tab>
          <Tabs.Tab eventKey="2" title="Табличные данные ВЕРХА">
            {dataTableUp && (
              <>
                <Table
                  maxHeight={height-325}
                  autoHeight
                  data={dataTableUp}
                  hover={true}
                  bordered={true}
                  cellBordered={true}
                  virtualized
                  rowHeight={30}
                >
                  <TableColumn width={80} align="center" fixed>
                    <TableHeaderCell>Ростовка</TableHeaderCell>
                    <TableCell style={{ padding: 4 }} dataKey="Height" />
                  </TableColumn>
                  <TableColumn width={80} align="center" fixed>
                    <TableHeaderCell>Измерение</TableHeaderCell>
                    <TableCell style={{ padding: 4 }} dataKey="Letter" />
                  </TableColumn>
                  <TableColumn flexGrow={1} align="center">
                    <TableHeaderCell>28</TableHeaderCell>
                    <TableCell style={{ padding: 4 }}  dataKey="28" />
                  </TableColumn>
                  <TableColumn flexGrow={1} align="center">
                    <TableHeaderCell>30</TableHeaderCell>
                    <TableCell style={{ padding: 4 }}  dataKey="30" />
                  </TableColumn>
                  <TableColumn flexGrow={1} align="center">
                    <TableHeaderCell>32</TableHeaderCell>
                    <TableCell style={{ padding: 4 }}  dataKey="32" />
                  </TableColumn>
                  <TableColumn flexGrow={1} align="center">
                    <TableHeaderCell>34</TableHeaderCell>
                    <TableCell style={{ padding: 4 }}  dataKey="34" />
                  </TableColumn>
                  <TableColumn flexGrow={1} align="center">
                    <TableHeaderCell>36</TableHeaderCell>
                    <TableCell style={{ padding: 4 }}  dataKey="36" />
                  </TableColumn>
                  <TableColumn flexGrow={1} align="center">
                    <TableHeaderCell>38</TableHeaderCell>
                    <TableCell style={{ padding: 4 }}  dataKey="38" />
                  </TableColumn>
                  <TableColumn flexGrow={1} align="center">
                    <TableHeaderCell>40</TableHeaderCell>
                    <TableCell style={{ padding: 4 }}  dataKey="40" />
                  </TableColumn>
                  <TableColumn flexGrow={1} align="center">
                    <TableHeaderCell>42</TableHeaderCell>
                    <TableCell style={{ padding: 4 }}  dataKey="42" />
                  </TableColumn>
                  <TableColumn flexGrow={1} align="center">
                    <TableHeaderCell>44</TableHeaderCell>
                    <TableCell style={{ padding: 4 }}  dataKey="44" />
                  </TableColumn>
                  <TableColumn flexGrow={1} align="center">
                    <TableHeaderCell>46</TableHeaderCell>
                    <TableCell style={{ padding: 4 }}  dataKey="46" />
                  </TableColumn>
                  <TableColumn flexGrow={1} align="center">
                    <TableHeaderCell>48</TableHeaderCell>
                    <TableCell style={{ padding: 4 }}  dataKey="48" />
                  </TableColumn>
                  <TableColumn flexGrow={1} align="center">
                    <TableHeaderCell>50</TableHeaderCell>
                    <TableCell style={{ padding: 4 }}  dataKey="50" />
                  </TableColumn>
                  <TableColumn flexGrow={1} align="center">
                    <TableHeaderCell>52</TableHeaderCell>
                    <TableCell style={{ padding: 4 }}  dataKey="52" />
                  </TableColumn>
                  <TableColumn flexGrow={1} align="center">
                    <TableHeaderCell>54</TableHeaderCell>
                    <TableCell style={{ padding: 4 }}  dataKey="54" />
                  </TableColumn>
                  <TableColumn flexGrow={1} align="center">
                    <TableHeaderCell>56</TableHeaderCell>
                    <TableCell style={{ padding: 4 }}  dataKey="56" />
                  </TableColumn>
                  <TableColumn flexGrow={1} align="center">
                    <TableHeaderCell>58</TableHeaderCell>
                    <TableCell style={{ padding: 4 }}  dataKey="58" />
                  </TableColumn>
                  <TableColumn flexGrow={1} align="center">
                    <TableHeaderCell>60</TableHeaderCell>
                    <TableCell style={{ padding: 4 }}  dataKey="60" />
                  </TableColumn>
                  <TableColumn flexGrow={1} align="center">
                    <TableHeaderCell>62</TableHeaderCell>
                    <TableCell style={{ padding: 4 }}  dataKey="62" />
                  </TableColumn>
                  <TableColumn flexGrow={1} align="center">
                    <TableHeaderCell>64</TableHeaderCell>
                    <TableCell style={{ padding: 4 }}  dataKey="64" />
                  </TableColumn>
                  <TableColumn flexGrow={1} align="center">
                    <TableHeaderCell>66</TableHeaderCell>
                    <TableCell style={{ padding: 4 }}  dataKey="66" />
                  </TableColumn>
                  <TableColumn flexGrow={1} align="center">
                    <TableHeaderCell>68</TableHeaderCell>
                    <TableCell style={{ padding: 4 }}  dataKey="68" />
                  </TableColumn>
                  <TableColumn flexGrow={1} align="center">
                    <TableHeaderCell>70</TableHeaderCell>
                    <TableCell style={{ padding: 4 }}  dataKey="70" />
                  </TableColumn>
                  <TableColumn flexGrow={1} align="center">
                    <TableHeaderCell>72</TableHeaderCell>
                    <TableCell style={{ padding: 4 }}  dataKey="72" />
                  </TableColumn>
                  <TableColumn flexGrow={1} align="center">
                    <TableHeaderCell>74</TableHeaderCell>
                    <TableCell style={{ padding: 4 }}  dataKey="74" />
                  </TableColumn>
                  <TableColumn flexGrow={1} align="center">
                    <TableHeaderCell>76</TableHeaderCell>
                    <TableCell style={{ padding: 4 }}  dataKey="76" />
                  </TableColumn>
                  <TableColumn flexGrow={1} align="center">
                    <TableHeaderCell>78</TableHeaderCell>
                    <TableCell style={{ padding: 4 }}  dataKey="78" />
                  </TableColumn>
                </Table>
                {/* <pre>{JSON.stringify(dataTableUp, null, 2)}</pre> */}
              </>
            )}
          </Tabs.Tab>
          <Tabs.Tab eventKey="3" title="Прибавки ВЕРХА">
            {dataTableUp && (
              <>
                <Table
                  autoHeight
                  width={430}
                  headerHeight={70}
                  data={incrementUp}
                  hover={true}
                  bordered={true}
                  cellBordered={true}
                  virtualized
                  rowHeight={30}
                >
                  <TableColumn width={150} align="center" verticalAlign='middle'>
                      <TableHeaderCell>Группа растяжимости</TableHeaderCell>
                      <TableCell style={{ padding: 4 }}  dataKey="Group" />
                  </TableColumn>
                  <TableColumn width={120} align="center" verticalAlign='middle'>
                      <TableHeaderCell>Мерка</TableHeaderCell>
                      <TableCell style={{ padding: 4 }}  dataKey="Measure" />
                  </TableColumn>
                  <ColumnGroup header="Диапазон" align="center" verticalAlign='middle'>
                    <TableColumn width={80} verticalAlign='middle' align="center">
                        <TableHeaderCell>от</TableHeaderCell>
                        <TableCell style={{ padding: 4 }}  dataKey="From" />
                    </TableColumn>
                    <TableColumn width={80} verticalAlign='middle' align="center">
                        <TableHeaderCell>до</TableHeaderCell>
                        <TableCell style={{ padding: 4 }}  dataKey="To" />
                    </TableColumn>
                  </ColumnGroup>
                </Table>
                <div style={{margin: '20px 0'}}>
                  Диапазон прибавки должен быть не меньше величины прибавки изделия между размерами (в круговую)
                </div>
              </>
            )}
          </Tabs.Tab>
          <Tabs.Tab eventKey="4" title="Табличные данные НИЗА">
          {dataTableDown && (
            <>
              <Table
                maxHeight={height-325}
                autoHeight
                data={dataTableDown}
                hover={true}
                bordered={true}
                cellBordered={true}
                virtualized
                rowHeight={30}
              >
                <TableColumn width={80} align="center" fixed>
                  <TableHeaderCell>Ростовка</TableHeaderCell>
                  <TableCell style={{ padding: 4 }} dataKey="Height" />
                </TableColumn>
                <TableColumn width={80} align="center" fixed>
                  <TableHeaderCell>Измерение</TableHeaderCell>
                  <TableCell style={{ padding: 4 }} dataKey="Letter" />
                </TableColumn>
                <TableColumn flexGrow={1} align="center">
                  <TableHeaderCell>28</TableHeaderCell>
                  <TableCell style={{ padding: 4 }}  dataKey="28" />
                </TableColumn>
                <TableColumn flexGrow={1} align="center">
                  <TableHeaderCell>30</TableHeaderCell>
                  <TableCell style={{ padding: 4 }}  dataKey="30" />
                </TableColumn>
                <TableColumn flexGrow={1} align="center">
                  <TableHeaderCell>32</TableHeaderCell>
                  <TableCell style={{ padding: 4 }}  dataKey="32" />
                </TableColumn>
                <TableColumn flexGrow={1} align="center">
                  <TableHeaderCell>34</TableHeaderCell>
                  <TableCell style={{ padding: 4 }}  dataKey="34" />
                </TableColumn>
                <TableColumn flexGrow={1} align="center">
                  <TableHeaderCell>36</TableHeaderCell>
                  <TableCell style={{ padding: 4 }}  dataKey="36" />
                </TableColumn>
                <TableColumn flexGrow={1} align="center">
                  <TableHeaderCell>38</TableHeaderCell>
                  <TableCell style={{ padding: 4 }}  dataKey="38" />
                </TableColumn>
                <TableColumn flexGrow={1} align="center">
                  <TableHeaderCell>40</TableHeaderCell>
                  <TableCell style={{ padding: 4 }}  dataKey="40" />
                </TableColumn>
                <TableColumn flexGrow={1} align="center">
                  <TableHeaderCell>42</TableHeaderCell>
                  <TableCell style={{ padding: 4 }}  dataKey="42" />
                </TableColumn>
                <TableColumn flexGrow={1} align="center">
                  <TableHeaderCell>44</TableHeaderCell>
                  <TableCell style={{ padding: 4 }}  dataKey="44" />
                </TableColumn>
                <TableColumn flexGrow={1} align="center">
                  <TableHeaderCell>46</TableHeaderCell>
                  <TableCell style={{ padding: 4 }}  dataKey="46" />
                </TableColumn>
                <TableColumn flexGrow={1} align="center">
                  <TableHeaderCell>48</TableHeaderCell>
                  <TableCell style={{ padding: 4 }}  dataKey="48" />
                </TableColumn>
                <TableColumn flexGrow={1} align="center">
                  <TableHeaderCell>50</TableHeaderCell>
                  <TableCell style={{ padding: 4 }}  dataKey="50" />
                </TableColumn>
                <TableColumn flexGrow={1} align="center">
                  <TableHeaderCell>52</TableHeaderCell>
                  <TableCell style={{ padding: 4 }}  dataKey="52" />
                </TableColumn>
                <TableColumn flexGrow={1} align="center">
                  <TableHeaderCell>54</TableHeaderCell>
                  <TableCell style={{ padding: 4 }}  dataKey="54" />
                </TableColumn>
                <TableColumn flexGrow={1} align="center">
                  <TableHeaderCell>56</TableHeaderCell>
                  <TableCell style={{ padding: 4 }}  dataKey="56" />
                </TableColumn>
                <TableColumn flexGrow={1} align="center">
                  <TableHeaderCell>58</TableHeaderCell>
                  <TableCell style={{ padding: 4 }}  dataKey="58" />
                </TableColumn>
                <TableColumn flexGrow={1} align="center">
                  <TableHeaderCell>60</TableHeaderCell>
                  <TableCell style={{ padding: 4 }}  dataKey="60" />
                </TableColumn>
                <TableColumn flexGrow={1} align="center">
                  <TableHeaderCell>62</TableHeaderCell>
                  <TableCell style={{ padding: 4 }}  dataKey="62" />
                </TableColumn>
                <TableColumn flexGrow={1} align="center">
                  <TableHeaderCell>64</TableHeaderCell>
                  <TableCell style={{ padding: 4 }}  dataKey="64" />
                </TableColumn>
                <TableColumn flexGrow={1} align="center">
                  <TableHeaderCell>66</TableHeaderCell>
                  <TableCell style={{ padding: 4 }}  dataKey="66" />
                </TableColumn>
                <TableColumn flexGrow={1} align="center">
                  <TableHeaderCell>68</TableHeaderCell>
                  <TableCell style={{ padding: 4 }}  dataKey="68" />
                </TableColumn>
                <TableColumn flexGrow={1} align="center">
                  <TableHeaderCell>70</TableHeaderCell>
                  <TableCell style={{ padding: 4 }}  dataKey="70" />
                </TableColumn>
                <TableColumn flexGrow={1} align="center">
                      <TableHeaderCell>72</TableHeaderCell>
                      <TableCell style={{ padding: 4 }}  dataKey="72" />
                </TableColumn>
                <TableColumn flexGrow={1} align="center">
                  <TableHeaderCell>74</TableHeaderCell>
                  <TableCell style={{ padding: 4 }}  dataKey="74" />
                </TableColumn>
                <TableColumn flexGrow={1} align="center">
                  <TableHeaderCell>76</TableHeaderCell>
                  <TableCell style={{ padding: 4 }}  dataKey="76" />
                </TableColumn>
                <TableColumn flexGrow={1} align="center">
                    <TableHeaderCell>78</TableHeaderCell>
                  <TableCell style={{ padding: 4 }}  dataKey="78" />
                </TableColumn>
              </Table>
              {/* <pre>{JSON.stringify(dataTableDown, null, 2)}</pre> */}
            </>
          )}
          </Tabs.Tab>
          <Tabs.Tab eventKey="5" title="Прибавки НИЗА">
          {dataTableDown && (
            <>
              <Table
                autoHeight
                width={430}
                headerHeight={70}
                data={incrementDown}
                hover={true}
                bordered={true}
                cellBordered={true}
                virtualized
                rowHeight={30}
              >
                <TableColumn width={150} align="center" verticalAlign='middle'>
                    <TableHeaderCell>Группа растяжимости</TableHeaderCell>
                    <TableCell style={{ padding: 4 }}  dataKey="Group" />
                </TableColumn>
                <TableColumn width={120} align="center" verticalAlign='middle'>
                    <TableHeaderCell>Мерка</TableHeaderCell>
                    <TableCell style={{ padding: 4 }}  dataKey="Measure" />
                </TableColumn>
                <ColumnGroup header="Диапазон" align="center" verticalAlign='middle'>
                  <TableColumn width={80} verticalAlign='middle' align="center">
                      <TableHeaderCell>от</TableHeaderCell>
                      <TableCell style={{ padding: 4 }}  dataKey="From" />
                  </TableColumn>
                  <TableColumn width={80} verticalAlign='middle' align="center">
                      <TableHeaderCell>до</TableHeaderCell>
                      <TableCell style={{ padding: 4 }}  dataKey="To" />
                  </TableColumn>
                </ColumnGroup>
              </Table>
              <div style={{margin: '20px 0'}}>
                Диапазон прибавки должен быть не меньше величины прибавки изделия между размерами (в круговую)
              </div>
            </>
          )}
          </Tabs.Tab>
        </Tabs>
      </Container>
    </CustomProvider>
  );
}

export default App;