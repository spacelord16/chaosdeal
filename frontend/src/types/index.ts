// Re-export shared types for frontend use
export * from '../../../shared/types';

// Frontend-specific types
export interface CardUIProps {
  card: Card;
  isSelected?: boolean;
  isPlayable?: boolean;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
}

export interface GameUIState {
  selectedCards: string[];
  hoveredCard: string | null;
  showConfirmDialog: boolean;
  actionInProgress: boolean;
}

export interface Card {
  id: string;
  type: 'money' | 'property' | 'action';
  name: string;
  value: number;
  color: string | null;
  description: string;
  quantity?: number;
  // Property-specific
  colorSet?: string;
  setSize?: number;
  rentValues?: number[];
  isWild?: boolean;
  wildColors?: string[];
  // Action-specific
  actionType?: string;
  canBeUsedAsMoney?: boolean;
  targetColors?: string[];
}
