window.onload = () => {
    const navButton = document.getElementById('sessionsNav');
    navButton.classList.add('activePage');
  
    const psychologistInput = document.getElementById('psychologyId');
    const postulantInput = document.getElementById('postulantId')
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    const statInput = document.getElementById('stat')
    const form = document.getElementById('form');
    const saveButton = document.getElementById('saveButton');
    const errorMessage = document.getElementById('errorMessage');
  
    const params = new URLSearchParams(window.location.search);
    saveButton.disabled = !!params.get('sessionId');
  
    const onFocusInput = () => {
      errorMessage.innerText = '';
    };
  
    psychologistInput.onfocus = onFocusInput;
    postulantInput.onfocus = onFocusInput;
    dateInput.onfocus = onFocusInput;
    timeInput.onfocus = onFocusInput;
    statInput.onfocus = onFocusInput;

  
    if (params.get('sessionId')) {
      fetch(`${window.location.origin}/api/sessions/${params.get('sessionId')}`)
        .then((response) => {
          if (response.status !== 200 && response.status !== 201) {
            return response.json().then(({ message }) => {
              throw new Error(message);
            });
          }
          return response.json();
        })
        .then((response) => {
            console.log('res', response)
          saveButton.disabled = false;
            psychologistInput.value = response.psychology._id;
            postulantInput.value = response.postulant._id;
            dateInput.value = response.date;
            timeInput.value = response.time;
            statInput.value = response.stat;

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
        body: JSON.stringify({
          psychology: psychologistInput.value,
          postulant: postulantInput.value,
          date: dateInput.value,
          time: timeInput.value,
          stat: statInput.value
        }),
      };
      console.log('body', options.body)
        options.method = 'POST';
        url = `${window.location.origin}/api/sessions`;
      console.log(url)
      fetch(url, options)
        .then((response) => {
            
          if (response.status !== 200 && response.status !== 201) {
            return response.json().then(({ message }) => {
              throw new Error(message);
            });
          }
          return response.json();
        })
        .then(() => {
          // eslint-disable-next-line no-underscore-dangle
          window.location.href = `${window.location.origin}/views/sessionsList.html`;
        })
        .catch((error) => {
          errorMessage.innerText = error;
        })
        .finally(() => {
          saveButton.disabled = false;
        });
    };
  };