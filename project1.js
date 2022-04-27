//HELPER FUNCTIONS
// -------------------------------------------------
const qs = (selector) => document.querySelector(selector);
const qsA = (sel) => document.querySelectorAll(sel);
const cel = (el) => document.createElement(el);

//DOM ELEMENTS
// -------------------------------------------------
const addIncome = qs("#add-income");
const incomeList = qs(".income-list");
const incomeSum = qs("#income-sum");

const addExpense = qs("#add-expense");
const expenseList = qs(".expense-list");
const expenseSum = qs("#expense-sum");

const mainSum = qs("#main-sum");

// MODEL
// -------------------------------------------------

let incomeData = []; // [{ id: uuid.v4(), name: "przykład", amount: 0 }]
let amount = 0;

let expenseData = [];
let amount2 = 0;

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

      //tworze forme i dwa inputy
      const incomeEditForm = cel("form");
      const incomeNameEdit = cel("input");
      const incomeAmountEdit = cel("input");

      incomeEditForm.classList.add = "editForm";
      incomeNameEdit.classList.add = "editName";
      incomeAmountEdit.classList.add = "editAmount";

      incomeEditForm.appendChild(incomeNameEdit);
      incomeEditForm.appendChild(incomeAmountEdit);
      incomeNameEdit.value = `${name}`;
      incomeAmountEdit.value = `${amount}`;

      //usuwam buttony edytuj/usun, dodaje buttony akceptuj/anuluj
      incomeLi.removeChild(editBtn);
      incomeLi.removeChild(deleteBtn);

      const cancelBtn = cel("button");
      const acceptBtn = cel("button");

      cancelBtn.textContent = "Anuluj";
      acceptBtn.textContent = "Akceptuj";

      incomeLi.appendChild(incomeEditForm);
      incomeLi.appendChild(cancelBtn);
      incomeLi.appendChild(acceptBtn);

      // event dla akceptuj
      acceptBtn.addEventListener("click", (e) => {
        incomeLiName.textContent = incomeNameEdit.value;
        incomeLiAmount.textContent = incomeAmountEdit.value;
        let index = incomeData.findIndex((i) => i.id === id); //wyszukuje indeks edytowanego elementu
        incomeData[index].name = incomeNameEdit.value;
        incomeData[index].amount = incomeAmountEdit.value;

        showSumIncome();

        incomeLi.appendChild(incomeLiName);
        incomeLi.appendChild(incomeLiAmount);

        sumBudget();
      });

      // event dla anuluj
      cancelBtn.addEventListener("click", (e) => {
        renderApp();
      });
    });

    incomeList.appendChild(incomeLi);
  });
};

const renderApp = () => {
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

    //Buttony do usuwania i edytowania listy
    deleteBtn.addEventListener("click", () => {
      deleteExpense(id);
    });

    editBtn.addEventListener("click", () => {
      //usuwam <span> z nazwa i iloscia
      expenseLi.removeChild(expenseLiName);
      expenseLi.removeChild(expenseLiAmount);

      //tworze forme i dwa inputy
      const expenseEditForm = cel("form");
      const expenseNameEdit = cel("input");
      const expenseAmountEdit = cel("input");

      expenseEditForm.classList.add = "editForm";
      expenseNameEdit.classList.add = "editName";
      expenseAmountEdit.classList.add = "editAmount";

      expenseEditForm.appendChild(expenseNameEdit);
      expenseEditForm.appendChild(expenseAmountEdit);
      expenseNameEdit.value = `${name}`;
      expenseAmountEdit.value = `${amount}`;

      //usuwam buttony edytuj/usun, dodaje buttony akceptuj/anuluj
      expenseLi.removeChild(editBtn);
      expenseLi.removeChild(deleteBtn);

      const cancelBtn = cel("button");
      const acceptBtn = cel("button");

      cancelBtn.textContent = "Anuluj";
      acceptBtn.textContent = "Akceptuj";

      expenseLi.appendChild(expenseEditForm);
      expenseLi.appendChild(cancelBtn);
      expenseLi.appendChild(acceptBtn);

      // event dla akceptuj
      acceptBtn.addEventListener("click", (e) => {
        expenseLiName.textContent = expenseNameEdit.value;
        expenseLiAmount.textContent = expenseAmountEdit.value;
        let index = expenseData.findIndex((i) => i.id === id); //wyszukuje indeks edytowanego elementu
        expenseData[index].name = expenseNameEdit.value;
        expenseData[index].amount = expenseAmountEdit.value;

        showSumExpense();

        expenseLi.appendChild(expenseLiName);
        expenseLi.appendChild(expenseLiAmount);

        sumBudget();
      });

      // event dla anuluj
      cancelBtn.addEventListener("click", (e) => {
        renderApp2();
      });
    });

    expenseList.appendChild(expenseLi);
  });
};

const renderApp2 = () => {
  submitExpenses();
};

// UPDATE
// -------------------------------------------------

// funkcje zmieniające MODEL dla przychodów

const addIncomeData = (newIncome) => {
  const newIncomes = [...incomeData, newIncome];
  incomeData = newIncomes;
  renderApp();
};

const deleteIncome = (incomeId) => {
  const newIncomes = incomeData.filter(({ id }) => id !== incomeId);
  incomeData = newIncomes;
  renderApp();
};

const sumIncome = () => {
  return incomeData.reduce((acc, { amount }) => acc + amount, 0);
};

const showSumIncome = (incomeData) => {
  incomeSum.textContent = `Suma przychodów wynosi ${sumIncome(incomeData)} zł`;
};
showSumIncome(incomeData);

// funkcje zmieniające MODEL dla wydatków

const addExpenseData = (newExpense) => {
  const newExpenses = [...expenseData, newExpense];
  expenseData = newExpenses;
  renderApp2();
};

const deleteExpense = (expenseId) => {
  const deleteExpenses = expenseData.filter(({ id }) => id !== expenseId);
  expenseData = deleteExpenses;
  renderApp2();
};

const sumExpense = () => {
  return expenseData.reduce((acc, { amount }) => acc + amount, 0);
};

const showSumExpense = (expenseData) => {
  expenseSum.textContent = `Suma wydatków wynosi ${sumExpense(expenseData)} zł`;
};
showSumExpense(expenseData);

// SUM BUDGET
// -------------------------------------------------

const budget = () => {
  return sumIncome(incomeData) - submitExpenses(expenseData);
};

const sumBudget = () => {
  if (budget() > 0) {
    mainSum.textContent = `Możesz wydać ${budget()} zł`;
  }
  if (budget() === 0) {
    mainSum.textContent = `Masz ${budget()} zł`;
  }
  if (budget() < 0) {
    mainSum.textContent = `Twój budżet jest ${Math.abs(
      budget()
    )} zł na minusie`;
  }
};
sumBudget();

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
  showSumIncome();
  sumBudget();
});

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
  showSumExpense();
  sumBudget();
});

// START APP

renderApp();
renderApp2();
