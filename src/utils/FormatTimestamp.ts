const formatTimestamp = (timestamp: string) => {
  const date = new Date(parseInt(timestamp) * 1000);
  return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
};

export default formatTimestamp;
