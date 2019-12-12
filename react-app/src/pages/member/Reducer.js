const MemberLogState = (state = false, action) => {
  switch (action.type) {
    case "LOG_IN": {
      let newState = true;
      return (state = newState);
    }
    case "LOG_OUT": {
      let newState = false;
      return (state = newState);
    }
    default: {
      return state;
    }
  }
};

export default MemberLogState;
