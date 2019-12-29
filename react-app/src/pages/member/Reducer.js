const MemberLogState = (state = false, action) => {
  switch (action.type) {
    case "LOG_IN": {
      const newState = {
        memberSid: action.payload.memberSid,
        memberName: action.payload.memberName,
        memberPic: action.payload.memberPic,
        loginStatus: true
      };
      return (state = newState);
    }
    case "LOG_OUT": {
      const newState = {
        memberSid: null,
        memberName: "",
        memberPic: "",
        loginStatus: false
      };
      return (state = newState);
    }
    case "UPLOAD_IMG": {
      const newState = {...state};
      newState.memberPic = action.payload;
      return (state = newState);
    }
    default: {
      return state;
    }
  }
};

export { MemberLogState };
