export const shortize = (
  address: string,
  options = {
    left: 5,
    right: 5
  }
) => {
  const first = address.slice(0, options.left);
  const last = address.slice(-options.right);

  return `${first}...${last}`;
};
