window.onload = () => {
  console.log('all set up ✅')

  const navButton = document.getElementById('positionsNav');
  navButton.classList.add('activePage');

  const clientIdInput = document.getElementById('clientId');
  const jobInput = document.getElementById('job');
  const descriptionInput = document.getElementById('description');
  const createdAtInput = document.getElementById('createdAt');

  const form = document.getElementById('form');
  const saveButton = document.getElementById('saveButton');
  const errorMessage = document.getElementById('errorMessage');

  const params = new URLSearchParams(window.location.search);
  saveButton.disables = !!params.get('_id');

  const onFocusInput = () => {
    errorMessage.innerText = '';
  };
  
  clientIdInput.onfocus = onFocusInput;
  jobInput.onfocus = onFocusInput;
  descriptionInput.onfocus = onFocusInput;
  createdAtInput.onfocus = onFocusInput;

  if (params.get('_id')) {
    fetch(`${window.location.origin}/api/positions?_id=${params.get('_id')}`)
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
        response.forEach((positions) => {
          clientIdInput.value = positions.clientId
          jobInput.value = positions.job
          descriptionInput.value = positions.description
          createdAtInput.value = positions.createdAt
        });
      })
      .catch((error) => {
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
        clientId: clientIdInput.value,
        job: jobInput.value,
        description: descriptionInput.value,
        createdAt: createdAtInput.value,
      }),
    };

    if (params.get('_id')) {
      options.method = 'PUT';
      url = `${window.location.origin}/api/positions/${params.get('_id')}`;
    } else {
      options.method = 'POST';
      url = `${window.location.origin}/api/positions`;
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
        window.location.href = `${window.location.origin}/views/positionsList.html`;
      })
      .catch((error) => {
        errorMessage.innerText = error;
      })
      .finally(() => {
        saveButton.disabled = false;
      })
  };
};