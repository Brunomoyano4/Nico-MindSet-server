const openEditadminForm = (admin) => {
    // eslint-disable-next-line no-underscore-dangle
    window.location.href = `${window.location.origin}/views/adminsForm.html?adminId=${admin._id}`;
  };
  
  const openNewadminForm = () => {
    // eslint-disable-next-line no-underscore-dangle
    window.location.href = `${window.location.origin}/views/adminsForm.html`;
  };
  
  window.onload = () => {
    const navButton = document.getElementById('adminsNav');
    navButton.classList.add('activePage');
  
    const addadminButton = document.getElementById('addAdmin');
    addadminButton.onclick = openNewadminForm;
  
    const tableContent = document.getElementById('table-content');
    fetch(`${window.location.origin}/api/admins`)
      .then((response) => response.json())
      .then((response) => {
        response.forEach((admin) => {
          const tr = document.createElement('tr');
          const nameTD = document.createElement('td');
          const lastNameTD = document.createElement('td');
          const usernameTD = document.createElement('td');
          const emailTD = document.createElement('td');
          const passwordTD = document.createElement('td');
          nameTD.innerText = admin.firstName;
          lastNameTD.innerText = admin.lastName;
          usernameTD.innerText = admin.username;
          emailTD.innerText = admin.email;
          passwordTD.innerText = admin.password;
          tr.onclick = () => openEditadminForm(admin);
          tr.append(nameTD, lastNameTD, usernameTD, emailTD, passwordTD);
          tableContent.append(tr);
        });
      });
  };