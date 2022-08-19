export default (state = {}, action) => {
  switch (action.type) {
    case "ADICIONAR_CAMERA_AO_MOSAICO": {
      return { ...state, mosaicos: action.payload.data };
    }

    case "CARREGAR_MOSAICOS": {
      return { ...state, mosaicos: action.payload.data };
    }

    case "ADICIONAR_MOSAICO": {
      return { ...state, mosaicos: action.payload.data };
    }

    default: {
      return state;
    }
  }
};
