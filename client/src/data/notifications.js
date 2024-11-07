const notifications = [
  {
    _id: { $oid: "670cd71e7acc9d0be24ee85c" },
    user_id: "66e1daa4f9a7602063f24eff",
    item_id: "66f6266df59cdaf388a6ccdd",
    title: "Verification Request",
    message: "Please verify the item you found.",
    read: false,
    type: "verification_request",
    created_at: "2024-10-13T14:20:39.500836",
  },
  {
    _id: { $oid: "670cd71e7acc9d0be24ee85b" },
    user_id: "66e1daa4f9a7602063f24eff",
    item_id: "66f6266df59cdaf388a6ccdd",
    meeting_id: "670cd57776a5845db306d8e5",
    title: "Meeting Completed",
    message: "Please verify that you've claimed and received this item.",
    read: true,
    type: "meeting_completed",
    created_at: "2024-10-14T15:30:39.500836",
  },
  {
    _id: {
      $oid: "670cd7137acc9d0be24ee85a",
    },
    user_id: "66e1daa4f9a7602063f24eff",
    item_id: "66f6266df59cdaf388a6ccdd",
    meeting_id: "670cd57776a5845db306d8e5",
    title: "Meeting Approved",
    message:
      "Your meeting for Blue Umbrella has been approved. Please be on time.",
    read: false,
    type: "meeting_approved",
    created_at: "2024-10-14T15:30:39.500836",
  },
  {
    _id: { $oid: "670cd71e7acc9d0be24ee85c" },
    user_id: "66e1daa4f9a7602063f24eff",
    item_id: "66f6266df59cdaf388a6ccdd",
    title: "Verification Request",
    message: "Please verify the item you found.",
    read: false,
    type: "verification_request",
    created_at: "2024-10-13T14:20:39.500836",
  },
  // Add more notification objects as needed
];

export default notifications;
