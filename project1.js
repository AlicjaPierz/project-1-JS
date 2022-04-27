//HELPER FUNCTIONS
// -------------------------------------------------
const qs = (selector) => document.querySelector(selector);
const qsA = (sel) => document.querySelectorAll(sel);
const cel = (el) => document.createElement(el);

//DOM ELEMENTS
// -------------------------------------------------
const addIncome = qs("#add-income");
const nameIncome = qs(".name-income");
const amountIncome = qs(".amount-income");
const incomeList = qs(".income-list");
const incomeSum = qs("#income-sum");

const addExpense = qs("#add-expense");
const nameExpense = qs(".name-expense");
const amountExpense = qs(".amount-expense");
const expenseList = qs(".expense-list");
const expenseSum = qs("#expense-sum");

const mainSum = qs("#main-sum");

// MODEL
// -------------------------------------------------

let incomeData = []; // [{ id: uuid.v4(), name: "przykład", amount: 0 }]
let incomeAmount = 0;

let expenseData = []; // { id: uuid.v4(), name2: "przychod", amount2: 0 }
let expenseAmount = 0;

//VIEW
// -------------------------------------------------
// lista przychodów
const submitIncomes = () => {
  incomeList.innerHTML = "";

  incomeData.forEach(({ id, name, amount }) => {
    let incomeLi = cel("li");

    const incomeLiName = cel("span");
    const incomeLiAmount = cel("span");

    incomeLiName.textContent = `${name}`;
    incomeLiAmount.textContent = ` ${amount} zł`;

    const deleteBtn = cel("button");
    const editBtn = cel("button");

    deleteBtn.textContent = "Usuń";
    editBtn.textContent = "Edytuj";

    incomeLi.appendChild(incomeLiName);
    incomeLi.appendChild(incomeLiAmount);

    incomeLi.appendChild(deleteBtn);
    incomeLi.appendChild(editBtn);

    //Buttony do usuwania i edytowania listy
    deleteBtn.addEventListener("click", () => {
      deleteIncome(id);
    });

    editBtn.addEventListener("click", () => {
      //usuwam <span> z nazwa i iloscia
      incomeLi.removeChild(incomeLiName);
      incomeLi.removeChild(incomeLiAmount);

      //tworze dwa inputy
      const incomeNameEdit = cel("input");
      const incomeAmountEdit = cel("input");
      incomeNameEdit.setAttribute = ("name", "editName");
      incomeAmountEdit.setAttribute = ("name", "editAmount");
      incomeLi.appendChild(incomeNameEdit);
      incomeLi.appendChild(incomeAmountEdit);
      incomeNameEdit.value = `${name}`;
      incomeAmountEdit.value = `${amount}`;

      //usuwam buttony edytuj/usun, dodaje buttony zapisz/anuluj
      incomeLi.removeChild(editBtn);
      incomeLi.removeChild(deleteBtn);

      const cancelBtn = cel("button");
      cancelBtn.textContent = "Anuluj";
      const acceptBtn = cel("button");
      acceptBtn.textContent = "Akceptuj";

      incomeLi.appendChild(cancelBtn);
      incomeLi.appendChild(acceptBtn);
    });

    incomeList.appendChild(incomeLi);
  });
};

const renderIncomes = () => {
  submitIncomes();
};

//lista wydatków
const submitExpenses = () => {
  expenseList.innerHTML = "";

  expenseData.forEach(({ id, name, amount }) => {
    let expenseLi = cel("li");

    const expenseLiName = cel("span");
    const expenseLiAmount = cel("span");

    expenseLiName.textContent = `${name}`;
    expenseLiAmount.textContent = ` ${amount} zł`;

    const deleteBtn = cel("button");
    const editBtn = cel("button");

    deleteBtn.textContent = "Usuń";
    editBtn.textContent = "Edytuj";

    expenseLi.appendChild(expenseLiName);
    expenseLi.appendChild(expenseLiAmount);

    expenseLi.appendChild(deleteBtn);
    expenseLi.appendChild(editBtn);

    //Buttony do usuwanie i edytowania listy
    deleteBtn.addEventListener("click", (e) => {
      deleteExpense(id);
    });
    // editBtn.addEventListener("click", (e) => { })

    expenseList.appendChild(expenseLi);
  });
};

const renderExpenses = () => {
  submitExpenses();
};

// UPDATE
// -------------------------------------------------

// funkcje zmieniające MODEL dla przychodów

const addIncomeData = (newIncome) => {
  const newIncomes = [...incomeData, newIncome];
  incomeData = newIncomes;
  renderIncomes();
  sumBudget();
};

const deleteIncome = (incomeId) => {
  const deleteIncomes = incomeData.filter(({ id }) => id !== incomeId);
  incomeData = deleteIncomes;
  renderIncomes();
  sumBudget();
};

const editIncome = (newIncome) => {
  const editIncomes = incomeData.map(({ income }) =>
    income.id === newIncome.id ? newIncome : income
  );
  incomeData = editIncomes;
  renderIncomes();
};

// funkcje zmieniające MODEL dla wydatków

const addExpenseData = (newExpense) => {
  const newExpenses = [...expenseData, newExpense];
  expenseData = newExpenses;
  renderExpenses();
  sumBudget();
};

const deleteExpense = (expenseId) => {
  const deleteExpenses = expenseData.filter(({ id }) => id !== expenseId);
  expenseData = deleteExpenses;
  renderExpenses();
  sumBudget();
};

// EVENTY
// -------------------------------------------------

// dla przychodów
addIncome.addEventListener("submit", (e) => {
  e.preventDefault();

  const { newName, newAmount } = e.currentTarget.elements; // targetowany atrybut name w inpucie
  const incomeId = uuid.v4();
  const newIncome = {
    id: incomeId,
    name: newName.value,
    amount: Number(newAmount.value),
  };
  addIncomeData(newIncome);

  incomeSum.innerHTML = `Suma przychodów: ${incomeSaldo()} zł`;

  renderIncomes();
  sumBudget();
});

//edycja po kliknieciu w przycisk nowa forma

const incomeSaldo = () => {
  return incomeData.reduce((acc, { amount }) => acc + amount, 0);
};

// dla wydatków
addExpense.addEventListener("submit", (e) => {
  e.preventDefault();

  const { newName2, newAmount2 } = e.currentTarget.elements; // targetowany atrybut name w inpucie
  const expenseId = uuid.v4();
  const newExpense = {
    id: expenseId,
    name: newName2.value,
    amount: Number(newAmount2.value),
  };
  addExpenseData(newExpense);

  expenseSum.innerHTML = `Suma wydatków: ${expenseSaldo()} zł`;

  sumBudget();
  renderExpenses();
});

const expenseSaldo = () => {
  return expenseData.reduce((acc, { amount }) => acc + amount, 0);
};

// SUM BUDGET
// -------------------------------------------------
const incomeAndExpenseSum = () => {
  return Number(incomeSaldo()) - Number(expenseSaldo());
};

const sumBudget = () => {
  const budget = incomeAndExpenseSum();

  if (budget > 0) {
    mainSum.innerHTML = `Możesz wydać ${budget} zł`;
  } else if (budget === 0) {
    mainSum.innerHTML = `Masz ${budget} zł`;
  } else {
    mainSum.innerHTML = `Twój budżet jest ${Math.abs(budget)} zł na minusie`;
  }
};

// START APP

renderIncomes();
renderExpenses();
