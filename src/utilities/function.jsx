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
  
  export function formatCurrency(value) {
    try {
      if (value != null) {
        const numberValue = parseFloat(value);
        if (!isNaN(numberValue)) {
          return numberValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
        } else {
          return "Invalid number";
        }
      }
    } catch (e) {
      return "N/A";
    }
  }

 