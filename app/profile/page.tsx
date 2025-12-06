const handleSave = async () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  const response = await fetch("/api/profile-update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, name, email }),
  });

  const data = await response.json();

  if (data.error) {
    alert(data.error);
    return;
  }

  alert("Profile updated successfully!");
  window.location.reload();
};
