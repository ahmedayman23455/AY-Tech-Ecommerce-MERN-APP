/* --------------------- setErrorFun -------------------- */
export const setErrorFun = (dispatch, error, setError) => {
  dispatch(
    setError(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
        ? error.message
        : 'An unexpected error has occured, Please try again later',
    ),
  );
};
