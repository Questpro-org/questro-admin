export const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  export const capitalizeFirstLetter = (str) => {
    if (str === undefined) {
        return undefined;
    }
    return str.charAt(0).toUpperCase() + str?.slice(1);
  };
  