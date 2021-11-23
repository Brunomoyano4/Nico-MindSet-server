const openEditSessionForm = (session) => {
  // eslint-disable-next-line no-underscore-dangle
  window.location.href = `${window.location.origin}/views/sessionsForm.html?sessionId=${session._id}`;
};

const openNewSessionForm = () => {
  // eslint-disable-next-line no-underscore-dangle
  window.location.href = `${window.location.origin}/views/sessionsForm.html`;
};

const deleteSession = (id, event) => {
  // eslint-disable-next-line no-underscore-dangle
  event.stopPropagation();
  console.log(id)
  const url = `${window.location.origin}/api/sessions/${id}`
  fetch(url, {
    method: 'DELETE'
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response);
      } else {
        window.location.reload()
        return response.then(({ message }) => {
          console.log('res',response.json()) 
        });
      }
    })
    .catch((error => error));
};

window.onload = () => {
  const navButton = document.getElementById('sessionsNav');
  navButton.classList.add('activePage');

  const addSessionButton = document.getElementById('addSession');
  addSessionButton.onclick = openNewSessionForm;

  const tableContent = document.getElementById('table-content');
  fetch(`${window.location.origin}/api/sessions`)
    .then((response) => response.json())
    .then((response) => {
      console.log('response', response)
      response.forEach((sessions) => {
        const tr = document.createElement('tr');
        const psychologistTD = document.createElement('td');
        const postulantTD = document.createElement('td');
        const dateTD = document.createElement('td');
        const timeTD = document.createElement('td');
        const statusTD = document.createElement('td');
        const actionTD = document.createElement('td');
        psychologistTD.innerText = `${sessions.psychology.firstName} ${sessions.psychology.lastName}`;
        postulantTD.innerText = `${sessions.postulant.firstName} ${sessions.postulant.lastName}`;
        dateTD.innerText = sessions.date;
        timeTD.innerText = sessions.time;
        statusTD.innerText = sessions.stat;
        const button = document.createElement('button');
        button.innerText = 'Delete';
        actionTD.append(button);
        tr.onclick = () => openEditSessionForm(sessions);
        tr.append(psychologistTD, postulantTD, dateTD, timeTD, statusTD, actionTD, actionTD);
        tableContent.append(tr);
        button.onclick = (event) => {
          event.stopPropagation()
          const modal = document.getElementById('modalSession');
          modal.classList.add('modalSession');
          const textTitle = document.createElement('p');
          const textModal = document.createElement('p');
          textTitle.innerText = 'CAUTION:'
          textTitle.classList.add('title');
          textModal.innerText = 'Are you sure you want to delete the session?'
          const buttonConfirm = document.createElement('button');
          const buttonCancel = document.createElement('button');
          buttonConfirm.innerText = "Confirm"
          buttonCancel.innerText = "Cancel"
          modal.append(textTitle, textModal, buttonCancel, buttonConfirm);
          buttonConfirm.classList.add('modalSessionButton');
          buttonCancel.classList.add('modalSessionButton');
          buttonConfirm.onclick = () => deleteSession(sessions._id, event);
          buttonCancel.onclick = () => {
            modal.classList.add('modalSessionRemove');
            window.location.href = `${window.location.origin}/views/sessionsList.html`;
          }
        }
      });
    });
};
