const openEditInterviewForm = (id) => {
  window.location.href = `${window.location.origin}/views/interviewsForm.html?_id=${id}`
};

const openNewInterviewForm = () => {
  window.location.href = `${window.location.origin}/views/interviewsForm.html`
};

window.onload = () => {
  const navButton = document.getElementById('interviewsNav')
  navButton.classList.add('activePage')

  const addInterviewButton = document.getElementById('addInterview')
  addInterviewButton.onclick = openNewInterviewForm

  const tableContent = document.getElementById('interviews-table')
  fetch(`${window.location.origin}/api/interviews`)
    .then((response) => response.json())
    .then((response) => {
        console.log("response",response)
        response.forEach((interview) => {
          const tr = document.createElement('tr')
          const positionTD = document.createElement('td')
          const postulantTD = document.createElement('td')
          const dateTD = document.createElement('td')
          const statusTD = document.createElement('td')
          positionTD.innerText = interview.positionId
          postulantTD.innerText = interview.postulantId
          dateTD.innerText = interview.dateTime
          statusTD.innerText = interview.status
          tr.onclick = () => openEditInterviewForm(interview._id)
          tr.append(positionTD, postulantTD, dateTD, statusTD)
          tableContent.append(tr)
      })
    })
    .catch((error)=>{
      console.log(error)
    })
}