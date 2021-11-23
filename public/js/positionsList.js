const editPosition = (item) => {
  window.location.href = `${window.location.origin}/views/positionsForm.html?_id=${item._id}`
};

const addNewPosition = () => {
  window.location.href = `${window.location.origin}/views/positionsForm.html`
}

const deletePosition = (item) => {
  const url = `${window.location.origin}/api/positions/${item._id}`;
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
  const navButton = document.getElementById('positionsNav');
  navButton.classList.add('activePage');
  const tableContent = document.getElementById('positions-table');
  const addPosition = document.getElementById('addPosition');
  addPosition.onclick = addNewPosition;
  fetch(`${window.location.origin}/api/positions`)
    .then((response) => response.json())
    .then((response) => {
      response.forEach((item) => {
        const tr = document.createElement('tr');
        const clientTd = document.createElement('td');
        const jobNameTd = document.createElement('td');
        const jobDescriptionTd = document.createElement('td');
        const createdAtTd = document.createElement('td');
        const actionsTd = document.createElement('td');
        clientTd.innerText = item.clientId;
        jobNameTd.innerText = item.job;
        jobDescriptionTd.innerText = item.description;
        createdAtTd.innerText = item.createdAt;
        
        const button = document.createElement('button');
        button.innerText = 'Delete';
        actionsTd.append(button);
        button.onclick = (event) => {
          event.stopPropagation(event);
          const modal=document.getElementById('modalPositions')
          modal.classList.add('modal')
          const textTitle=document.createElement('p')
          const textModal=document.createElement('p')
          textTitle.innerText='CAUTION:'
          textTitle.classList.add('title')
          textModal.innerText='Are you sure you want to delete this position?'
          const buttonConfirm=document.createElement('button')
          const buttonCancel=document.createElement('button')
          buttonConfirm.innerText="Confirm"
          buttonCancel.innerText="Cancel"
          modal.append(textTitle, textModal, buttonCancel, buttonConfirm)
          buttonConfirm.classList.add('modalButton')
          buttonCancel.classList.add('modalButton')
          buttonConfirm.onclick = () => deletePosition(item)
          buttonCancel.onclick = () => {
            modal.classList.add('modalRemove')
            window.location.href = `${window.location.origin}/views/positionsList.html`;
          };
        };

        tr.onclick = () => editPosition(item);
        tr.append(clientTd, jobNameTd, jobDescriptionTd, createdAtTd, actionsTd);
        tableContent.append(tr);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};