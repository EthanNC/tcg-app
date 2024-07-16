import { GetCardResponse } from "@/lib/api";
import React from "react";
import AttackSymbol from "@/assets/img/symbols/symbol-attack.png";
import DefenceSymbol from "@/assets/img/symbols/symbol-defence.png";
import ResourceSymbol from "@/assets/img/symbols/symbol-resource.png";
import ChiSymbol from "@/assets/img/symbols/symbol-chi.png";
import HealthSymbol from "@/assets/img/symbols/symbol-health.png";

import ReactMarkdown, { Components } from "react-markdown";

const CustomNotation = ({ notation }: { notation: string }) => {
  switch (notation) {
    case "p":
      return (
        <img
          src={AttackSymbol}
          alt="Attack icon"
          className="inline-block w-4 h-4 mx-0.5"
        />
      );
    case "r":
      return (
        <img
          src={ResourceSymbol}
          alt="Resource icon"
          className="inline-block w-4 h-4 mx-0.5"
        />
      );
    case "d":
      return (
        <img
          src={DefenceSymbol}
          alt="Defense icon"
          className="inline-block w-4 h-4 mx-0.5"
        />
      );
    case "c":
      return (
        <img
          src={ChiSymbol}
          alt="Chi icon"
          className="inline-block w-4 h-4 mx-0.5"
        />
      );
    case "h":
      return (
        <img
          src={HealthSymbol}
          alt="Health icon"
          className="inline-block w-4 h-4 mx-0.5"
        />
      );
    // Add more cases for other custom notations
    default:
      return <span>{`{${notation}}`}</span>;
  }
};

// Custom renderer for paragraphs
const CustomParagraph: Components["p"] = ({ children }) => {
  return (
    <p>
      {React.Children.map(children, (child) => {
        if (typeof child === "string") {
          // Use regex to find all instances of {notation}
          const parts = child.split(/(\{[^}]+\})/g);
          return parts.map((part, index) => {
            if (part.startsWith("{") && part.endsWith("}")) {
              const notation = part.slice(1, -1);
              return <CustomNotation key={index} notation={notation} />;
            }
            return part;
          });
        }
        return child;
      })}
    </p>
  );
};

export default function CardDetails({
  cardData,
}: {
  cardData: GetCardResponse;
}) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-3">
        <h1 className="text-3xl font-bold">{cardData?.cards.name}</h1>
      </div>
      <div className="col-span-1">
        <img
          src={cardData?.card_printings.image_url}
          alt={cardData?.cards.name}
        />
      </div>
      <div className="col-span-2">
        <ReactMarkdown
          className="prose prose-sm max-w-none"
          components={{
            p: CustomParagraph,
          }}
        >
          {cardData?.cards.functional_text}
        </ReactMarkdown>
      </div>
    </div>
  );
}