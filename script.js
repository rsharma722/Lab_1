const employees = [
{ name: "Harpreet Singh", position: "Developer", department: "IT" },
{ name: "Gurpreet Kaur", position: "Accountant", department: "Finance" },
{ name: "Amrit Singh", position: "Manager", department: "Operations" },
{ name: "Navneet Kaur", position: "HR Executive", department: "HR" }
];

const directory = document.getElementById("employee-directory");

employees.forEach(emp => {
const div = document.createElement("div");
div.innerHTML = `
    <h3>${emp.name}</h3>
    <p>${emp.position}</p>
    <p>${emp.department}</p>
`;
directory.appendChild(div);
});

document.getElementById("copyright").textContent =
"© " + new Date().getFullYear() + " Pixell River Financial";
