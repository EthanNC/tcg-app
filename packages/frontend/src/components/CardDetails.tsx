import { GetCardResponse } from "@/lib/api/cards";
import React from "react";
import AttackSymbol from "@/assets/img/symbols/symbol-attack.png";
import DefenceSymbol from "@/assets/img/symbols/symbol-defence.png";
import ResourceSymbol from "@/assets/img/symbols/symbol-resource.png";
import ChiSymbol from "@/assets/img/symbols/symbol-chi.png";
import HealthSymbol from "@/assets/img/symbols/symbol-health.png";

import ReactMarkdown, { Components } from "react-markdown";
import { Link } from "@tanstack/react-router";
import { keywordData } from "@/lib/constants/keywords";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import AddToWishlist from "./AddToWishlist";

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

const filterKeywordTextByName = (name: string) => {
  return keywordData.find(
    (keyword) => keyword.name.toLocaleLowerCase() === name
  )?.description;
};

// Custom renderer for paragraphs
const CustomParagraph: Components["p"] = ({ children }) => {
  return (
    <p>
      {React.Children.map(children, (child: React.ReactNode) => {
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
        } else if (typeof child === "object" && child !== null) {
          // Check if the child is a Tooltip component
          const keyword = (child as React.ReactElement).props.children;
          const popoverContent = filterKeywordTextByName(keyword);
          if (!popoverContent) return child;
          return (
            <Popover>
              <PopoverTrigger>{child}</PopoverTrigger>
              <PopoverContent className="w-80">
                {" "}
                <ReactMarkdown
                  className="prose prose-sm max-w-none"
                  components={{
                    p: CustomParagraph,
                  }}
                >
                  {popoverContent}
                </ReactMarkdown>
              </PopoverContent>
            </Popover>
          );
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
        <div className="flex items-baseline gap-2">
          <h1 className="text-3xl font-bold">{cardData?.cards.name}</h1>
          <Link
            to="/sets/$setId"
            params={{ setId: cardData.card_printings.set_id }}
            className="text-sm"
          >
            {cardData?.card_printings.set_id}
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 col-span-1">
        <img
          src={cardData?.card_printings.image_url}
          alt={cardData?.cards.name}
        />
        <AddToWishlist cardPrintingId={cardData.card_printings.unique_id} />
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
