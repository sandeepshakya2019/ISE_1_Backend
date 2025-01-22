export const registerValidation = (body) => {
  console.log("Register Validation", body);
  let errorMsg = {
    mobileNo: "",
    password: "",
    emailId: "",
    fullName: "",
    userError: "",
  };
  let isError = false;
  const { mobileNo, password, fullName, emailId } = body;

  if (!mobileNo) {
    errorMsg.mobileNo = "Mobile No is required";
    isError = true;
  } else {
    if (mobileNo.length < 10) {
      errorMsg.mobileNo = "Mobile No Should be greater then 10";
      isError = true;
    }
    if (mobileNo.length > 10) {
      errorMsg.mobileNo = "Mbile No Should be less then 10";
      isError = true;
    } else {
      if (isNaN(mobileNo)) {
        errorMsg.mobileNo = "Mobile No should be a digit";
        isError = true;
      }
    }
  }

  if (!fullName) {
    errorMsg.fullName = "Full Name is required";
    isError = true;
  } else {
    if (fullName.length < 4) {
      errorMsg.fullName = "Full Name Should be greater then 4 Characters";
      isError = true;
    }
  }

  if (emailId?.length > 0) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailId)) {
      errorMsg.emailId = "Invalid Email Id";
      isError = true;
    }
  }

  // if (!password) {
  //   errorMsg.password = "Password is required";
  // }
  // if(!emailId){
  //   errorMsg.emailId = "Email Id is required";
  // }
  console.log("check", isError);
  if (isError) {
    return [true, errorMsg];
  } else {
    return [false, errorMsg];
  }
};

export const KYCValidate = (body) => {
  console.log("KYC Vaidate", body);
  const { aadharCardId, rationCardId, incomeCertificateId, userMobileNo } =
    body;

  let errorMsg = {
    livePhoto: "",
    aadharCardId: "",
    incomeCertificateId: "",
    userMobileNo: "",
    rationCardId: "",
  };
  let isError = false;

  if (!aadharCardId) {
    errorMsg.mobileNo = "Aadhar Card No is required";
    isError = true;
  } else {
    if (aadharCardId.length < 12) {
      errorMsg.aadharCardId = "Aadhar Card No Should be greater then 12";
      isError = true;
    }
    if (aadharCardId.length > 12) {
      errorMsg.aadharCardId = "Aadhar Card No Should be less then 12";
      isError = true;
    } else {
      if (isNaN(aadharCardId)) {
        errorMsg.aadharCardId = "Aadhar Card No should be a digit";
        isError = true;
      }
    }
  }

  if (!rationCardId) {
    errorMsg.rationCardId = "rationCardId No is required";
    isError = true;
  } else {
    if (rationCardId.length < 12) {
      errorMsg.rationCardId = "rationCardId No Should be greater then 12";
      isError = true;
    }
    if (rationCardId.length > 12) {
      errorMsg.rationCardId = "rationCardId No Should be less then 12";
      isError = true;
    } else {
      if (isNaN(rationCardId)) {
        errorMsg.rationCardId = "rationCardId No should be a digit";
        isError = true;
      }
    }
  }

  if (!incomeCertificateId) {
    // errorMsg.incomeCertificateId = "incomeCertificateId No is required";
    // isError = true;
  } else {
    if (incomeCertificateId.length < 12) {
      errorMsg.incomeCertificateId =
        "incomeCertificateId No Should be greater then 12";
      isError = true;
    }
    if (incomeCertificateId.length > 12) {
      errorMsg.incomeCertificateId =
        "incomeCertificateId No Should be less then 12";
      isError = true;
    } else {
      if (isNaN(incomeCertificateId)) {
        errorMsg.incomeCertificateId =
          "incomeCertificateId No should be a digit";
        isError = true;
      }
    }
  }

  if (!userMobileNo) {
    errorMsg.userMobileNo = "userMobileNo No is required";
    isError = true;
  } else {
    if (userMobileNo.length < 10) {
      errorMsg.userMobileNo = "userMobileNo No Should be greater then 10";
      isError = true;
    }
    if (userMobileNo.length > 10) {
      errorMsg.userMobileNo = "userMobileNo No Should be less then 10";
      isError = true;
    } else {
      if (isNaN(userMobileNo)) {
        errorMsg.userMobileNo = "userMobileNo No should be a digit";
        isError = true;
      }
    }
  }

  if (isError) {
    // res.status(400).json();
    return [true, errorMsg];
  } else {
    return [false, errorMsg];
  }
};

export const bankValidate = () => {
  return true;
};
