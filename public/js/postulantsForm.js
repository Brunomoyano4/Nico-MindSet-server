window.onload = () => {
  console.log('all set up ✅')

  const navButton = document.getElementById('postulantsNav');
  navButton.classList.add('activePage');

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

  const form = document.getElementById('form');
  const saveButton = document.getElementById('saveButton');
  const errorMessage = document.getElementById('errorMessage');

  const params = new URLSearchParams(window.location.search);
  saveButton.disables = !!params.get('_id');

  const onFocusInput = () => {
    errorMessage.innerText = '';
  };
  
  firstNameInput.onfocus = onFocusInput;
  lastNameInput.onfocus = onFocusInput;
  userNameInput.onfocus = onFocusInput;
  emailInput.onfocus = onFocusInput;
  passwordInput.onfocus = onFocusInput;
  birthDateInput.onfocus = onFocusInput;
  streetInput.onfocus = onFocusInput;
  streetNumberInput.onfocus = onFocusInput;
  postalCodeInput.onfocus = onFocusInput;
  cityInput.onfocus = onFocusInput;
  provinceInput.onfocus = onFocusInput;
  countryInput.onfocus = onFocusInput;
  telephoneInput.onfocus = onFocusInput;
  jobPositionInput.onfocus = onFocusInput;
  employerInput.onfocus = onFocusInput;
  startDateInput.onfocus = onFocusInput;
  endDateInput.onfocus = onFocusInput;
  descriptionInput.onfocus = onFocusInput;

  if (params.get('_id')) {
    fetch(`${window.location.origin}/api/postulants?_id=${params.get('_id')}`)
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        saveButton.disabled = false;
        response.forEach((postulant) => {
          firstNameInput.value = postulant.firstName
          lastNameInput.value = postulant.lastName
          userNameInput.value = postulant.userName
          emailInput.value = postulant.email
          passwordInput.value = postulant.password
          birthDateInput.value = postulant.birthDate
          streetInput.value = postulant.street
          streetNumberInput.value = postulant.streetNumber
          postalCodeInput.value = postulant.postalCode
          cityInput.value = postulant.city
          provinceInput.value = postulant.province
          countryInput.value = postulant.country
          telephoneInput.value = postulant.telephone
          postulant.experience.forEach((experience) => {
            jobPositionInput.value = experience.jobPosition
            employerInput.value = experience.employer
            startDateInput.value = experience.startDate
            endDateInput.value = experience.endDate
            descriptionInput.value = experience.description
          });
        });
      })
      .catch((error) =>{
        errorMessage.innerText = error;
      });
  };

  form.onsubmit = (event) => {
    event.preventDefault();
    saveButton.disabled = true;

    let url;
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        userName: userNameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        birthDate: birthDateInput.value,
        street: streetInput.value,
        streetNumber: streetNumberInput.value,
        postalCode: postalCodeInput.value,
        city: cityInput.value,
        province: provinceInput.value,
        country: countryInput.value,
        telephone: parseInt(telephoneInput.value),
        experience: {
          jobPosition: jobPositionInput.value,
          employer: employerInput.value,
          startDate: startDateInput.value,
          endDate: endDateInput.value,
          description: descriptionInput.value,
        },
      }),
    };

    if (params.get('_id')) {
      options.method = 'PUT';
      url = `${window.location.origin}/api/postulants/${params.get('_id')}`;
    } else {
      options.method = 'POST';
      url = `${window.location.origin}/api/postulants`;
    }

    fetch(url, options)
      .then((response) => {
        if (response.status !==200 && response.status!==201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then(() => {
        window.location.href = `${window.location.origin}/views/postulantsList.html`;
      })
      .catch((error) => {
        errorMessage.innerText = error;
      })
      .finally(() => {
        saveButton.disabled = false;
      })
  };
};