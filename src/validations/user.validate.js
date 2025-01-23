export const registerValidation = (body) => {
  console.log("Register Validation", body);
  let errorMsg = {
    mobileNo: "",
    emailId: "",
    fullName: "",
    userError: "",
  };
  let isError = false;
  const { mobileNo, fullName, emailId } = body;

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

  if (isError) {
    return [true, errorMsg];
  } else {
    return [false, errorMsg];
  }
};

export const KYCValidate = (body) => {
  console.log("KYC Vaidate", body);
  const { aadharCardId, accountNumber, ifscCode } = body;

  let errorMsg = {
    livePhoto: "",
    aadharCardId: "",
    accountNumber: "",
    ifscCode: "",
  };
  let isError = false;

  if (mobileNo?.length !== 10) {
    errorMsg.mobileNo = "Invalid Mobile No";
    isError = true;
  }
  if (accountNumber?.length < 12 || accountNumber?.length > 18) {
    errorMsg.accountNumber = "Invalid Account Number";
    isError = true;
  }
  if (ifscCode?.length !== 11) {
    errorMsg.ifscCode = "Invalid IFSC Code";
    isError = true;
  }

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

  if (isError) {
    // res.status(400).json();
    return [true, errorMsg];
  } else {
    return [false, errorMsg];
  }
};

export const validateLoginUser = (body) => {
  let errorMsg = {
    mobileNo: "",
  };
  let isError = false;
  const { mobileNo } = body;
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

  if (isError) {
    return [true, errorMsg];
  } else {
    return [false, errorMsg];
  }
};

export const ValidateUserAndOTP = (body) => {
  console.log("Login Validation", body);
  let errorMsg = {
    mobileNo: "",
    otpError: "",
  };
  let isError = false;
  const { mobileNo, otp } = body;
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
  if (!otp) {
    errorMsg.otp = "OTP is required";
    isError = true;
  } else {
    if (otp.length != 6) {
      errorMsg.otp = "OTP Should be 6 digits";
      isError = true;
    } else {
      if (isNaN(otp)) {
        errorMsg.otp = "OTP should be a digit";
        isError = true;
      }
    }
  }

  if (isError) {
    return [true, errorMsg];
  } else {
    return [false, errorMsg];
  }
};
