import React from "react";
import type { CardUIProps } from "../types";

const Card: React.FC<CardUIProps> = ({
  card,
  isSelected = false,
  isPlayable = true,
  onClick,
  size = "medium",
}) => {
  const getCardTypeStyles = () => {
    switch (card.type) {
      case "money":
        return "bg-gradient-to-br from-green-100 to-green-200 border-green-400 text-green-800";
      case "property":
        return getPropertyStyles();
      case "action":
        return "bg-gradient-to-br from-purple-100 to-purple-200 border-purple-400 text-purple-800";
      default:
        return "bg-white border-gray-300";
    }
  };

  const getPropertyStyles = () => {
    if (card.isWild) {
      return "bg-gradient-to-r from-purple-200 to-pink-200 border-purple-400 text-purple-800";
    }

    const colorStyles = {
      brown: "bg-amber-800 text-white border-amber-600",
      light_blue: "bg-sky-300 text-black border-sky-400",
      pink: "bg-pink-300 text-black border-pink-400",
      orange: "bg-orange-400 text-black border-orange-500",
      red: "bg-red-500 text-white border-red-600",
      yellow: "bg-yellow-400 text-black border-yellow-500",
      green: "bg-green-500 text-white border-green-600",
      dark_blue: "bg-blue-800 text-white border-blue-900",
      railroad: "bg-gray-700 text-white border-gray-800",
      utility: "bg-yellow-600 text-white border-yellow-700",
    };

    return (
      colorStyles[card.colorSet as keyof typeof colorStyles] ||
      "bg-blue-200 border-blue-400"
    );
  };

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return "w-16 h-24 text-xs";
      case "large":
        return "w-32 h-48 text-sm";
      default:
        return "w-24 h-36 text-xs";
    }
  };

  const handleClick = () => {
    if (isPlayable && onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`
        ${getSizeStyles()}
        ${getCardTypeStyles()}
        ${
          isSelected
            ? "ring-4 ring-blue-500 ring-opacity-50 transform -translate-y-2"
            : ""
        }
        ${
          isPlayable
            ? "cursor-pointer hover:shadow-xl hover:-translate-y-1"
            : "cursor-not-allowed opacity-50"
        }
        rounded-lg shadow-lg border-2 p-2 transition-all duration-200 flex flex-col justify-between
      `}
      onClick={handleClick}
    >
      <div className="flex-1 flex flex-col">
        <div className="font-bold text-center mb-1 leading-tight">
          {card.name}
        </div>

        {card.type === "money" && (
          <div className="text-center text-lg font-bold">${card.value}M</div>
        )}

        {card.type === "property" && (
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-center text-xs mb-1">
              {card.isWild ? "WILD" : card.colorSet?.toUpperCase()}
            </div>
            {card.rentValues && card.rentValues.length > 0 && (
              <div className="text-center text-xs">
                Rent: ${card.rentValues[0]}M
              </div>
            )}
          </div>
        )}

        {card.type === "action" && (
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-center text-xs">
              {card.actionType?.replace("_", " ").toUpperCase()}
            </div>
            {card.canBeUsedAsMoney && (
              <div className="text-center text-xs mt-1">OR ${card.value}M</div>
            )}
          </div>
        )}
      </div>

      {/* Card value indicator at bottom */}
      <div className="text-center text-xs font-semibold mt-1">
        ${card.value}M
      </div>
    </div>
  );
};

export default Card;
