document.addEventListener("DOMContentLoaded", () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Sorry, your browser does not support Speech Recognition.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";

  const btn = document.querySelector("#listen-btn");

  function speak(text, callback) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = callback;
    window.speechSynthesis.speak(utterance);
  }

  function handleCommand(command) {
    console.log("Command received:", command);

    if (command.includes("youtube")) {
      speak("Opening YouTube...", () => window.open("https://www.youtube.com", "_blank"));
    } else if (command.includes("google")) {
      speak("Opening Google...", () => window.open("https://www.google.com", "_blank"));
    } else if (command.includes("facebook")) {
      speak("Opening Facebook...", () => window.open("https://www.facebook.com", "_blank"));
    } else if (command.includes("instagram")) {
      speak("Opening Instagram...", () => window.open("https://www.instagram.com", "_blank"));
    } else if (command.includes("whatsapp")) {
      speak("Opening WhatsApp...", () => window.open("https://www.whatsapp.com", "_blank"));
    } else {
      speak("Searching Google for " + command, () => {
        window.open("https://www.google.com/search?q=" + encodeURIComponent(command), "_blank");
      });
    }
  }

  btn.addEventListener("click", () => {
    speak("Hello, how can I help you?", () => {
      btn.textContent = "Listening...👂";
      btn.classList.add("listening");
      recognition.start();
    });

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      handleCommand(command);
    };

    recognition.onend = () => {
      btn.textContent = "Start Listening";
      btn.classList.remove("listening");
    };

    recognition.onerror = (event) => {
      console.error("Recognition error:", event.error);
      speak("Sorry, I didn't catch that.");
      btn.textContent = "Start Listening";
      //btn.classList.remove("listening");
    };
  });
});
