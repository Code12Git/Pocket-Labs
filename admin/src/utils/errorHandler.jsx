export const getApiErrorMessage = (error) => {
    if (typeof error === 'string') return error;
  
    if (error instanceof Error) {
      const axiosError = error;
      console.log(axiosError?.response?.data?.code?.message)
      return (
        axiosError?.response?.data?.code?.message ||
        error.message ||
        "An unknown error occurred"
      );
    }
  
    return "An unknown error occurred";
  };
  