import mongoose from "mongoose";

const credentialSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timeStamps: true }
);

const Credential = mongoose.model("Credential", credentialSchema);

export default Credential;
