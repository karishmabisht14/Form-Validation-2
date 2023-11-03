const container = document.querySelector(".container");
const form = document.querySelector("form");
form.addEventListener("submit", handleSubmitForm);

const h1 = document.createElement("h1");
h1.setAttribute("class", "users");
h1.appendChild(document.createTextNode("User Details"));
container.appendChild(h1);

const table = document.createElement("table");
table.setAttribute("class", "tableForm");
const tr = document.createElement("tr");

let th1 = document.createElement("th");
let th2 = document.createElement("th");
let th3 = document.createElement("th");
let th4 = document.createElement("th");
let th5 = document.createElement("th");
let th6 = document.createElement("th");
let th7 = document.createElement("th");

th1.appendChild(document.createTextNode("Profile Photo"));
tr.appendChild(th1);
th2.appendChild(document.createTextNode("First Name"));
tr.appendChild(th2);
th3.appendChild(document.createTextNode("Last Name"));
tr.appendChild(th3);
th4.appendChild(document.createTextNode("Email"));
tr.appendChild(th4);
th5.appendChild(document.createTextNode("Phone No"));
tr.appendChild(th5);
th6.appendChild(document.createTextNode("Address"));
tr.appendChild(th6);
th7.appendChild(document.createTextNode("Buttons"));
tr.appendChild(th7);

table.appendChild(tr);

const users = localStorage.getItem("userDetails")
  ? JSON.parse(localStorage.getItem("userDetails"))
  : [];
showTable();

let editIndex = -1;

function handleSubmitForm(e) {
  e.preventDefault();

  document.getElementById("submitBtn").value = "submit";

  if (editIndex === -1) {
    const photo = document.getElementById("photo").value;
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    const char = charReg(fname, lname);
    if (!char) {
      alert("Name should be character only");
      return;
    }

    const mail = emailReg(email);
    if (!mail) {
      alert("your email is incorrect");
      return;
    }

    const phn = phoneReg(phone);
    if (!phn) {
      alert("Your number is incorrect");
      return;
    }

    const existingUser = users.findIndex(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser !== -1) {
      // Edit the existing user with the same email
      alert("User already existed");
      return;
    }

    const userForm = {
      photo: photo,
      fname: fname,
      lname: lname,
      email: email,
      phone: phone,
      address: address,
    };

    removeTable();
    users.push(userForm);
    localStorage.setItem("userDetails", JSON.stringify(users));
    showTable();
    form.reset();
  } else {
    saveEditedUser();
  }
}

function charReg(first, last) {
  const charReg = /^[a-zA-Z]+$/;
  if (charReg.test(first) && charReg.test(last)) {
    return true;
  } else {
    return false;
  }
}
function emailReg(email) {
  var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (email.match(emailReg)) {
    return true;
  } else {
    return false;
  }
}

function phoneReg(phone) {
  if (phone.match(/\d/g).length === 10) {
    return true;
  } else {
    return false;
  }
}

function showTable() {
  users.forEach((user, index) => {
    const tr = document.createElement("tr");
    tr.setAttribute("class", "row");

    td1 = document.createElement("td");
    td2 = document.createElement("td");
    td3 = document.createElement("td");
    td4 = document.createElement("td");
    td5 = document.createElement("td");
    td6 = document.createElement("td");
    td7 = document.createElement("td");
    img = document.createElement("img");

    img.src = user.photo;
    td1.appendChild(img);
    tr.appendChild(td1);
    td2.appendChild(document.createTextNode(user.fname));
    tr.appendChild(td2);
    td3.appendChild(document.createTextNode(user.lname));
    tr.appendChild(td3);
    td4.appendChild(document.createTextNode(user.email));
    tr.appendChild(td4);
    td5.appendChild(document.createTextNode(user.phone));
    tr.appendChild(td5);
    td6.appendChild(document.createTextNode(user.address));
    tr.appendChild(td6);

    const button1 = document.createElement("button");
    const button2 = document.createElement("button");
    button1.appendChild(document.createTextNode("Edit"));
    button2.appendChild(document.createTextNode("Delete"));

    button1.addEventListener("click", () => {
      console.log(user);
      handleEdit(user, index);
    });

    button2.addEventListener("click", () => {
      handleDelete(index);
    });

    td7.appendChild(button1);
    td7.appendChild(button2);
    tr.appendChild(td7);

    table.appendChild(tr);

    container.appendChild(table);
  });
}

function removeTable() {
  users?.forEach(() => {
    const tableRow = document.querySelector(".row");
    tableRow.remove();
  });
}

function handleEdit(user, index) {
  editIndex = index;
  form.reset();

  document.getElementById("photo").value = user.photo;
  document.getElementById("fname").value = user.fname;
  document.getElementById("lname").value = user.lname;
  document.getElementById("email").value = user.email;
  document.getElementById("phone").value = user.phone;
  document.getElementById("address").value = user.address;
  document.getElementById("submitBtn").value = "edit";
}

function saveEditedUser() {
  const photo = document.getElementById("photo").value;
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;

  const char = charReg(fname, lname);
  if (!char) {
    alert("Name should be character only");
    return;
  }

  const mail = emailReg(email);
  if (!mail) {
    alert("your email is incorrect");
    return;
  }

  const phn = phoneReg(phone);
  if (!phn) {
    alert("Your number is incorrect");
    return;
  }
  const userToUpdate = users[editIndex];
  userToUpdate.photo = photo;
  userToUpdate.fname = fname;
  userToUpdate.lname = lname;
  userToUpdate.email = email;
  userToUpdate.phone = phone;
  userToUpdate.address = address;

  users[editIndex] = userToUpdate;

  localStorage.setItem("userDetails", JSON.stringify(users));

  form.reset();
  editIndex = -1;
  removeTable();
  showTable();
}

function handleDelete(index) {
  removeTable();
  users.splice(index, 1);
  localStorage.setItem("userDetails", JSON.stringify(users));
  console.log("users", users);
  editIndex = -1;
  // form.reset();
  document.getElementById("submitBtn").value = "submit";
  showTable();
}
