// read file
export const readAndConvertFileToString = async (file) => {
  const reader = new FileReader();

  reader.onload = () => {
    return reader.result;
  };

  reader.readAsDataURL(file);
};

// identify file type
export const identifyFileType = (fileType) => {
  return fileType.split("/")[1];
};

// format bytes
export const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) return "0 Bytes";

  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};
