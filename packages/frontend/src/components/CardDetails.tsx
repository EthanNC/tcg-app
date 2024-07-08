import { GetCardResponse } from "@/lib/api";

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
        <p>{cardData?.cards.functional_text}</p>
      </div>
    </div>
  );
}
