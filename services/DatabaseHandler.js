import database from "./FireBaseLoader";

const addUserAnswers = (userName, answers) => {};
const displayUsersScore = () => {};
const getCurrentQuestionsAnswers = () => {};

const createUser = async (email, password) => {
  console.log(email);
  return database
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == "auth/weak-password") {
        alert("The password is too weak.");
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
};

const loginUser = async (email, password) => {
  console.log(email);
  return database
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == "auth/weak-password") {
        alert("The password is too weak.");
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
}
export { displayUsersScore, addUserAnswers, getCurrentQuestionsAnswers, createUser, loginUser };
