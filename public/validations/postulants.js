window.addEventListener('load', () => {

  console.log('all good')

  const firstNameInput = document.getElementById('firstName');
  const lastNameInput = document.getElementById('lastName');
  const userNameInput = document.getElementById('userName');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const birthDateInput = document.getElementById('birthDate');
  const streetInput = document.getElementById('street');
  const streetNumberInput = document.getElementById('streetNumber');
  const postalCodeInput = document.getElementById('postalCode');
  const cityInput = document.getElementById('city');
  const provinceInput = document.getElementById('province');
  const countryInput = document.getElementById('country');
  const telephoneInput = document.getElementById('telephone');
  const jobPositionInput = document.getElementById('jobPosition');
  const employerInput = document.getElementById('employer');
  const startDateInput = document.getElementById('startDate');
  const endDateInput = document.getElementById('endDate');
  const descriptionInput = document.getElementById('description');
  const saveButton = document.getElementById('saveButton');
  const errorMessage = document.getElementById('errorMessage')

  // RegExp  ------------------------------------------------------------------------------------------------------------
  const lettersOnly = /^[ña-zÑA-Z]+$/;
  const numbersOnly = /^[0-9]+$/;
  const dateFormat = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/
  const lettersNumbersSpacesOnly = /^[ña-zÑA-Z\s0-9]+$/;
  const lettersNumbersOnly = /^[A-Za-z0-9]+$/;
  const mustContainNumbers = /^(?=.*[0-9])/;
  const mustContainLettersAndNumbers = /^(?=.*[0-9])(?=.*[a-zA-Z])/;
  const containSpaces = /\s/;

  const input = document.querySelectorAll('input');
  input.forEach((input) => {
    input.addEventListener('focus', () => errorMessage.innerText = ' ')
  });

  const validateFirstName = () => {
    return firstNameInput.value.match(lettersOnly)
  }

  firstNameInput.onblur = () => {
    validateFirstName()
    ? null
    : (errorMessage.innerText = "First name must contain letters only")
  }


})