const deleteButton = document.querySelector("#delete-button");

deleteButton.addEventListener("click", (e) => {
  const studentName = document.getElementById("student-name").innerHTML;
  fetch("/student", {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: { name: studentName },
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((data) => {
      window.location.reload();
    });
});
