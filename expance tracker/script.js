document.addEventListener("DOMContentLoaded", () => {
  const expanseForm = document.getElementById("expanse-form");
  const expanseName = document.getElementById("expanse-name");
  const expanseAmount = document.getElementById("expanse-amount");
  const addexpanseBtn = document.getElementById("add-expanse-btn");
  const expanseList = document.getElementById("expanse-list");
  const total = document.getElementById("total");
  const totalAmount = document.getElementById("total-amount");

  let expanses = [];

  function rander() {
    expanseList.innerHTML = "";
    let total = 0;
    expanses.forEach((expanse, index) => {
      const li = document.createElement("li");

      li.innerHTML = `
        <span>${expanse.name} - ₹${expanse.amount}</span>
        <button class="delete-btn" data-index="${index}">X</button>
      `;

      expanseList.appendChild(li);
      total += expanse.amount;
    });

    totalAmount.textContent = total.toFixed(2);
  }

  expanseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const exName = expanseName.value.trim();
    const exAmount = expanseAmount.value.trim();
    if (exName === "" || exAmount === "") {
      alert("please enter value");
      return;
    }
    const expanse = {
      name: exName,
      amount: Number(exAmount),
    };

    expanses.push(expanse);
    console.log(expanses);
    rander();

    expanseName.value = "";
    expanseAmount.value = "";
  });
  expanseList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const index = Number(e.target.getAttribute("data-index"));
      expanses.splice(index, 1);
      rander();
    }
  });
});
