# Instruction for How to Use This Tool



## 1. Design a FSM

### 1.1 Complete the parameter setting table

#### 1.1.1 Step One

* **entityName**

  ​	This parameter is **the name of the FSM system** that you are going to create. It is mainly used in the code generator.

* **inputNumber && outputNumber**

  ​	You should first give **the numbers of the inputs and outputs **so that we can build up the next step for parameter setting table.

* **inputType && outputType**

  ​	You should tell us the types of the inputs and outputs. There are two types, namely **bit type** which only has two possible value '0' and '1' and **bit_vector** **type** which can has multiple bits.

  ​	When it comes to the bit_vector type, you need to determine the range of it (from X down 0 means there are (X + 1) bits).

![image-20210202090109687](E:\learn\NUS\FYP\FSM Simulation1\img\stepOne.png)

#### 1.1.2 Step Two

​	You should give the names of each input and output which will be used in code generator later. As you might notice,  This step is created based on the numbers of the inputs and outputs you have given at step one.

​	If you want to change the parameters at step one, just click the Last button, then you can go back to do some modifications.

![image-20210202090432525](E:\learn\NUS\FYP\FSM Simulation1\img\stepTwo.png)

#### 1.1.3 Finish

​	All the necessary information set at parameter setting table will be presented after you click the Finish button, and of course, if you want to go back to do some modifications, feel free to click the Last button.

![image-20210202090807135](E:\learn\NUS\FYP\FSM Simulation1\img\finish.png)

### 1.2 Draw State Diagram

​	Note that you should go to this part after you have finished the parameter setting table, otherwise you might be disturbed when many reminders or alerts pop up constantly even though you are still able to draw a state diagram.

	#### 1.2.1 Draw a State

​	You just need to click the **addState button** every time when you want to create a new state. After that, you can freely drag the state (circle) by keeping pressing the mouse.

#### 1.2.2 Draw a Transition

​	When you want to create a transition between two states, the first thing you should do is to move your mouse at the edge of one of the two states (circles), then you will be lucky enough to see your mouse turns into a crosshairs. 

​	After that, just press and drag your mouse, you will see you are creating a line. Until your mouse enter the state (circle) that you want to link, just feel free to release your mouse and a transition will be created. Of course, if you want to create a transition between a same state, just drag your mouse until entering the same state (circle).

![image-20210202093934976](E:\learn\NUS\FYP\FSM Simulation1\img\drawTransition.png)

#### 1.2.3 Change the State Names

​	This tool allows you to freely change the state names if you want to. What you need to do is to **double click** the state (circle), then you can change the names.

​	Note that you should give a name with length between **1 and 6**. Initially, the names will be set as stateX.

#### 1.2.4 Set the Start State

​	There is a button called setStartState, select a state (circle), click the button, then the state will be set as the start state being around with a big circle.

#### 1.2.5 Delete Operations

​	There is a button called delete, select a state (circle) or a transition (line), click the button, then the selected state or transition will be deleted. 

​	Note that when you delete a state, all the relevant transitions will be also reasonably deleted.

### 1.3 Transitions && Outputs setting

​	Now, you might have finished the state diagram, but before a FSM is determined, you have to specify the conditions and outputs of each transition. 

​	You should notice that every time when you select a transition (line), there is a information table presented at your right-hand side. Please specify the conditions (inputs) and outputs trough the information table.

​	If you are designing a Moore type FSM, you can set the outputs of each state with the same value.

​	If a state has only one transition or the inputs are irrelevant for its transitions, you can set the condition values as 'X'.

![image-20210202102328532](E:\learn\NUS\FYP\FSM Simulation1\img\informationTable.png)

After you have set all the necessary parameters, it means you have designed and determined a FSM and you can get the HDL codes related to this FSM as well as simulate it.

## 2. Generate HDL Code

​	Please click the show code button after the FSM design, and you will get the HDL codes if your FSM is correct and logical. 

​	If you want to modify your FSM, note that you need to click the update button every time after the modification.

## 3. Simulation





















