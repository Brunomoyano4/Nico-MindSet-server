const editPostulant = (id) => {
  window.location.href = `${window.location.origin}/views/postulantsForm.html?_id=${id}`
};

const addNewPostulant = () => {
  window.location.href = `${window.location.origin}/views/postulantsForm.html`
}

window.onload = () => {
  console.log('all set up ✅')

  const navButton = document.getElementById('postulantsNav');
  navButton.classList.add('activePage');

  const tableContent = document.getElementById('postulants-table');

  const addPostulant = document.getElementById('addPostulant');
  addPostulant.onclick = addNewPostulant;

  fetch(`${window.location.origin}/api/postulants`)
    .then((response) => response.json())
    .then((response) => {
      response.forEach((item) => {
        console.log('response', response)
        const tr = document.createElement('tr');
        const firstNameTd = document.createElement('td');
        const lastNameTd = document.createElement('td');
        const emailTd = document.createElement('td');
        const telephoneTd = document.createElement('td');
        const cityTd = document.createElement('td');
        const countryTd = document.createElement('td');
        firstNameTd.innerText = item.firstName;
        lastNameTd.innerText = item.lastName;
        emailTd.innerText = item.email;
        telephoneTd.innerText = item.telephone;
        cityTd.innerText = item.city;
        countryTd.innerText = item.country;
        tr.append(firstNameTd, lastNameTd, emailTd, telephoneTd, cityTd, countryTd);
        tableContent.append(tr);
        tr.onclick = () => editPostulant(item._id);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};