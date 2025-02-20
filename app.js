let nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  if (window.scrollY == 0) {
    nav.style.boxShadow = "";
  } else {
    nav.style.boxShadow = "0 10px 6px -6px #777";
  }
});

document
  .getElementById("contactForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // 防止頁面重新載入

    const form = event.target;
    const formData = new FormData(form);
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbwQ2jYACEpatKFu0W8DBNJVLYeVDJVo4rGfIozZRAXGLWAI_mhmmOZgvODJixJpr9jBnQ/exec"; // 貼上你的 GAS 網址

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: formData,
      });
      const json = await response.json();

      if (json.success) {
        const popup = document.getElementById("successPopup");
        popup.style.display = "block"; // 顯示彈窗
        form.reset(); // 清空表單

        // 3 秒後關閉彈窗並跳回首頁
        setTimeout(() => {
          popup.style.display = "none";
          window.location.href = "https://tiffy1912.github.io/uxportfolio/";
        }, 3000);
      } else {
        alert("提交失敗，請稍後再試！");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("提交失敗，請稍後再試！");
    }
  });
