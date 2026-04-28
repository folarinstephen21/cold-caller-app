const transitionLines = [
  "Now just so I can make sure we get you the most accurate option possible, let me quickly confirm a couple details here for you.",

  "And that’s exactly why we have one of our licensed advisors ready to walk you through the best options available for your situation.",

  "So let’s take a quick moment to finish your profile properly and see what you may qualify for today.",

  "The good news is there’s absolutely no obligation today — we simply want to help you explore what’s available for you.",

  "What most people find helpful is comparing their current situation with what they could actually qualify for now.",

  "That way we can provide something personalized instead of a generic quote that may not fit your needs.",

  "So before I connect you with the advisor, let me just quickly finish verifying the information here.",

  "And honestly, this is exactly why so many people are glad they took the call today.",

  "We just want to make sure you’re aware of all the options available so you can make the best decision for yourself and your family.",

  "So let’s quickly continue here and see what benefits may be available for you today.",
];

export const getTransition = () => {
  return transitionLines[Math.floor(Math.random() * transitionLines.length)];
};