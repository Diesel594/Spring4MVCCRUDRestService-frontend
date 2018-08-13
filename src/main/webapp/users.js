function refreshUsers() {
  getData("/Spring4MVCCRUDRestService/user/", function(response) {
    let users = JSON.parse(response);

    if (users.length == 0) {
        document.getElementById("usersTable").innerHTML = '';
        return;
    }

    let tbl = document.createElement("table");
    tbl.setAttribute("border", 1);
    var tbdy = document.createElement("tbody");
    for (let i = 0; i < users.length; i++) {
      let tr = document.createElement("tr");

      let td_id = document.createElement("td");
      td_id.appendChild(document.createTextNode(users[i].id));

      let td_name = document.createElement("td");
      td_name.appendChild(document.createTextNode(users[i].name));

      let td_age = document.createElement("td");
      td_age.appendChild(document.createTextNode(users[i].age));

      let td_salary = document.createElement("td");
      td_salary.appendChild(document.createTextNode(users[i].salary));

      let td_remove = document.createElement("td");
      let remove_link = document.createElement("a");
      remove_link.textContent = "remove";
      remove_link.setAttribute("href", "#");
      remove_link.onclick = function() {
        removeUser(users[i].id);
        return false;
      };
      td_remove.appendChild(remove_link);

      tr.appendChild(td_id);
      tr.appendChild(td_name);
      tr.appendChild(td_age);
      tr.appendChild(td_salary);
      tr.appendChild(td_remove);

      tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    //document.getElementById("data").innerHTML = users[2].name;
    document.getElementById("usersTable").innerHTML = '';
    document.getElementById("usersTable").appendChild(tbl);
  });
}

function getData(theURL, callback) {
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microrsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      callback(xmlhttp.responseText);
    }
  };
  xmlhttp.open("GET", theURL, false);
  xmlhttp.send();
}

function removeUser(id) {
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microrsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        refreshUsers();
    }
  };
  xmlhttp.open("DELETE", `/Spring4MVCCRUDRestService/user/${id}`, false);
  xmlhttp.send();
}
