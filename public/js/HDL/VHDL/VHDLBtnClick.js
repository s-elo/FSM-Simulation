import {updateData} from '../../dataHandler/dataHandler.js';
import {isElementEqual, isAllX, conditionCreator} from '../generatorUtils/generatorUtils.js';
import VHDLInit from './VHDLInit.js';

export default function VHDLBtnClick() {
  VHDLInit();

  const $contentVHDL = $(".VHDL code");

  updateData();
  //console.log(outputForEachTran)

  /**
   * the first two code lines
   */
  //comments
  $contentVHDL.append(`<span class="lineBlock">
                              <span class="comment">-- using necessary libraries</span>
                           </span>`);
  lineNumber++;

  let $libCode = $(`<span class="lineBlock">
                          <span class="keyWord">library </span>
                          <span>ieee;</span>
                      </span>
                      <span class="lineBlock">
                          <span class="keyWord">use </span>
                          <span>ieee.std_logic_1164.all;</span>
                      </span>`);
  $contentVHDL.append($libCode);
  lineNumber = lineNumber + 2;

  $contentVHDL.append(`<span class="lineBlock">&nbsp;</span>`);

  /**
   * code lines for defining a entity
   */
  //comments
  $contentVHDL.append(`<span class="lineBlock">
                              <span class="comment">-- entity definition</span>
                           </span>`);
  lineNumber++;

  let entityDef = `<span class="lineBlock">
                              <span class="keyWord">entity</span>
                              <span class="entityName">${entityName}</span>
                              <span> is</span>
                          </span>
                          <span class="lineBlock">
                              <span>&nbsp;&nbsp;</span>
                              <span class="keyWord ">port</span>
                              <span>(</span>`;

  //in
  for (let i = 0; i < inputNum; i++) {
    entityDef += `<span>${inputName[i]}, </span>`;
  }

  entityDef += `<span>clk, rst: </span><span class="in">in </span>`;

  if (inputTypeVal === "bit") {
    entityDef += `<span class="Type">bit</span>
                        <span class="moveSpace">;</span>
                        </span>`;
  } else {
    entityDef += `<span class="Type">bit_vector(${inputFromVal} downto ${inputToVal})</span>
                        <span>;</span>
                        </span>`;
  }

  //out
  entityDef += `<span class="lineBlock">
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
  for (let i = 0; i < outputNum; i++) {
    if (i === outputNum - 1) {
      entityDef += `<span>${outputName[i]}: </span>`;
    } else {
      entityDef += `<span>${outputName[i]}, </span>`;
    }
  }

  entityDef += `<span class="in">out </span>`;
  if (outputTypeVal === "bit") {
    entityDef += `<span class="Type">bit</span>`;
  } else {
    entityDef += `<span class="Type">bit_vector(${outputFromVal} downto ${outputToVal})</span>`;
  }

  entityDef += `<span>);</span></span>`;

  entityDef += `<span class="lineBlock">
                      <span class="keyWord">end </span>
                      <span class="entityName">${entityName}</span>
                      <span class="moveSpace">;</span>
                    </span>`;

  $contentVHDL.append(entityDef);

  lineNumber = lineNumber + 5;

  $contentVHDL.append(`<span class="lineBlock">&nbsp;</span>`);

  /**
   * code lines for defining the states
   */
  let stateDef = `<span class="lineBlock">
                          <span class="keyWord">architecture </span>
                          <span class="entityName">${entityName} </span>
                          <span>of </span>
                          <span class="entityName">${entityName} </span>
                          <span>is</span>
                      </span>`;

  //comments
  $contentVHDL.append(`<span class="lineBlock">
                              <span class="comment">-- define a states type</span>
                           </span>`);
  lineNumber++;

  //declare the names of states
  stateDef += `<span class="lineBlock">
                      <span>&nbsp;&nbsp;</span>
                      <span class="keyWord">type states </span>
                      <span>is (</span>`;

  $.each(stateName, function (index, value) {
    if (index === stateName.length - 1) {
      stateDef += `<span>${value});</span></span>`;
    } else {
      stateDef += `<span>${value}, </span>`;
    }
  });

  //define the states type signals
  stateDef += `<span class="lineBlock">
                      <span>&nbsp;&nbsp;</span>
                      <span class="keyWord">signal</span>
                      <span>pre, nextState: </span>
                      <span class="keyWord">states</span>
                      <span class="moveSpace">;</span>
                   </span>`;

  $contentVHDL.append(stateDef);

  lineNumber += 4;

  $contentVHDL.append(`<span class="lineBlock">&nbsp;</span>`);

  /**
   * code lines for the lower part
   */
  //comments
  $contentVHDL.append(`<span class="lineBlock">
                              <span class="comment">-- define the lower section</span>
                           </span>`);
  lineNumber++;

  let lowerdef = `<span class="lineBlock">
                          <span>&nbsp;&nbsp;</span>
                          <span class="keyWord">begin</span>
                      </span>
                      <span class="lineBlock">
                          <span>&nbsp;&nbsp;</span>
                          <span>lower: </span>
                          <span class="keyWord">process</span>
                          <span>(clk, rst)</span>
                      </span>
                      <span class="lineBlock">
                          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          <span class="keyWord">begin</span>
                      </span>
                      <span class="lineBlock">
                          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          <span class="keyWord">if </span>
                          <span>(rst = </span>
                          <span class="value moveSpace">'1'</span>
                          <span class="moveSpace">) </span>
                          <span class="keyWord">then </span>
                          <span>pre <= ${stateName[start - 1]};</span>
                      </span>
                      <span class="lineBlock">
                          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          <span class="keyWord">elsif </span>
                          <span>(clk'event</span>
                          <span class="in"> and </span>
                          <span>clk = </span>
                          <span class="value moveSpace">'1'</span>
                          <span class="moveSpace">) </span>
                          <span class="keyWord">then </span>
                          <span>pre <= nextState;</span>
                      </span>
                      <span class="lineBlock">
                          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          <span class="keyWord">end if </span>
                          <span class="moveSpace">;</span>
                      </span>
                      <span class="lineBlock">
                          <span>&nbsp;&nbsp;</span>
                          <span class="keyWord">end </span>
                          <span>process lower;</span>
                      </span>`;

  $contentVHDL.append(lowerdef);

  lineNumber += 8;

  $contentVHDL.append(`<span class="lineBlock">&nbsp;</span>`);

  /**
   * code lines for upper part
   */
  //comments
  $contentVHDL.append(`<span class="lineBlock">
                              <span class="comment">-- define the upper section (behaviours)</span>
                           </span>`);
  lineNumber++;

  let upperInit = `<span class="lineBlock">
                          <span>&nbsp;&nbsp;</span>
                          <span>upper: </span>
                          <span class="keyWord">process</span>
                          <span>(</span>`;

  for (let i = 0; i < inputNum; i++) {
    upperInit += `<span>${inputName[i]}, </span>`;
  }

  upperInit += `<span>pre)</span></span>
                    <span class="lineBlock">
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <span class="keyWord">begin</span>
                    </span>`;

  $contentVHDL.append(upperInit);

  lineNumber += 3;

  // transitions handling
  let transitionCode = `<span class="lineBlock">
                              <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                              <span class="keyWord">case</span>
                              <span>pre is</span>
                            </span>`;
  lineNumber++;

  // each state
  for (let i = 1; i <= stateNumber; i++) {
    if (i > 1) {
      transitionCode += `<span class="lineBlock">&nbsp;</span>`;
      lineNumber++;
    }

    transitionCode += `<span class="lineBlock">
                                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                  <span class="keyWord">when</span>
                                  <span>${stateName[i - 1]} => </span>
                             </span>`;
    lineNumber++;

    //when the output of every transition is the same (moore)
    //console.log(outputForEachTran[i])
    if (isElementEqual(outputForEachTran[i])) {
      //handle the outputs
      for (let j = 0; j < Tline[i].length; j++) {
        if (Tline[i][j] != 0) {
          for (let k = 0; k < outputNum; k++) {
            if (outputTypeFlag) {
              transitionCode += `<span class="lineBlock">
                                                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                      <span>${outputName[k]} <= </span>
                                                      <span class="value moveSpace">'${outputForEachTran[i][j][k]}'</span>
                                                      <span class="moveSpace">;</span>
                                                 </span>`;
            }
            //bit_vector using ""
            else {
              transitionCode += `<span class="lineBlock">
                                                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                      <span>${outputName[k]} <= </span>
                                                      <span class="value moveSpace">"${outputForEachTran[i][j][k]}"</span>
                                                      <span class="moveSpace">;</span>
                                                 </span>`;
            }
          }
          lineNumber += outputNum;
          break;
        }
      }

      //handle the transitions
      let count = 1;
      let conFlag = 1; //see if it is unconditional

      for (let j = 0; j < Tline[i].length; j++) {
        if (Tline[i][j] != 0) {
          //when it is uncondiotional transition
          if (isAllX(inputCondition[i][j])) {
            transitionCode += `<span class="lineBlock">
                                                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                  <span>nextState <= ${
                                                    stateName[j - 1]
                                                  };</span>
                                             </span>`;
            lineNumber++;
            //if it unconditional, it can only have one transition
            conFlag = 0;
            break;
          } else {
            //if it is the first one
            if (count == 1) {
              count++;
              transitionCode += `<span class="lineBlock">
                                                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                      <span class="keyWord">if </span>
                                                      <span>(</span>
                                                      ${conditionCreator(
                                                        inputCondition[i][j]
                                                      )}
                                                      <span>) </span>
                                                      <span class="keyWord">then</span>
                                                 </span>
                                                 <span class="lineBlock">
                                                         <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                         <span>nextState <= ${
                                                           stateName[j - 1]
                                                         };</span>	
                                                     </span>`;
              lineNumber += 2;
            } else {
              transitionCode += `<span class="lineBlock">
                                                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                      <span class="keyWord">elsif </span>
                                                      <span>(</span>
                                                      ${conditionCreator(
                                                        inputCondition[i][j]
                                                      )}
                                                      <span>) </span>
                                                      <span class="keyWord">then</span>
                                                 </span>
                                                 <span class="lineBlock">
                                                         <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                         <span>nextState <= ${
                                                           stateName[j - 1]
                                                         };</span>	
                                                     </span>`;
              lineNumber += 2;
            }
          }
        }
      }

      if (conFlag) {
        transitionCode += `<span class="lineBlock">
                                          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                          <span class="keyWord">end if </span>
                                          <span class="moveSpace">;</span>	
                                      </span>`;
        lineNumber++;
      }
    }

    //when the output of every transition is not the same (mealy)
    else {
      //handle the transitions
      let count = 1;
      let conFlag = 1; //see if it is unconditional

      for (let j = 0; j < Tline[i].length; j++) {
        if (Tline[i][j] != 0) {
          //when it is uncondiotional transition
          if (isAllX(inputCondition[i][j])) {
            transitionCode += `<span class="lineBlock">
                                                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                  <span>nextState <= ${
                                                    stateName[j - 1]
                                                  };</span>
                                             </span>`;
            //output
            for (let k = 0; k < outputNum; k++) {
              if (outputTypeFlag) {
                transitionCode += `<span class="lineBlock">
                                                          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                          <span>${outputName[k]} <= </span>
                                                          <span class="value moveSpace">'${outputForEachTran[i][j][k]}'</span>
                                                          <span class="moveSpace">;</span>
                                                     </span>`;
              }
              //bit_vector using ""
              else {
                transitionCode += `<span class="lineBlock">
                                                          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                          <span>${outputName[k]} <= "</span>
                                                          <span class="value moveSpace">"${outputForEachTran[i][j][k]}"</span>
                                                          <span class="moveSpace">;</span>
                                                     </span>`;
              }
            }

            lineNumber += outputNum + 1;
            //if it unconditional, it can only have one transition
            conFlag = 0;
            break;
          } else {
            //if it is the first one
            if (count == 1) {
              count++;
              transitionCode += `<span class="lineBlock">
                                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <span class="keyWord">if </span>
                                    <span>(</span>
                                    ${conditionCreator(inputCondition[i][j])}
                                                      <span>) </span>
                                                      <span class="keyWord">then</span>
                                                 </span>
                                                 <span class="lineBlock">
                                                         <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                         <span>nextState <= ${
                                                           stateName[j - 1]
                                                         };</span>	
                                                     </span>`;
              //output
              for (let k = 0; k < outputNum; k++) {
                if (outputTypeFlag) {
                  transitionCode += `<span class="lineBlock">
                                                              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                              <span>${outputName[k]} <= </span>
                                                              <span class="value moveSpace">'${outputForEachTran[i][j][k]}'</span>
                                                              <span class="moveSpace">;</span>
                                                         </span>`;
                }
                //bit_vector using ""
                else {
                  transitionCode += `<span class="lineBlock">
                                                              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                              <span>${outputName[k]} <= </span>
                                                              <span class="value moveSpace">"${outputForEachTran[i][j][k]}"</span>
                                                              <span class="moveSpace">;</span>
                                                         </span>`;
                }
              }
              lineNumber += 2 + outputNum;
            } else {
              transitionCode += `<span class="lineBlock">
                                                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                      <span class="keyWord">elsif </span>
                                                      <span>(</span>
                                                      ${conditionCreator(
                                                        inputCondition[i][j]
                                                      )}
                                                      <span>) </span>
                                                      <span class="keyWord">then</span>
                                                 </span>
                                                 <span class="lineBlock">
                                                         <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                         <span>nextState <= ${
                                                           stateName[j - 1]
                                                         };</span>	
                                                     </span>`;
              //output
              for (let k = 0; k < outputNum; k++) {
                if (outputTypeFlag) {
                  transitionCode += `<span class="lineBlock">
                                                              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                              <span>${outputName[k]} <= </span>
                                                              <span class="value moveSpace">'${outputForEachTran[i][j][k]}'</span>
                                                              <span class="moveSpace">;</span>
                                                         </span>`;
                }
                //bit_vector using ""
                else {
                  transitionCode += `<span class="lineBlock">
                                                              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                              <span>${outputName[k]} <= </span>
                                                              <span class="value moveSpace">"${outputForEachTran[i][j][k]}"</span>
                                                              <span class="moveSpace">;</span>
                                                         </span>`;
                }
              }

              lineNumber += 2 + outputNum;
            }
          }
        }
      }

      if (conFlag) {
        transitionCode += `<span class="lineBlock">
                                          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                          <span class="keyWord">end if </span>
                                          <span class="moveSpace">;</span>	
                                      </span>`;
        lineNumber++;
      }
    }
  }

  $contentVHDL.append(transitionCode);

  let endCode = `<span class="lineBlock">
                          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          <span class="keyWord">end case</span>
                          <span class="moveSpace">;</span>
                     </span>
                     <span class="lineBlock">
                             <span>&nbsp;&nbsp;</span>
                             <span class="keyWord">end </span>
                             <span>process upper;</span>			
                         </span>
                      <span class="lineBlock">
                          <span class="keyWord">end </span>
                          <span class="entityName">${entityName}</span>		
                          <span class="moveSpace">;</span>
                      </span>`;

  lineNumber += 3;
  $contentVHDL.append(endCode);

  lineNumber += 1;
  $(".VHDL .pre-numbering").css("display", "block");
  for (let i = 1; i <= lineNumber; i++) {
    $(".VHDL .pre-numbering").append(`<li>${i}</li>`);
  }

  // //make sure the height of the marks is the same as the lines
  // var height = $('.VHDL .pre-numbering li').css('height');//px

  // $('.lineBlock').css('height', height);
}
