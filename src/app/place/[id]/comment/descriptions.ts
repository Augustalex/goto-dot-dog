export const restaurantExperience = [
  "Delicious meals",
  "Quick service",
  "Cozy ambiance",
  "Friendly staff",
  "Long wait",
  "Tasty dishes",
  "Great value",
  "Poor service",
  "Charming decor",
  "Lively atmosphere",
  "Overpriced food",
  "Warm welcome",
  "Fresh ingredients",
  "Limited menu",
  "Fast service",
  "Attentive staff",
  "Noisy environment",
  "Exceptional cuisine",
  "Casual setting",
  "Rude staff",
  "Unique flavors",
  "Clean space",
  "Average food",
  "Stellar service",
  "Crowded space",
  "Innovative dishes",
  "Perfect ambiance",
  "Unfriendly staff",
  "Exquisite taste",
  "Relaxing vibe",
];

export const dogExperience = [
  "Welcoming dog policy",
  "Dog-friendly space",
  "Easy dog access",
  "Clear dog rules",
  "Pet rest area",
  "Dogs get water",
  "Dog seating options",
  "Safe dog spots",
  "Quick pet service",
  "Dog meal options",
  "Clean dog areas",
  "Dog-friendly staff",
  "Pet waste stations",
  "Comfortable for dogs",
  "Dog interaction zones",
  "Efficient dog care",
  "Dog-friendly menu",
  "Pet emergency plan",
  "Dogs enjoy treats",
  "Reserved dog tables",
  "Dog comfort ensured",
  "Attentive to dogs",
  "Dog welcome kit",
  "Pet-friendly dining",
  "Dog noise control",
  "Space for leashes",
  "Dog behavior tips",
  "Pet safety measures",
  "Dog-friendly entry",
  "Relaxing for pets",
];

// export const dogExperience = [
//   "Dog-friendly staff",
//   "Ample space for dogs",
//   "Water bowls provided for dogs",
//   "Outdoor seating available for dogs",
//   "Quiet corner for dogs",
//   "Dogs allowed on the patio",
//   "Dog-friendly ambience",
//   "Dog-friendly seating area",
//   "Dogs can dine with owners",
//   "Dog bowls available",
//   "Dog-friendly outdoor area",
//   "Dogs must be supervised",
//   "Staff loves dogs",
//   "Great for dog socializing",
//   "Dogs can roam freely",
//   "Waitstaff knowledgeable about dogs",
//   "Dog relief area nearby",
//   "Reserved seating for dog owners",
//   "Dog-friendly events",
//   "Dog safety measures in place",
//   "The food was delicious",
//   "Exceptional service",
//   "Wide variety of dishes",
//   "Comfortable and clean ambiance",
//   "Quick and attentive service",
//   "Great value for the price",
//   "Innovative menu options",
//   "Perfect spot for a casual meal",
//   "Friendly and welcoming atmosphere",
//   "Consistently excellent food quality",
// ];

export function getRandomDescriptionList() {
  return restaurantExperience
    .concat(dogExperience)
    .sort(() => Math.random() - 0.5);
}

export function getRandomWeightedDescriptionList() {
  const all = getRandomDescriptionList();
  const allWithVotes = all
    .map((description) => {
      // Bell curve random number between 1 and 100
      const votes =
        Math.round(Math.random() * Math.random() * Math.random() * 100) + 1;

      return { description, votes };
    })
    .sort((a, b) => b.votes - a.votes);

  return allWithVotes;
}
