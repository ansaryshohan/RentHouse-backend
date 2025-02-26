const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema(
  {
    apartmentName: { type: String, required: true },
    houseNo: { type: String, required: true },
    location: { type: String, required: true },
    floorNo: { type: Number, required: true },
    blockNo: { type: String, required: true },
    price: { type: Number, required: true },
    addedBy: {
      email: { type: String, required: true },
      name: { type: String, required: true },
      date: { type: Date, default: Date.now },
    },
    description: { type: String },
    category: { type: String, enum: ["rent", "sell"], required: true },
    availability: { type: Boolean, default: true },
    houseInfo: {
      bedroom: { type: Number, required: true },
      bathroom: { type: Number, required: true },
    },
    mainImage: { type: String, required: true }, 
    images: [{ type: String }], // Array of image URLs
    amenities: [{ type: String }], // List of amenities like "Gym", "Swimming Pool"
    adminApproval: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

const ApartmentModel = mongoose.model("AllApartment", apartmentSchema);

module.exports = ApartmentModel;
