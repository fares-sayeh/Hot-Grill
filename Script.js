const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  try {
    const response = await fetch("/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    });

    const result = await response.json();

    alert(result.message);

    form.reset();
  } catch (error) {
    alert("Error sending message");
  }
});
const menuBtn = document.getElementById("showmenu");
const menuImage = document.getElementById("fullmenu");

menuBtn.addEventListener("click", function () {
  if (menuImage.style.display === "none") {
    menuImage.style.display = "block";
  } else {
    menuImage.style.display = "none";
  }
});
console.log("JS Loaded");
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    console.log('Link clicked');
  });
});
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));

    console.log(target);

    target.scrollIntoView({
      behavior: 'smooth'
    });
  });
});
document.getElementById("About").scrollIntoView({
  behavior: "smooth"
});