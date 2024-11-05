let eye = document.querySelector(".fa-eye");
let money = document.querySelector(".Money");
let isMoneyVisible = false;

eye.addEventListener("click", () => {
    if (isMoneyVisible) {
        money.textContent = "****";
        eye.classList.remove('fa-eye-slash');
        eye.classList.add('fa-eye');
    } else {
        money.textContent = "1,000,000";
        eye.classList.remove('fa-eye');
        eye.classList.add('fa-eye-slash');
    }
    isMoneyVisible = !isMoneyVisible;
});
