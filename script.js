document.getElementById('studentForm').addEventListener('submit', function(event) {
   event.preventDefault(); 

   // Get input values
   const name = document.getElementById('name').value.trim();
   const email = document.getElementById('email').value.trim();
   const contact = document.getElementById('contact').value.trim();
   const StudentId = document.getElementById('stdId').value.trim();

   // Validate input fields
   if (!name || !email || !contact || !StudentId) {
       alert("All fields are required!");
       return;
   }

   if (!/^[A-Za-z\s]+$/.test(name)) {
       alert("Student name can only contain letters.");
       return;
   }

   if (!/^\d{10}$/.test(contact)) {
       alert("Contact number must be 10 digits.");
       return;
   }
   // Create a new student object
   const student = { name, email, contact, StudentId };

   // Get existing students from localStorage or initialize an empty array
   const students = JSON.parse(localStorage.getItem('students')) || [];

   // Add the new student to the array
   students.push(student);

   // Save the updated array back to localStorage
   localStorage.setItem('students', JSON.stringify(students));

   // Clear the form
   document.getElementById('studentForm').reset();

   // Refresh the table
   renderTable();
});

// Function to render the table
function renderTable() {
   const tableBody = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
   // Clear existing table rows
   tableBody.innerHTML = ''; 

   const students = JSON.parse(localStorage.getItem('students')) || [];

   students.forEach((student, index) => {
       const newRow = tableBody.insertRow();

       const cell1 = newRow.insertCell(0);
       const cell2 = newRow.insertCell(1);
       const cell3 = newRow.insertCell(2);
       const cell4 = newRow.insertCell(3);
       const cell5 = newRow.insertCell(4);

       // Add values to the new cells
       cell1.textContent = student.name;
       cell2.textContent = student.email;
       cell3.textContent = student.contact;
       cell4.textContent = student.StudentId;

       // Create Edit button
       const editButton = document.createElement('button');
       editButton.textContent = 'Edit';
       editButton.className = 'edit-button';
       editButton.onclick = () => editStudent(index);
       cell5.appendChild(editButton);

       // Create Delete button
       const deleteButton = document.createElement('button');
       deleteButton.textContent = 'Delete';
       deleteButton.className = 'delete-button';
       deleteButton.onclick = () => deleteStudent(index);
       cell5.appendChild(deleteButton);
   });
}

// Function to delete a student
function deleteStudent(index) {
   const students = JSON.parse(localStorage.getItem('students')) || [];
   // Remove the student at the specified index
   students.splice(index, 1); 
   // Update localStorage
   localStorage.setItem('students', JSON.stringify(students)); 
   renderTable(); // Refresh the table
}

// Function to edit a student
function editStudent(index) {
   const students = JSON.parse(localStorage.getItem('students')) || [];
   const student = students[index];

   // Populate the form with the student's data
   document.getElementById('name').value = student.name;
   document.getElementById('email').value = student.email;
   document.getElementById('contact').value = student.contact;
   document.getElementById('class').value = student.className;

   // Remove the student from the list
   students.splice(index, 1);
   localStorage.setItem('students', JSON.stringify(students));

   renderTable(); 
}

// Initial render of the table
renderTable();