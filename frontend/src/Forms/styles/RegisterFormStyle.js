const style = {
  error:{
    color: "red"
  },
  formContainer: {
    width: "30%",
    margin: "auto",
    padding: "0 15px"
  },
  buttonContainer: {
    textAlign: "right"
  },
  button: {
    backgroundColor: "green",
    color: "white",
    padding: "10px 15px",
    borderRadius: "10px",
    border: "none",
    opacity: "0.75",
    "&:hover": {
      opacity: "1"
    },
    "&:focus": {
      border: "none",
      outline: "none"
    }
  },
  linkContainer: {
    paddingTop: "10px",
    width: "100%",
    float: "right",
    textAlign: "right",
    fontSize: "15px"
  }
};

export default style;
