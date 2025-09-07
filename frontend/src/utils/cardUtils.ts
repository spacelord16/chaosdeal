import type { Card } from '../types';
import cardsData from '../../../data/cards.json';

// Generate full deck with proper card instances
export const generateDeck = (): Card[] => {
  const deck: Card[] = [];

  // Add money cards
  cardsData.money.forEach(cardData => {
    for (let i = 0; i < cardData.quantity; i++) {
      deck.push({
        id: `${cardData.id}_${i + 1}`,
        type: 'money',
        name: cardData.name,
        value: cardData.value,
        color: cardData.color,
        description: cardData.description
      });
    }
  });

  // Add property cards
  cardsData.properties.forEach(cardData => {
    for (let i = 0; i < cardData.quantity; i++) {
      deck.push({
        id: `${cardData.id}_${i + 1}`,
        type: 'property',
        name: cardData.name,
        value: cardData.value,
        color: cardData.color,
        colorSet: cardData.colorSet || undefined,
        setSize: cardData.setSize || undefined,
        rentValues: cardData.rentValues,
        isWild: cardData.isWild,
        wildColors: cardData.wildColors,
        description: cardData.description
      });
    }
  });

  // Add wild property cards
  cardsData.wild_properties.forEach(cardData => {
    for (let i = 0; i < cardData.quantity; i++) {
      deck.push({
        id: `${cardData.id}_${i + 1}`,
        type: 'property',
        name: cardData.name,
        value: cardData.value,
        color: cardData.color,
        colorSet: cardData.colorSet || undefined,
        setSize: cardData.setSize || undefined,
        rentValues: cardData.rentValues,
        isWild: cardData.isWild,
        wildColors: cardData.wildColors,
        description: cardData.description
      });
    }
  });

  // Add action cards
  cardsData.actions.forEach(cardData => {
    for (let i = 0; i < cardData.quantity; i++) {
      deck.push({
        id: `${cardData.id}_${i + 1}`,
        type: 'action',
        name: cardData.name,
        value: cardData.value,
        color: cardData.color,
        actionType: cardData.actionType,
        canBeUsedAsMoney: cardData.canBeUsedAsMoney,
        description: cardData.description
      });
    }
  });

  // Add rent cards
  cardsData.rent_cards.forEach(cardData => {
    for (let i = 0; i < cardData.quantity; i++) {
      deck.push({
        id: `${cardData.id}_${i + 1}`,
        type: 'action',
        name: cardData.name,
        value: cardData.value,
        color: cardData.color,
        actionType: cardData.actionType,
        targetColors: cardData.targetColors,
        canBeUsedAsMoney: cardData.canBeUsedAsMoney,
        description: cardData.description
      });
    }
  });

  return deck;
};

// Shuffle array using Fisher-Yates algorithm
export const shuffleDeck = (deck: Card[]): Card[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Check if a property set is complete
export const isCompleteSet = (properties: Card[], colorSet: string): boolean => {
  const setCards = properties.filter(card => 
    card.colorSet === colorSet || 
    (card.isWild && card.wildColors?.includes(colorSet))
  );
  
  // Get required set size from first property card of this color
  const requiredSize = properties.find(card => card.colorSet === colorSet)?.setSize || 0;
  
  return setCards.length >= requiredSize;
};

// Calculate rent for a property set
export const calculateRent = (properties: Card[], colorSet: string): number => {
  const setCards = properties.filter(card => 
    card.colorSet === colorSet || 
    (card.isWild && card.wildColors?.includes(colorSet))
  );
  
  if (setCards.length === 0) return 0;
  
  // Get rent values from first non-wild property card
  const baseCard = setCards.find(card => !card.isWild);
  if (!baseCard?.rentValues) return 0;
  
  const rentIndex = Math.min(setCards.length - 1, baseCard.rentValues.length - 1);
  return baseCard.rentValues[rentIndex];
};

// Get all unique color sets from properties
export const getPlayerPropertySets = (properties: Card[]): string[] => {
  const colorSets = new Set<string>();
  
  properties.forEach(card => {
    if (card.colorSet) {
      colorSets.add(card.colorSet);
    }
    if (card.isWild && card.wildColors) {
      card.wildColors.forEach(color => colorSets.add(color));
    }
  });
  
  return Array.from(colorSets);
};

// Check win condition (3 complete sets)
export const checkWinCondition = (properties: Card[]): boolean => {
  const colorSets = getPlayerPropertySets(properties);
  let completeSets = 0;
  
  colorSets.forEach(colorSet => {
    if (isCompleteSet(properties, colorSet)) {
      completeSets++;
    }
  });
  
  return completeSets >= 3;
};
