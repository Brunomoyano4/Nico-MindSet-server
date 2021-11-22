const openEditClientForm = (client) => {
    // eslint-disable-next-line no-underscore-dangle
    window.location.href = `${window.location.origin}/views/clientForm.html?clientId=${client._id}`;
  };
  
  const openNewClientForm = () => {
    // eslint-disable-next-line no-underscore-dangle
    window.location.href = `${window.location.origin}/views/clientForm.html`;
  };
  
  window.onload = () => {
    const navButton = document.getElementById('clientsNav');
    navButton.classList.add('activePage');
  
    const addClientButton = document.getElementById('addClient');
    addClientButton.onclick = openNewClientForm;
  
    const tableContent = document.getElementById('table-content');
    fetch(`${window.location.origin}/api/clients`)
      .then((response) => response.json())
      .then((response) => {
        response.forEach((clients) => {
          const tr = document.createElement('tr');
          const NameTD = document.createElement('td');
          const phoneTD = document.createElement('td');
          NameTD.innerText = clients.customerName;
          phoneTD.innerText = clients.phone;
          tr.onclick = () => openEditClientForm(clients);
          tr.append(NameTD, phoneTD);
          tableContent.append(tr);
        });
      });
  };