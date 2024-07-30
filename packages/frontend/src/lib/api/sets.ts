import { client } from ".";

export const getSet = async (setCode: string) => {
  const response = await client.sets[":id"].$get({ param: { id: setCode } });

  if (!response.ok) {
    throw new Error("Failed to fetch set id");
  }
  const data = await response.json();
  return data;
};

export const getSetQueryOptions = (setCode: string) => ({
  queryKey: ["sets", setCode],
  queryFn: () => getSet(setCode),
});
