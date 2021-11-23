window.onload = () => {
    const navButton = document.getElementById('adminsNav');
    navButton.classList.add('activePage');
  
    const nameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
 
    const saveButton = document.getElementById('saveButton');
    const errorMessage = document.getElementById('error_massage');
  
    const params = new URLSearchParams(window.location.search);
    saveButton.disabled = !!params.get('adminId');
  
    const onFocusInput = () => {
      saveButton.disabled = false;
    };
  
    nameInput.onfocus = onFocusInput;
    lastNameInput.onfocus = onFocusInput;
    usernameInput.onfocus = onFocusInput;
    emailInput.onfocus = onFocusInput;
    passwordInput.onfocus = onFocusInput;
      
    let ErrName = ErrLastName = "";
    const blurName = (event) => {
        let val = event.target.value;
        let ok = true
        for (i=0;i<val.length;i++){
            if(val[i].match(/[a-zA-Z]/g)==null) {
                ok = false;
            }
        }
        ok?ErrName="":ErrName="Name not valid \n";
        errorMessage.innerText = ErrName + ErrLastName;
    };
    const blurLastName = (event) => {
        let val = event.target.value;
        let ok = true
        for (i=0;i<val.length;i++){
            if(val[i].match(/[a-zA-Z," "]/g)==null) {
                ok = false;
            }
        }
        ok?ErrLastName="":ErrLastName="Last name not valid \n";
        errorMessage.innerText = ErrName + ErrLastName;
    };

    nameInput.onblur = blurName;
    lastNameInput.onblur = blurLastName;
    usernameInput.onblur = blurUsername;
    // emailInput.blur = blurEmail
    // passwordInput.blur = blurPassword
    
    if (params.get('adminId')) {
      fetch(`${window.location.origin}/api/admins/${params.get('adminId')}`)
        .then((response) => {
          if (response.status !== 200 && response.status !== 201) {
            return response.json().then(({ ErrMessage }) => {
              throw new Error(ErrMessage);
            });
          }
          return response.json();
        })
        .then((response) => {
            const admin=response;
            nameInput.value = admin.firstName;
            lastNameInput.value = admin.lastName;
            emailInput.value = admin.email;
            usernameInput.value = admin.username;
            passwordInput.value = admin.password; 
            })
        .catch((error) => {
          errorMessage.innerText = error;
        });
    }
  
    form.onsubmit = (event) => {
      event.preventDefault();
      saveButton.disabled = true;
  
      let url;
      const options = {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: nameInput.value,
          lastName: lastNameInput.value,
          email: emailInput.value,
          username: usernameInput.value,
          password: passwordInput.value  
        }),
      };
      console.log(params.get('adminId'));
      if (params.get('adminId')) {
        options.method = 'PUT';
        url = `${window.location.origin}/api/admins/${params.get('adminId')}`;
      } else {
        options.method = 'POST';
        url = `${window.location.origin}/api/admins`;
      }
  
      fetch(url, options)
        .then((response) => {
          if (response.status !== 200 && response.status !== 201) {
            return response.json().then(({ ErrMessage }) => {
              throw new Error(ErrMessage);
            });
          }
          return response.json();
        })
        .then(() => {
          // eslint-disable-next-line no-underscore-dangle
          window.location.href = `${window.location.origin}/views/adminsList.html`;
        })
        .catch((error) => {
          errorMessage.innerText = error;
        })
        .finally(() => {
          saveButton.disabled = false;
        });
    };
  };