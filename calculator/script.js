let string = "";
let buttons = document.querySelectorAll(".button");
let input = document.querySelector(".input");

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        let value = e.target.innerHTML;

        if (value === "=") {
            try {
                string = eval(string);   // calculate
                input.value = string;
            } catch {
                input.value = "Error";
                string = "";
            }

        } else if (value === "AC") {
            string = "";
            input.value = "";

        } else if (value === "DEL") {
            string = string.slice(0, -1);   // remove last character
            input.value = string;

        } else if (value === "%") {
            try {
                string = eval(string) / 100;
                input.value = string;
            } catch {
                input.value = "Error";
                string = "";
            }

        } else {
            string += value;
            input.value = string;
        }
    });
});