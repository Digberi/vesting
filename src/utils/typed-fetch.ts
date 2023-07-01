export const typedFetch = async <T extends object>(...params: Parameters<typeof fetch>) => {
  const response = await fetch(...params);
  const json = await response.json();

  return json as T;
};
