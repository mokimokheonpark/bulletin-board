export default function handler(req, res) {
  console.log(12345);
  res.status(200).json("TEST");
}
