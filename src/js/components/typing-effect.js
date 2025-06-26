const typingSpeed = 100;
const erasingSpeed = 50;
const pauseBeforeErasing = 2000;
let typingTimeoutId;
let isTypingEnabled = false;

async function typeEffect(animatedText, textContainer) {
  for (let i = 0; i <= animatedText.length; i += 1) {
    if (!isTypingEnabled) {
      return;
    }

    textContainer.textContent = animatedText.slice(0, i);
    await pause(typingSpeed);
  }

  await pause(pauseBeforeErasing);

  for (let i = animatedText.length; i >= 0; i -= 1) {
    if (!isTypingEnabled) {
      return;
    }

    textContainer.textContent = animatedText.slice(0, i);
    await pause(erasingSpeed);
  }

  typingTimeoutId = setTimeout(typeEffect, typingSpeed);
}
async function pause(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function startTypeEffect(animatedText, textContainer) {
  if (!textContainer) {
    console.error('Text container not found.');
    return;
  }

  if (!animatedText) {
    console.error('Animated text not found.');
    return;
  }

  if (isTypingEnabled) {
    return;
  }

  isTypingEnabled = true;
  typeEffect(animatedText, textContainer);
}
function stopTypeEffect() {
  isTypingEnabled = false;

  if (typingTimeoutId) {
    clearTimeout(typingTimeoutId);
    typingTimeoutId = null;
  }
}

export { startTypeEffect, stopTypeEffect };
