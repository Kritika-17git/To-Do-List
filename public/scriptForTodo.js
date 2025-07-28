const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.style.display = "block";
    setTimeout(() => toast.style.display = "none", 1000); // auto-hide
}
function deleteTask(id) {
  fetch(`/delete/${id}`, { method: 'DELETE' })
    .then(() => window.location.reload())
    .catch(err => console.error("Delete failed:", err));
} 
listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    const taskId = e.target.getAttribute("data-id");
    const isChecked = e.target.classList.contains("checked");
    if (!taskId || taskId === "null") {
        alert("Invalid task ID.");
        return;
    }
    e.target.classList.toggle("checked");
    fetch(`/tasks/${taskId}/toggle`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ checked: !isChecked })
    }).catch(err => console.error("Failed to update status:", err));
  }
});

