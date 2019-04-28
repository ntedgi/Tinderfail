import database from "./FireBaseLoader";

const addUserAnswers = (userId, answers) => {
  return database
    .database()
    .ref(`/predictions/${userId}`)
    .set({
      answers
    });
};

const displayUsersScore = () => {};

const getCurrentQuestionsAnswers = async userId => {
  return new Promise(resolve => {
    const answersRef = database
      .database()
      .ref(`/predictions/${userId}`)
      .child("answers");
      answersRef.on("value", function(snapshot) {
        const val = snapshot.val();
        resolve(val);
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        resolve(null)
      })
  });
};

const createUser = async (email, password) => {
  console.log(email);
  console.log(database);
  return database
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == "auth/weak-password") {
        alert("The password is too weak.");
      } else {
        alert(errorMessage);
      }
      return "ERROR"
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
};
export { displayUsersScore, addUserAnswers, getCurrentQuestionsAnswers, createUser, loginUser };
