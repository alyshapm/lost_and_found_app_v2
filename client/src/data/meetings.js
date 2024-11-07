// meetings.js
const meetings = [
  {
    _id: { $oid: "66f629a1f59cdaf388a6cce5" },
    user_id: "66e1daa4f9a7602063f24eff",
    item_id: "66f62684f59cdaf388a6ccdf",
    meeting_date: "2024-09-28 10:00 AM",
    location: "pos security",
    status: "submitted",
  },
  {
    _id: { $oid: "66f629a1f59cdaf388a6ccf0" },
    user_id: "66e1daa4f9a7602063f24eff",
    item_id: "66f62684f59cdaf388a6ccdf",
    meeting_date: "2024-10-01 03:00 PM",
    location: "main office",
    status: "approved",
  },
  {
    _id: {
      $oid: "670cd57776a5845db306d8e5",
    },
    user_id: "66e1daa4f9a7602063f24eff",
    item_id: "66f6266df59cdaf388a6ccdd",
    meeting_date: "2024-10-04 10:00 AM",
    location: "pos security",
    status: "completed",
  },
  // Add more meeting objects as needed
];

export default meetings;
