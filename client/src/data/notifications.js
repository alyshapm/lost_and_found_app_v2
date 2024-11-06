const notifications = [
  {
    _id: { $oid: "66f6266df59cdaf388a6ccde" },
    user_id: "66e1daa4f9a7602063f24eff",
    item_id: "66f6266df59cdaf388a6ccdd",
    meeting_id: null,
    title: "Found Item Pending Approval",
    message: "Please confirm and verify the Blue Umbrella you found.",
    read: false,
    type: "verification_request",
    created_at: "2024-09-27T10:02:40.239867",
  },
  {
    _id: { $oid: "66f6266df59cdaf388a6ccdf" },
    user_id: "66e1daa4f9a7602063f24eff",
    item_id: "66f6266df59cdaf388a6ccee",
    meeting_id: "66f6266df59cdaf388a6ccff",
    title: "Claim Under Review",
    message: "Your claim for the lost iPhone is under review.",
    read: true,
    type: "claim_under_review",
    created_at: "2024-09-26T08:45:20.123456",
  },
  // Add more notification objects as needed
];

export default notifications;
