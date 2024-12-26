// translate these too (i know, i know...)

// do unified errorMessage:
//{ color: "danger",
//       heading: "Error!",
//       text: "",}
// set text on error (e.g. Questions)
// or generic 'Something went wrong' message here in text

// also like in Questions, set text to error.message not just error (i think registration has this error)

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
  questions: {
    sendSuccess: {
      color: "success",
      heading: "Success!",
      text: "Answers submitted Successfully",
    },
    sendError: {
      color: "danger",
      heading: "Error!",
      text: "",
    },
    alreadySend: {
      color: "warning",
      heading: "Warning!",
      text: "You already filled this form!",
    },
  },
};

export default alert;
