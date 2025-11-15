export type CharacterId = "tia" | "mochu" | "syrup" | "puffi";

export type Character = {
  id: CharacterId;
  name: string;
  species: "rabbit" | "dog";
  colorName: string;
  colorCode: string;
};

export const characters: Character[] = [
  {
    id: "tia",
    name: "ティア",
    species: "rabbit",
    colorName: "クリーム",
    colorCode: "#ffe0b2",
  },
  {
    id: "mochu",
    name: "もちゅ",
    species: "rabbit",
    colorName: "茶色",
    colorCode: "#d7a56b",
  },
  {
    id: "syrup",
    name: "シロップ",
    species: "rabbit",
    colorName: "灰色",
    colorCode: "#b0bec5",
  },
  {
    id: "puffi",
    name: "ぱふぃー",
    species: "dog",
    colorName: "白",
    colorCode: "#ffffff",
  },
];

export function getRandomCharacter(): Character {
  return characters[Math.floor(Math.random() * characters.length)];
}