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

### 3.1 Introduction of Simulator Interface

​	The simulator interface is shown as the figure below. From top to the bottom, it consists of the entityName, changing mode switching button, current changing mode, clock signal scale, clock signal, input signals, current state indication and output signals.

<img src="D:\NUSRI\instruction\simulation interface.png" alt="simulation interface"  />

​	All the names including the entityName, the input signal names, the state name in the current state indication part and the output signal names show the corresponding content you have typed in the design part. 

​	The changing mode switching button will be introduced in detail in the following instruction. And you can check the current changing mode right below the button. 

​	The clock signal scale is fixed because the detailed time of clock signal only affects the practical working process of the FSM but has no effect on the understanding of the whole transition relationship.  You can change the clock signal in your detailed HDL codes. In this simulator, each scale of the clock signal represents 100 ns.

### 3.2 Clock Signal

​	The clock signal in the system is falling edge valid and is fixed as the figure in the introduction of simulator interface. It means the input of the last period will determine the state transition and the output of this period. The clock signal of this simulator has 20 periods. Considering this system is designed mostly for the beginners of FSM and the FSMs designed by them are not very complicated, 20 periods are enough for the users. 

### 3.3 Input

#### 3.3.1 Display of the Input Signal

​	If your FSM has multiple input signals, they will list in the same order you type in the design part. The signals in the system is divided into two kinds, one bit signal and multiple bits signal. The system has one limit that all the input or the output signals are the same kind. But this doesn't have big effect on the design because one bit signal can be  expressed by multiple bits signal by adding disused bits. One bit signals and multiple bits signals are displayed in different ways. For one bit signal, it only has two values, 0 or 1, so it can be displayed as square wave. For multiple bits signal, they are displayed by two parallel lines which will have overlapping at the interface of two periods if ang change happens here. The example is shown in the figure below where the multiple bits signal has two bits.

![display of inputs](D:\NUSRI\instruction\display of inputs.png)

#### 3.3.2 Change the Input Value

​	To test whether your FSM works well as your wish, the value of input signal can be change. In this simulator, the values of different periods can be changed by clicking your mouse at the position of corresponding periods. The methods for changing one bit input signal and multiple bits signal are different. And the simulator supports two changing modes. You can change the value in one period and also, you can change the values of adjacent multiple periods together.

##### 3.3.2.1 Change the One Bit Input

​	As mentioned before, the one bit input signal only has two possible values, 0 or 1. So the user can switch the value to the other by clicking your mouse one time. All the one bit input signals are originally set as 1 during all 20 periods at the beginning. If you want to change the value of one bit input signal one period by one period, firstly, you have to check the changing mode right now. The default changing mode is changing one period mode. At this mode, you just need to click your mouse at the corresponding position of the period. The change process is shown as below. In this figure, the red circle shows the position of clicking.

![one bit one period](D:\NUSRI\instruction\one bit one period.png)

​	If you want to change the change the values of adjacent multiple periods together, firstly, you have to clicking the changing mode switching button at the top of the simulator. After making sure that the simulator is working at multiple periods changing mode, you need to choose the starting period and the end period of the multiple adjacent multiple periods of which you want to change the values. The method of choosing the period is the same as how you change the value of one period. And you can also change the value of one period in the multiple periods changing mode by clicking one period twice. The changing process is shown as below. In this figure, the red circle shows the position of clicking.

![one bit multiple periods](D:\NUSRI\instruction\one bit multiple periods.png)

​	In the multiple periods changing mode, the order of your first and second clicking has no effect on the final result of changing. And if you make a mistake clicking or regret the changing plan after the first clicking, you only need to click the cancel button at  the same position of the changing mode switch button. You can find that after your first clicking, the changing mode switching button will turn to the cancel button. And after you finish the changing work, it will turn back to the changing mode switching button as the figure below.

![the button](D:\NUSRI\instruction\the button.png)

##### 3.3.2.2 Change the Multiple Bits Input

​		The method of choosing the one period or multiple periods you of which you want to change the values for the multiple bits input is the same as that for one bit input by clicking. The only difference is the method to giving the values. For one bit input, it only has two possible values, but for multiple bits input, it has many possible values. The simulator allows the users to type the values they want directly after choosing the periods. After choosing the period by clicking, a window will jump out for you to type the value you want. The process is shown in the figure below.

![multiple bits](D:\NUSRI\instruction\multiple bits.png)

​	It should be noted that all the multiple bits input signals are originally set as 0 during all 20 periods at the beginning. And if you choose multiple periods changing mode, the values of the periods you have chosen will become the same as the value you have typed. And this is different from the situation in the one bit input which will switch to the other value rater than becoming the same. Other operations in the multiple periods changing mode are the same as those in the one period changing mode.

### 3.3 Current State Indication

​	The current state is using the same display method as that of multiple bits signals. The state in the first period is the startState you have set in the design part. Apart from the first period, the state of this period is decided by the inputs of the last period. The current state indication is designed to tell the users what state the FSM is staying at in the corresponding period. And this will help the users understand the working process of the FSM they have designed.

### 3.4 Output

​	The display method of output signals is the same as that of input signals. Because the clock signal in the system is falling edge valid, the output in the first period is decided by the original set of the FSM. To lower the complexity of the FSM in the system, the simulator ignore the original set part. So the output in the first period is set as 0 which has no relation with the FSM itself. Apart from the first period, the output of this period is decided by the inputs of the last period.







