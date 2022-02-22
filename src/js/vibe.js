const vibes = [
  'and today will be a Jamstastic day!',
  'and all you need is within you right now!',
  'and an unstoppable force of nature!',
  'and so is this rabbit! 🐇',
];

const vibe = vibes[Math.floor(Math.random() * Math.floor(vibes.length))];

document.querySelector('.vibe').append(vibe);
