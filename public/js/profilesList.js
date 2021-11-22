const openEditProfileForm = (id) => {
  window.location.href = `${window.location.origin}/views/profilesForm.html?_id=${id}`
};

const openNewProfileForm = () => {
  window.location.href = `${window.location.origin}/views/profilesForm.html`
};

const deleteProfile = (id) => {
  console.log(id)
  const options = {
    method: "DELETE"
  };
  url = `${window.location.origin}/api/profiles/${id}`
  fetch(url,options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message)
          })
        }
      })
      .then(() => {
        window.location.href = `${window.location.origin}/views/profilesList.html`;
      })
      .catch((error) => {
        console.log(error)
      })
}

window.onload = () => {
  const navButton = document.getElementById('profilesNav')
  navButton.classList.add('activePage')

  const addProfileButton = document.getElementById('addProfile')
  addProfileButton.onclick = openNewProfileForm

  const tableContent = document.getElementById('profiles-table')
  fetch(`${window.location.origin}/api/profiles`)
    .then((response) => response.json())
    .then((response) => {
        response.forEach((profile) => {
          const tr = document.createElement('tr')
          const nameTD = document.createElement('td')
          const branchTD = document.createElement('td')
          const descriptionTD = document.createElement('td')
          const actionsTD = document.createElement('td')
          const button = document.createElement('button')
          nameTD.innerText = profile.profileName
          branchTD.innerText = profile.branch
          descriptionTD.innerText = profile.description
          button.innerText="Delete"
          actionsTD.append(button)
          tr.onclick = () => openEditProfileForm(profile._id)
          tr.append(nameTD, branchTD, descriptionTD, actionsTD)
          tableContent.append(tr)  
          button.onclick=(event)=>{
            event.stopPropagation()
            const modal=document.getElementById('modalProfile')
            modal.classList.add('modal')
            const textTitle=document.createElement('p')
            const textModal=document.createElement('p')
            textTitle.innerText='CAUTION:'
            textTitle.classList.add('title')
            textModal.innerText='Are you sure you want to delete the profile?'
            const buttonConfirm=document.createElement('button')
            const buttonCancel=document.createElement('button')
            buttonConfirm.innerText="Confirm"
            buttonCancel.innerText="Cancel"
            modal.append(textTitle, textModal, buttonCancel, buttonConfirm)
            buttonConfirm.classList.add('modalButton')
            buttonCancel.classList.add('modalButton')
            buttonConfirm.onclick = () => deleteProfile(profile._id)
            buttonCancel.onclick = () => {
              modal.classList.add('modalRemove')
              window.location.href = `${window.location.origin}/views/profilesList.html`;
            }
          }
        })
    })
    .catch((error)=>{
      console.log(error)
    })
}