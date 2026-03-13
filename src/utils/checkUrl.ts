export const isYouTubeUrl = (url: string) => {
  const youtubeRegex =
    /^(https?\:\/\/)?(www\.youtube\.com|m\.youtube\.com|youtube\.com|youtu\.be)\/(?:[\w\-\#]+\/)*([\w\-\#]+)(?:\?v=|\/)([a-zA-Z0-9_-]{11})/;
  return youtubeRegex.test(url);
};
