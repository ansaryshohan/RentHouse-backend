const mongoose = require("mongoose");

const agreementSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    apartmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Apartment",
      required: true,
      unique: true,
    },
    floorNo: { type: Number, required: true },
    blockNo: { type: String, required: true },
    houseNo: { type: String, required: true },
    apartmentName: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    payment: { type: String, enum: ["unpaid", "paid"], default: "unpaid" },
    apartmentImage: { type: String, required: true },
  },
  { timestamps: true }
);

const AgreementModel = mongoose.model("AllAgreement", agreementSchema);

module.exports = AgreementModel;
