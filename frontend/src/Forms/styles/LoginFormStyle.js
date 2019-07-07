const styles = {
  formContainer: {
    width: "30%",
    margin: "auto",
    padding: "0 15px"
  },
  buttonContainer: {
    textAlign: "left"
  },
  button: {
    backgroundColor: "blue",
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
    textAlign: "left",
    fontSize: "15px"
  }
};

export default styles;
