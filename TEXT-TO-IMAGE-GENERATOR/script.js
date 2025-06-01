document.getElementById("GenerateBtn").addEventListener("click", async function () {
  const token = ""; // 🔑 Add your Hugging Face API token here
  const input = document.getElementById("textInput").value.trim(); // Get input from user
  const imageContainer = document.getElementById("imageContainer");

  // Clear previous image and buttons
  imageContainer.innerHTML = "";

  // 🔧 Validate input
  if (!input) {
    alert("Please enter some text to generate an image.");
    return;
  }

  // Function to generate image using Hugging Face API
  async function generateImage(data) {
    try {
      const response = await fetch("https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: data })
      });

      if (!response.ok) {
        throw new Error("Failed to generate image. Please try again.");
      }

      return await response.blob();
    } catch (err) {
      throw err;
    }
  }

  try {
    const imageBlob = await generateImage(input);
    const imageUrl = URL.createObjectURL(imageBlob);

    // Create and display the image
    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = "Generated";
    image.className = "mx-auto rounded-lg shadow-lg";

    imageContainer.appendChild(image);

    // Create and append a download button
    const downloadBtn = document.createElement("button");
    downloadBtn.textContent = "Download Image";
    downloadBtn.classList.add("w-full", "bg-blue-500", "text-white", "rounded-lg", "px-6", "mt-4", "py-2");

    downloadBtn.addEventListener("click", () => {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "generated-image.png";
      link.click();
    });

    imageContainer.appendChild(downloadBtn);

  } catch (error) {
    console.error("Error generating image:", error);
    alert("Something went wrong while generating the image. Please check the console.");
  }
});
