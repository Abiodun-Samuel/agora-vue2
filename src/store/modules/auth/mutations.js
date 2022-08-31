export const SET_TOKEN = (state, token) => {
  state.token = token;
};

export const SET_TOKEN_TYPE = (state, tokenType) => {
  state.token_type = tokenType;
};

export const SET_AUTH_ERROR = (state, error) => {
  state.errors = error;
};

export const SET_USER_VERIFICATION = (state, verify) => {
  state.verify = verify;
};
