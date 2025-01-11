// Array of Christmas avatar URLs from Iconfinder
export const AVATAR_URLS = [
  'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/bear_russian_animal_avatar-512.png',
  'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
  'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/breaking_bad_chemist_avatar-512.png',
  'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/boy_person_avatar_kid-512.png',
  'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/coffee_zorro_avatar_cup-512.png',
  'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/cloud_crying_rain_avatar-512.png',
  'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/marilyn_monroe_artist_avatar-512.png',
  'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/ninja_avatar_samurai_warrior-512.png',
  'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/punk_guy_person_avatar-512.png',
  'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/santa_claus_christmas_avatar-512.png'
];

export function getRandomAvatar(): string {
  const randomIndex = Math.floor(Math.random() * AVATAR_URLS.length);
  return AVATAR_URLS[randomIndex];
}