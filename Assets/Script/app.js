const cl = console.log;

const billAmount = document.getElementById("bill-amount");
const cashAmount = document.getElementById("cash-amount");
const returnAmount = document.getElementById("return-amount");

const returnValue = document.getElementById("return-value");

const errorMsg = document.getElementById("errorMsg");

const totalBillAmount = billAmount.querySelector("input");
const cashGivenAmount = cashAmount.querySelector("input");

const notesNumber = document.getElementById("notes-number");

const nextBtn = billAmount.querySelector("button");
const checkBtn = cashAmount.querySelector("button");
const moneyList = [2000, 500, 100, 20, 10, 5, 1];

const Visibility = (element) => {
  element.classList.remove("notVisible");
};
const hideVisibility = (element) => {
  element.classList.add("notVisible");
};
const clearInputs = () => {
  totalBillAmount.innerHTML = "";
  cashGivenAmount.innerHTML = "";
};

const addChange = (amount) => {
  let remainingAmount = amount;

  //   LOGIC 1 :- While Loop

  //   moneyList.forEach((item, idx) => {
  //     if (remainingAmount >= item) {
  //       // cl("inside ",remainingAmount," ",item)  ;
  //       let no = 0;
  //       while (item <= remainingAmount) {
  //         remainingAmount -= item;
  //         no += 1;
  //       }
  //       cl("Note ", item, " & No ", no, " &idx", idx);
  //       notesNumber.children[idx + 1].textContent = no;
  //     } else {
  //       notesNumber.children[idx + 1].textContent = "*";
  //     }
  //   });

  //   LOGIC 2 :- Math.floor

  moneyList.forEach((item, idx) => {
    if (remainingAmount >= item) {
      const no = Math.floor(remainingAmount / item);
      remainingAmount -= item * no;
      notesNumber.children[idx + 1].textContent = no;
      notesNumber.children[idx + 1].fontSize = "x-large";
    } else {
      notesNumber.children[idx + 1].textContent = "*";
      notesNumber.children[idx + 1].style.color = "red";
      notesNumber.children[idx + 1].innerHTML = `<i class="fas fa-times"></i>`;
    }
  });
};
const nextBtnHandler = () => {
  const totalBill = +totalBillAmount.value.trim();

  //   Check for Error
  if (totalBill < 1 || totalBill === "") {
    errorMsg.textContent = "Please check BILL AMOUNT input";
    Visibility(errorMsg);
    return;
  }

  //   show Cash Given container
  hideVisibility(errorMsg);
  Visibility(cashAmount);
};

const checkBtnHandler = () => {
    
    document.querySelector("footer").style.position = "relative";
  const cashGiven = +cashGivenAmount.value.trim();
  const totalBill = +totalBillAmount.value.trim();

  //   check For Error
  if (cashGiven === "") {
    errorMsg.textContent = "Please check CASH GIVEN AMOUNT input";
    Visibility(errorMsg);
    hideVisibility(returnAmount);
    return;
  } else if (cashGiven < totalBill) {
    cl(cashGiven, "Else if", totalBill);
    errorMsg.textContent = `You Have given " ${
      totalBill - cashGiven
    } " Rs less amout`;
    Visibility(errorMsg);
    hideVisibility(returnAmount);
    return;
  } else if (cashGiven === totalBill) {
    errorMsg.textContent = `PERFECT CASH ! no amount should be return`;
    Visibility(errorMsg);
    hideVisibility(returnAmount);
    return;
  }

  // calculate the Change and Add them to Table
  returnValue.textContent = `" ${cashGiven - totalBill} "`;
  addChange(cashGiven - totalBill);

  //   show Cash Given container
  hideVisibility(errorMsg);
  Visibility(returnAmount);
};

nextBtn.addEventListener("click", nextBtnHandler);
checkBtn.addEventListener("click", checkBtnHandler);
