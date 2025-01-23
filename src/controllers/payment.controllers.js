import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import qrcode from "qrcode";

const paymentController = asyncHandler(async (req, res) => {
  // dummmyAadharData;
  return res
    .status(200)
    .json(new ApiResponse(200, null, "[+] Addhar Verified Successfully"));
});

const QRCodeGenrator = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  const upiId = "sandeepshakya2015-2@okicici";
  const paymentUrl = `upi://pay?pa=${upiId}&pn=&am=${amount}&cu=INR`;
  qrcode.toDataURL(paymentUrl, (err, url) => {
    if (err) {
      console.error("Error generating QR code:", err);
      return;
    }
    console.log("QR Code URL:", url);
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { qrcodeurl: url },
          "[+] QR Code Genrated Successfully"
        )
      );
    // You can now use this URL to display the QR code on your webpage or app
  });
  // dummmyAadharData;
});

export { paymentController, QRCodeGenrator };

// import React, { useState } from "react";
// import { View, Text, Image, Button } from "react-native";
// import QRCode from "react-native-qrcode-svg";

// const UpiPaymentScreen = () => {
//   const [upiId, setUpiId] = useState("your_friend@upi");
//   const [amount, setAmount] = useState("100");
//   const [qrCodeUrl, setQrCodeUrl] = useState(null);

//   const generateQrCode = () => {
//     const paymentUrl = `upi://pay?pa=${upiId}&pn=&am=${amount}&cu=INR`;
//     qrcode.toDataURL(paymentUrl, (err, url) => {
//       if (err) {
//         console.error("Error generating QR code:", err);
//         return;
//       }
//       setQrCodeUrl(url);
//     });
//   };

//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Enter UPI ID:</Text>
//       <TextInput
//         style={{ borderWidth: 1, padding: 10, margin: 10 }}
//         value={upiId}
//         onChangeText={setUpiId}
//       />

//       <Text>Enter Amount:</Text>
//       <TextInput
//         style={{ borderWidth: 1, padding: 10, margin: 10 }}
//         value={amount}
//         onChangeText={setAmount}
//         keyboardType="numeric"
//       />

//       <Button title="Generate QR Code" onPress={generateQrCode} />

//       {qrCodeUrl && (
//         <View style={{ margin: 20 }}>
//           <QRCode
//             value={qrCodeUrl}
//             size={200}
//             backgroundColor="white"
//             color="black"
//           />
//         </View>
//       )}
//     </View>
//   );
// };

// export default UpiPaymentScreen;
