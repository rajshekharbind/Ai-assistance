 // Initialize speech recognition
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";

    const btn = document.querySelector("#listen-btn");

    // Text-to-speech function with callback
    function speak(text, callback) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = callback;
      window.speechSynthesis.speak(utterance);
    }

    // Handle command
    function handleCommand(command) {
      console.log("Command received:", command);

      if (command.includes("youtube")) {
        speak("Opening YouTube...", () => {
          window.open("https://www.youtube.com", "_blank");
        });
      } else if (command.includes("google")) {
        speak("Opening Google...", () => {
          window.open("https://www.google.com", "_blank");
        });
      } else if (command.includes("facebook")) {
        speak("Opening Facebook...", () => {
          window.open("https://www.facebook.com", "_blank");
        });
      } else if (command.includes("instagram")) {
        speak("Opening Instagram...", () => {
          window.open("https://www.instagram.com", "_blank");
        });
      } else if (command.includes("whatsapp")) {
        speak("Opening WhatsApp...", () => {
          window.open("https://www.whatsapp.com", "_blank");
        });
      } else {
        speak("Searching Google for " + command, () => {
          window.open("https://www.google.com/search?q=" + encodeURIComponent(command), "_blank");
        });
      }
    }

    // Button click event
    btn.addEventListener("click", function () {
      speak("Hello, how can I help you?", () => {
        btn.textContent = "Listening...👂";
        btn.classList.add("listening");
        recognition.start();
      });

      // Handle result
      recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        handleCommand(command);
      };

      // Handle end of recognition
      recognition.onend = () => {
        btn.textContent = "Start Listening";
        btn.classList.remove("listening");
      };

      // Handle errors
      recognition.onerror = (event) => {
        console.error("Recognition error:", event.error);
        speak("Sorry, I didn't catch that.");
        btn.textContent = "Start Listening";
        btn.classList.remove("listening");
      };
    });