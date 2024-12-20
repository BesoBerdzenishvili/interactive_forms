const alert = {
  login: {
    blocked: {
      color: "warning",
      heading: "Warning!",
      text: "User is blocked!",
    },
    incorrect: {
      color: "danger",
      heading: "Error!",
      text: "Incorrect Email or Password!",
    },
  },
  adminPanel: {
    deleted: {
      color: "success",
      heading: "Success!",
      text: "User successfully Deleted!",
    },
  },
  allowedUsers: {
    adminAccesses: {
      color: "danger",
      heading: "Error!",
      text: "You cannot prevent admin from seeng this Template",
    },
    userCreated: {
      color: "success",
      heading: "Success!",
      text: "User is successfully added to the list",
    },
    userNotFound: {
      color: "danger",
      heading: "Error!",
      text: "No such user is found",
    },
    alreadyInList: {
      color: "warning",
      heading: "Error!",
      text: "User is already in a list",
    },
  },
};

export default alert;
