const openEditInterviewForm = (id) => {
  window.location.href = `${window.location.origin}/views/interviewsForm.html?_id=${id}`
};

const openNewInterviewForm = () => {
  window.location.href = `${window.location.origin}/views/interviewsForm.html`
};

const deleteInterview = (id) => {
  console.log(id)
  const options = {
    method: "DELETE"
  };
  url = `${window.location.origin}/api/interviews/${id}`
  fetch(url,options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message)
          })
        }
      })
      .then(() => {
        window.location.href = `${window.location.origin}/views/interviewsList.html`;
      })
      .catch((error) => {
        console.log(error)
      })
}

window.onload = () => {
  const navButton = document.getElementById('interviewsNav')
  navButton.classList.add('activePage')

  const addInterviewButton = document.getElementById('addInterview')
  addInterviewButton.onclick = openNewInterviewForm

  const tableContent = document.getElementById('interviews-table')
  fetch(`${window.location.origin}/api/interviews`)
    .then((response) => response.json())
    .then((response) => {
        response.forEach((interview) => {
          const tr = document.createElement('tr')
          const positionTD = document.createElement('td')
          const postulantTD = document.createElement('td')
          const dateTD = document.createElement('td')
          const statusTD = document.createElement('td')
          const actionsTD = document.createElement('td')
          const button = document.createElement('button')
          positionTD.innerText = interview.positionId
          postulantTD.innerText = interview.postulantId
          dateTD.innerText = interview.dateTime
          statusTD.innerText = interview.status
          button.innerText="Delete"
          actionsTD.append(button)
          tr.onclick = () => openEditInterviewForm(interview._id)
          tr.append(positionTD, postulantTD, dateTD, statusTD, actionsTD)
          tableContent.append(tr)  
          button.onclick=(event)=>{
            event.stopPropagation()
            const modal=document.getElementById('modalInterview')
            modal.classList.add('modalInterview')
            const textTitle=document.createElement('p')
            const textModal=document.createElement('p')
            textTitle.innerText='CAUTION:'
            textTitle.classList.add('title')
            textModal.innerText='Are you sure you want to delete the interview?'
            const buttonConfirm=document.createElement('button')
            const buttonCancel=document.createElement('button')
            buttonConfirm.innerText="Confirm"
            buttonCancel.innerText="Cancel"
            modal.append(textTitle, textModal, buttonCancel, buttonConfirm)
            buttonConfirm.classList.add('modalInterviewButton')
            buttonCancel.classList.add('modalInterviewButton')
            buttonConfirm.onclick = () => deleteInterview(interview._id)
            buttonCancel.onclick = () => {
              modal.classList.add('modalInterviewRemove')
              window.location.href = `${window.location.origin}/views/interviewsList.html`;
            }
          }
        })
    })
    .catch((error)=>{
      console.log(error)
    })
}