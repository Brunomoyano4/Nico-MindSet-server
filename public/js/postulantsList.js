const editPostulant = (item) => {
  window.location.href = `${window.location.origin}/views/postulantsForm.html?_id=${item._id}`
};

const addNewPostulant = () => {
  window.location.href = `${window.location.origin}/views/postulantsForm.html`
}

const deletePostulant = (item) => {
  const url = `${window.location.origin}/api/postulants/${item._id}`;
  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
  })
  .then((response) => {
    if (response.status !== 200) {
      return response.json().then(({ message }) => {
        throw new Error(message);
      });
    }
    return response.json();
  })
    .then(window.location.reload())
    .catch((error) => error);
};

window.onload = () => {
  const navButton = document.getElementById('postulantsNav');
  navButton.classList.add('activePage');

  const tableContent = document.getElementById('postulants-table');

  const addPostulant = document.getElementById('addPostulant');
  addPostulant.onclick = addNewPostulant;
  fetch(`${window.location.origin}/api/postulants`)
    .then((response) => response.json())
    .then((response) => {
      response.forEach((item) => {
        const tr = document.createElement('tr');
        const firstNameTd = document.createElement('td');
        const lastNameTd = document.createElement('td');
        const emailTd = document.createElement('td');
        const telephoneTd = document.createElement('td');
        const cityTd = document.createElement('td');
        const countryTd = document.createElement('td');
        const actionsTD = document.createElement('td');
        firstNameTd.innerText = item.firstName;
        lastNameTd.innerText = item.lastName;
        emailTd.innerText = item.email;
        telephoneTd.innerText = item.telephone;
        cityTd.innerText = item.city;
        countryTd.innerText = item.country;
        
        const button = document.createElement('button');
        button.innerText = 'Delete';
        actionsTD.append(button);
        button.onclick = (event) => {
          event.stopPropagation(event);
          const modal=document.getElementById('modalPostulants')
          modal.classList.add('modal')
          const textTitle=document.createElement('p')
          const textModal=document.createElement('p')
          textTitle.innerText='CAUTION:'
          textTitle.classList.add('title')
          textModal.innerText='Are you sure you want to delete this postulation?'
          const buttonConfirm=document.createElement('button')
          const buttonCancel=document.createElement('button')
          buttonConfirm.innerText="Confirm"
          buttonCancel.innerText="Cancel"
          modal.append(textTitle, textModal, buttonCancel, buttonConfirm)
          buttonConfirm.classList.add('modalButton')
          buttonCancel.classList.add('modalButton')
          buttonConfirm.onclick = () => deletePostulant(item)
          buttonCancel.onclick = () => {
            modal.classList.add('modalRemove')
            window.location.href = `${window.location.origin}/views/postulantsList.html`;
          };
        };

        tr.onclick = () => editPostulant(item);
        tr.append(firstNameTd, lastNameTd, emailTd, telephoneTd, cityTd, countryTd, actionsTD);
        tableContent.append(tr);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};